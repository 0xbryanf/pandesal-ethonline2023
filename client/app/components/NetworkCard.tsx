"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import SignMessage from './SignMessage';
import GroupCard from "../components/GroupCard";


export default function NetworkCard({ networkId }: any) {
    const [deployStatus, setDeployStatus] = useState(false);
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [groupsJoined, setGroupsJoined] = useState([]);
    const [inputValue, setInputValue] = useState(0);
    const [balance, setBalance] = useState(0);

    const networkName = networkId === '5' ? 'Goerli'
    : networkId === '11155111' ? 'Sepolia'
    : networkId === '80001' ? 'Mumbai'
    : 'Scroll'

    useEffect(() => {
    /** 
     * @todo: fetch signed-in user's groups that are a part of this network
     * @todo: fetch deploystatus of current network    
     */
    }, [])

    useEffect(() => {
        setDeployStatus(false);
    }, [networkId, networkName])

    const handleInput = (event: any) => {
        const input = event.target.value;
        setInputValue(input);
    }

    

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
        <div className='flex gap-4'>
            <Card variant='outlined' sx={{ minWidth: 200, width: 'max-content', flex: 1 }} className='shadow-md '>
                <CardContent>
                    <h2 className="text-xl">
                        {networkName}
                    </h2>
                    {deployStatus ? (
                        <p className='text-gray-500 text-sm py-2'>
                            Deployed! 🎉
                        </p>
                    ) : (
                        <>
                            <p className='text-gray-500 text-sm py-2'>{loading ? "Deploying. This can take several minutes. Please don't navigate away from this tab :)" : 'Not yet deployed.'}</p>
                            <button className={`border border-pandesal-orange text-pandesal-orange duration-100 text-xs rounded p-2 ${!loading && 'hover:bg-pandesal-orange hover:text-white'}`} disabled={loading ? true : false} onClick={action}>{!loading ? 'Deploy now' : 'Loading...'}</button>
                        </>
                    )}
                </CardContent>
            </Card>

            <Card variant='outlined' sx={{ minWidth: 200, width: 'max-content', flex: 1 }} className='shadow-md '>
                <CardContent>
                    <h2 className="text-xl">
                        Balance
                    </h2>
                    <p className='text-3xl py-4'>
                        {balance} {networkName} ETH
                    </p>
                </CardContent>
            </Card>

            <Card variant='outlined' sx={{ minWidth: 200, width: 'max-content', flex: 1 }} className='shadow-md'>
                <CardContent>
                    <h2 className='text-xl'>Send Tokens</h2>
                    <div className='grid grid-cols-2 gap-x-2 py-2'>
                        <p className='text-gray-400'>Amount in ETH</p>
                        <p className='text-gray-400'>Recipient address</p>
                        <input 
                            type="text"
                            name="sendToken"
                            id="sendToken"
                            className='border rounded p-2'
                            placeholder='0.001'
                            onInput={handleInput}
                            />
                        <input
                            type="text"
                            name="sendTo"
                            id="sendTo"
                            className='border rounded p-2'
                            placeholder='0x0000000000000000'
                            onInput={handleInput}
                            />

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
