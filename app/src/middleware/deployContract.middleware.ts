import { ethers } from 'ethers';
import { bytecode } from '@/utils/artifacts/contracts/Base.sol/Base.json';
import artifacts from '@/utils/artifacts/contracts/ContractFactory.sol/ContractFactory.json';
import relayerArifacts from '@/utils/artifacts/contracts/Relayer.sol/Relayer.json';
import { encoder, create2Address } from '@/utils/create2';
import HttpException from '@/utils/exceptions/http.exception';
import { mutliSigTransaction } from '@/middleware/safe.middleware';
import { proposal } from '@/middleware/proposal.middleware';
import MerkleTree from '@/middleware/merkleTree.middleware';
import { verifyProof } from '@/middleware/verify.middleware';

import "dotenv/config";
import { IProposal } from '@/utils/interfaces/IProposal.interface';
import { verifyProposal } from './verify.middleware';

const { API_URL_GOERLI, API_URL_SEPOLIA, API_URL_MUMBAI, API_URL_SCROLL_SEPOLIA, EXECUTOR, RELAYER_ADDRESS, FACTORY_ADDRESS } = process.env;
        
export const precomputedContract = async (ownerAddress: string, salt: string): Promise<string> => {
    try {
        const initCode: string = bytecode + await encoder(["address"], [ownerAddress]);
        const precomputedAddress: string = await create2Address(FACTORY_ADDRESS as string, salt, initCode);
        return precomputedAddress;
    } catch (error: any) {
        console.error(error, 'Cannot create precomputed address');
        throw new HttpException(400, error.message);
    }
}

