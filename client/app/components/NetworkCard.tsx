"use client"
import { useState } from 'react';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

/**
 * 
 * API endpoints to deploy contract address:
 * - Goerli: http://localhost:1989/api/services/oauth/deploy-goerli-contract
 * - Sepolia: http://localhost:1989/api/services/oauth/deploy-sepolia-contract
 * - Mumbai: http://localhost:1989/api/services/oauth/deploy-mumbai-contract
 * 
 */

export default function NetworkCard({ network }: any) {
    const [deployStatus, setDeployStatus] = useState(false);
    const [contract, setContract] = useState(null);

    async function action() {
        try {
            //Blocker: Please find a solution that we can call the specific address for every network and pass the specific API endpoint here
            const response = await axios("");
            if (response.data) {
                setContract(response.data);
                console.log('response', response.data)
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
    )
}
