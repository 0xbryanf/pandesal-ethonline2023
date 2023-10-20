"use client"
import { useState } from 'react';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import SignMessage from './SignMessage';


export default function NetworkCard({ networkName }: any) {
    const [deployStatus, setDeployStatus] = useState(false);
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(false);
    const [confirming, setConfirming] = useState(false);

    async function action() {
        try {
            const data = {
                network: `${networkName}` // this part needs to be dynamic
            }
            setLoading(true);
            setConfirming(true);
            console.log('Deploying to: ', data);

            // Rearrange this part depending on how requests are made and received
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
        <Card variant='outlined' sx={{ minWidth: 100 }}>
            <CardContent>
                <h2 className="text-xl">
                    {networkName === '5' ? 'Goerli'
                    : networkName === '11155111' ? 'Sepolia'
                    : networkName === '80001' ? 'Mumbai'
                    : 'Scroll'
                }
                </h2>
                {deployStatus ? (
                    <p className='text-gray-500 text-sm py-2'>
                        Deployed! 🎉
                    </p>
                ) : (
                    <>
                        <p className='text-gray-500 text-sm py-2'>Not yet deployed.</p>
                        <button className={`border border-pandesal-orange text-pandesal-orange duration-100 text-xs rounded p-2 ${!loading && 'hover:bg-pandesal-orange hover:text-white'}`} disabled={loading ? true : false} onClick={action}>{!loading ? 'Deploy now' : 'Loading...'}</button>
                    </>
                )}
            </CardContent>
        </Card>
        </>
    );
}
