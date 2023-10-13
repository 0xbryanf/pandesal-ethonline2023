"use client"
import { useState } from 'react';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

export default function NetworkCard({ network }: any) {
    const [deployStatus, setDeployStatus] = useState(false);
    const [contract, setContract] = useState(null);

    async function action() {
        try {
            const data = {
                network: 'goerli' // this part needs to be dynamic
            }
            const response = await axios.post("http://localhost:1989/api/services/oauth/deploy-contract", data);

            if (response.data) {
                setContract(response.data);
                setDeployStatus(true);
                console.log('response', response.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <Card variant='outlined' sx={{ minWidth: 250 }}>
            <CardContent>
                <h2 className="text-xl mb-5">{network}</h2>
                {deployStatus ? (
                    <p className='text-gray-500 text-sm py-2'>
                        Deployed! 🎉
                    </p>
                ) : (
                    <>
                        <p className='text-gray-500 text-sm py-2'>Not yet deployed.</p>
                        <button className='border border-pandesal-blue rounded p-2' onClick={action}>Deploy now</button>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
