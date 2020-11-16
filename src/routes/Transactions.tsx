import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ComponentProps } from '../App'
import { localeFormatter } from '../utils/localeFormatter';
import styled from 'styled-components';

interface TxnProps {
    id: string;
    name: string;
    value_date: string;
    account: {
        name: string;
    }
    amount: number;
    currency: string;
    balance: number;
    status: string;
    type: string;
}

const Table = styled.table`
    width: 100%;
    td, tr {
        text-align: center;
    }

  `


const Transactions: React.FC<ComponentProps> = ({ linkID }) => {
    const [transactionsData, setTransactionsData] = useState<TxnProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getTransactionsData(linkID: string) {
            try {
                const request = await api.get('/transactions', {
                    params: {
                        linkId: linkID,
                        date: new Date().toLocaleDateString('en-CA')
                    }
                })

                const response = request.data;

                setIsLoading(false);
                setTransactionsData(response);

            } catch (error) {
                throw new Error(error);
            }

        }

        getTransactionsData(linkID);
    }, [linkID]);

    return (
        <div>
            <Table>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>Status</th>
                    </tr>
                    {isLoading && (
                        <tr>
                            <td colSpan={6}>Loading transactions content...</td>
                        </tr>
                    )}
                    {transactionsData && transactionsData.map(txn => (
                        <tr key={txn.id}>
                            <td>{txn.value_date}</td>
                            <td>{txn.account.name}</td>
                            <td>{txn.type}</td>
                            <td>{localeFormatter(txn.currency, txn.amount)}</td>
                            <td>{localeFormatter(txn.currency, txn.balance)}</td>
                            <td>{txn.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Transactions;