export const deployContract = async (ownerAddress: string, ownerKey: string, salt: string, network: string): Promise<string> => {
    console.log(`Deployment of contract initiated to network ${network}`);
    try {
        let provider: ethers.providers.JsonRpcProvider; 
        
        switch (network) {
            case '5':
                provider = new ethers.providers.JsonRpcProvider(API_URL_GOERLI as string);
                break;
            case '11155111':
                provider = new ethers.providers.JsonRpcProvider(API_URL_SEPOLIA as string);
                break;
            case '80001':
                provider = new ethers.providers.JsonRpcProvider(API_URL_MUMBAI as string);
                break;
            case '534351':
                provider = new ethers.providers.JsonRpcProvider(API_URL_SCROLL_SEPOLIA as string);
                break;
            default:
                throw new Error('Unsupported network');
        }

        /**
         * Confirmation if provider is in correct network.
         */

        const providerNetwork: ethers.providers.Network = await provider.getNetwork();
        const provChainId: number = providerNetwork.chainId;
        if (network != provChainId.toString()) {
            throw new Error('Error getting network name');
        }

        // Initialization of initCode, a parameter for deploy function.
        const initCode = bytecode + await encoder(["address"], [ownerAddress]);

        // Initialization of signer for deployment.
        const signer: ethers.Wallet = new ethers.Wallet(ownerKey as string, provider);

        // Getting the contract address of the Factory Contract.
        const Factory: ethers.ContractFactory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, signer);
        const factory: ethers.Contract = Factory.attach(FACTORY_ADDRESS as string);

        try {

            /**
             * This try/catch method will classify the transaction based on its provider network.
             * This is the transaction method solely for goerli network, 
             * it has fixed Eth amount to be sent to the owner address to use for the deployment of the contract.
             * This method uses the API Kit, Protocol Kit and Relay Kit of Safe for a multisig transfer of the Eth.
             */
            if (network === '5') {
                // Estimate the possible gasLimit for deployment of contract.
                console.log('Starting to estimate gas for transaction.');
                const estimateDeploymentGasLimit = factory.estimateGas.deploy(initCode, salt);
                const parsedEstDepGasLimit: number = parseInt(ethers.utils.formatUnits((await estimateDeploymentGasLimit)._hex, 'wei'))
                
                console.log('Starting to create safe multiSigTransaction...')
                const amount = "0.005" // in eth amount
                await mutliSigTransaction(provChainId.toString(), amount, ownerAddress as string, '0x');
                
                console.log("Deploying contract address...")
                const deploy = await factory.deploy(initCode, salt, {
                    gasLimit: parsedEstDepGasLimit
                });
                
                console.log('Finalizing contract address.')
                const txReceipt = await deploy.wait();
                console.log(txReceipt)
                const contractAddress = `${txReceipt.events[0].args[0]}`;
                console.log('Contract address:', contractAddress);
                return contractAddress;

            } else if (network === '11155111' || network === '80001') {

                /**
                 * This methods are for sepolia, mumbai and scroll network.
                 */
                // Estimate the possible gasLimit for deployment of contract.
                console.log('Starting to estimate gas for transaction.');
                const estimateDeploymentGasLimit = factory.estimateGas.deploy(initCode, salt);
                const parsedEstDepGasLimit: number = parseInt(ethers.utils.formatUnits((await estimateDeploymentGasLimit)._hex, 'wei'))

                // Creates proposal from 3 signers that will be verified by a node.
                console.log('Starting proposal development...')
                const proposals: IProposal[] = await proposal(provChainId.toString(), parsedEstDepGasLimit.toString(), ownerAddress as string, "0x")

                // Receives the result of the verified proposal by the the node(s), this process make sure that only the delegated signers are correct
                console.log('Verifying proposals..')
                const results = await verifyProposal(proposals, provider.connection.url as string);

                // Creation of proof using Zero Knowledge Roll-Up, the zero knowledge process are done off-chain to save gas fee, but will be verified later on chain.
                console.log('Development of zkProof...')
                const merkle = new MerkleTree([results[0]]);
                let root: string = "";

                for (let i = 1; i < results.length; i++) {
                    const leaf = results[i];
                    const index = merkle.addLeaf(leaf);
                    root = merkle.getRoot();
                    const proof = merkle.getProof(leaf, undefined, undefined, index);
                    verifyProof(proof, leaf, root);
                }

                const _root = `0x${root}`;

                // Initialization of signer for relayer.
                console.log('Pulling executor wallet...')
                const executor = new ethers.Wallet(EXECUTOR as string, provider);

                // Getting the contract address of the Relay Contract.
                const relayerContract = new ethers.Contract(RELAYER_ADDRESS as string, relayerArifacts.abi, executor);
                const amount = ethers.utils.parseUnits("50000000000000000", "wei");
                
                console.log('Transferring the gas fee to the ownerAddress..')
                const transactionresponse = await relayerContract.verifiedTransfer(ownerAddress, _root, amount, {
                    gasLimit: 300000
                });

                const receipt = await transactionresponse.wait();
                console.log('Result of transfer of eth: ', receipt.status.toString());

                console.log("Deploying contract address...")
                const deploy = await factory.deploy(initCode, salt, {
                    gasLimit: parsedEstDepGasLimit
                });

                console.log('Finalizing contract address.')
                const txReceipt = await deploy.wait();
                const contractAddress = `${txReceipt.events[0].args[0]}`;
                console.log(contractAddress)
                return contractAddress;

            } else if (network === '534351') {
                const amount = ethers.utils.parseUnits("50000000000000000", "wei");

                console.log('Starting proposal development...')
                const proposals: IProposal[] = await proposal(provChainId.toString(), amount.toString(), ownerAddress as string, "0x")

                // Receives the result of the verified proposal by the the node(s), this process make sure that only the delegated signers are correct
                console.log('Verifying proposals..')
                const results = await verifyProposal(proposals, provider.connection.url as string);

                // Creation of proof using Zero Knowledge Roll-Up, the zero knowledge process are done off-chain to save gas fee, but will be verified later on chain.
                console.log('Development of zkProof...')
                const merkle = new MerkleTree([results[0]]);
                let root: string = "";

                for (let i = 1; i < results.length; i++) {
                    const leaf = results[i];
                    const index = merkle.addLeaf(leaf);
                    root = merkle.getRoot();
                    const proof = merkle.getProof(leaf, undefined, undefined, index);
                    verifyProof(proof, leaf, root);
                }

                const _root = `0x${root}`;

                // Initialization of signer for relayer.
                console.log('Pulling executor wallet...')
                const executor = new ethers.Wallet(EXECUTOR as string, provider);

                // Getting the contract address of the Relay Contract.
                console.log('Transferring the gas fee to the ownerAddress..')
                const relayerContract = new ethers.Contract(RELAYER_ADDRESS as string, relayerArifacts.abi, executor);
                const transactionresponse = await relayerContract.verifiedTransfer(ownerAddress, _root, amount);

                const receipt = await transactionresponse.wait();
                console.log('Result of transfer of eth: ', receipt.status.toString());

                console.log("Deploying contract address...")
                const deploy = await factory.deploy(initCode, salt);

                console.log(deploy);
                console.log('Finalizing contract address.')
                const txReceipt = await deploy.wait();
                console.log(txReceipt);
                const contractAddress = `${txReceipt.events[0].args[0]}`;
                return contractAddress;

            } else {
                throw new Error('Unable to deploy the contract.')
            }
        } catch (error: any) {
            console.log(error);
            throw new Error('Unable to deploy the contract.')
        }

    } catch (error: any) {
        throw new HttpException(400, "error.message");
    }
}

export default { precomputedContract, deployContract };