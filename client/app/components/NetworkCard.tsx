"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import SignMessage from './SignMessage';
import GroupCard from "../components/GroupCard";


export default function NetworkCard({ networkId, contractAddress }: any) {
    const [deployStatus, setDeployStatus] = useState(false);
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [groupsJoined, setGroupsJoined] = useState([]);
    const [gasPrice, setGasPrice] = useState(0);
    const [ethPrice, setEthPrice] = useState(0);
    const [ethUsdPrice, setEthUsdPrice] = useState(0);

    const networkName = networkId === '5' ? 'Goerli'
    : networkId === '11155111' ? 'Sepolia'
    : networkId === '80001' ? 'Mumbai'
    : 'Scroll'

    useEffect(() => {
        setContract(contractAddress);
    }, [contractAddress])

    /**
     * @Bryan: network status checker here
     */
    async function getNetworkStatus() {
        try {
            const data = {
                address: contract,
                network: networkId,
            }
            console.log('Checking network status', data);
            const response = await axios.post("http://localhost:1989/api/etherscan/get-contract-exec-status", data)
            console.log('Client response', response)
            if (response.data.data === 200) {
                setDeployStatus(true);
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }
    
    useEffect(() => {
        getNetworkStatus();
    }, [contract])

    async function action() {
        try {
            const data = {
                network: `${networkId}`
            }
            setLoading(true);
            setConfirming(true);
            console.log('Deploying to: ', data);

            /**
             * @todo: Rearrange this part depending on how requests are made and received
             */
            if (!confirming) {
                const response = await axios.post("http://localhost:1989/api/services/oauth/deploy-contract", data);
                console.log('Console response: ', response);
                if (response.data) {
                    setContract(response.data);
                    setDeployStatus(true);
                    console.log('response', response.data);
                    setLoading(false);
                }
            }

        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
        {confirming && <SignMessage confirming={confirming} setConfirming={setConfirming} />}
        <div className='flex flex-col md:flex-row gap-4'>
            <Card variant='outlined' sx={{ minWidth: 300 }} className='shadow-md flex-1 md:flex-none'>
                <CardContent className="flex flex-col md:grid md:grid-cols-3 gap-2 text-xs md:items-center items-start">
                        <h2 className="text-xl">
                            {networkName}
                        </h2>
                        {deployStatus ? (
                            <p className='md:col-span-2 bg-gray-200 rounded rounded-md p-2 text-center'>
                                Deployed & Verified! 🎉
                            </p>
                        ) : (
                            <>
                                <button className={`border border-blue-600 text-blue-600 duration-100 text-xs rounded p-2 md:col-span-2 ${!loading && 'hover:bg-blue-600 hover:text-white'}`} disabled={loading ? true : false} onClick={action}>{!loading ? 'Deploy now' : 'Loading...'}</button>
                                <p className={!loading ? 'hidden' : 'text-xs'}>This can take several minutes.</p>
                            </>
                        )}
                        <p className="grid grid-cols-2 gap-x-4 gap-y-2 my-4 col-span-3">
                            <span>Gas Price</span>
                            <span>{gasPrice} wei</span>
                            <span>Last ETH Price</span>
                            <span>{ethPrice} ETH</span>
                            <span>ETH/USD Last Price</span>
                            <span>{ethUsdPrice}</span>
                            
                        </p>
                </CardContent>
            </Card>

            <Card variant='outlined' sx={{ minWidth: 300 }} className='shadow-md flex-1'>
                <CardContent className='text-xs'>
                    <h2 className='text-xl'>Send Tokens</h2>
                        <input
                            type="text"
                            name="sendTo"
                            id="sendTo"
                            className='w-full border rounded p-2 my-4 col-span-2'
                            placeholder='Enter email address, wallet account or smart account'
                            />
                        <div className='flex gap-x-2 py-2'>
                            <input 
                                type="number"
                                step='0.0000001'
                                name="sendToken"
                                id="sendToken"
                                className='border rounded p-2 col-span-1 flex-1'
                                placeholder='Amount in ETH'
                                />
                            <button className='bg-pink-600 text-white py-2 px-5 flex-none rounded'>Send</button>
                        </div>

                </CardContent>
            </Card>
        </div>

        {/* Group Information */}
        <h2 className='text-2xl mt-8'>☕ Create or Join a Group in {networkName}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 justify-items-stretch gap-4 mb-4">
          
          {/**
           * @todo: Get user's groups and map, passing only the group ID;
           * name and desc will be fetched within component using ID
          */}

        {groupsJoined?.length > 0 ? (
            groupsJoined.map(group => {
                return (
                    <GroupCard name={group} description={group} />
                )
            })
        ) : (
            <>
                <GroupCard name={networkName + ' Jam'} description='Lorem, ipsum dolor.' />
                <GroupCard name='Create New Group' description='' />  {/* Change this element later */}
            </>
            )
        }

        </div>

        </>
    );
}
