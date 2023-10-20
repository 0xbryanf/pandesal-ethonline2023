import { ethers } from 'ethers';
import "dotenv/config";

interface IgasData {
    initialGasLimit: {
        number: number;
        hex: string
    },
    buffer: string,
    finalizedGasLimit: {
        number: number;
        hex: string
    }
}

export const estimateGas = async (sender: string, factoryAddress: string, provider_url: string, abi: any, params: string[] ): Promise<IgasData> => {
    const provider = new ethers.providers.JsonRpcProvider(provider_url as string);
    const contract = new ethers.Contract(factoryAddress, abi, provider);
    let raw_gasLimit = await contract.estimateGas.deploy(...params, {
        from: sender, 
    })

    const buffer = raw_gasLimit.mul(20).div(100);
    const gasLimit = raw_gasLimit.add(buffer);

    const gasData: IgasData = {
        initialGasLimit: {
            number: parseInt(raw_gasLimit._hex, 16),
            hex: raw_gasLimit._hex,
        },
        buffer: '20%',
        finalizedGasLimit: {
            number: parseInt(gasLimit._hex, 16),
            hex: gasLimit._hex
        }
    }

    return gasData;
}

export default { estimateGas }