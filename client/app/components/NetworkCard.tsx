"use client"
import { useState } from 'react';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

export default function NetworkCard({ networkName }: any) {
    const [deployStatus, setDeployStatus] = useState(false);
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(false);

    async function action() {
        try {
            const data = {
                network: `${networkName}` // this part needs to be dynamic
            }
            setLoading(true);
            const response = await axios.post("http://localhost:1989/api/services/oauth/deploy-contract", data);
            console.log(response)

            if (response.data) {
                setContract(response.data);
                setDeployStatus(true);
                console.log('response', response.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
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
                        <button className='border border-pandesal-orange hover:bg-pandesal-orange text-pandesal-orange hover:text-white duration-100 text-xs rounded p-2' disabled={loading ? true : false} onClick={action}>{!loading ? 'Deploy now' : 'Loading...'}</button>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
