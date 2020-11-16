import React, { useState, useEffect } from 'react';
import { ComponentProps } from '../App';
import api from '../services/api';
import styled from 'styled-components';
import { localeFormatter } from '../utils/localeFormatter';

interface BalanceProps {
    id: string;
    value_date: string;
    current_balance: number;
    account: {
        name: string;
        currency: string;
    }
}

const Card = styled.div`
    width: 100%;
    background-color: rgba(255,255,255,0.3);
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 10px 0px;
`; 

const Balance: React.FC<ComponentProps> = ({ linkID }) => {
    const [balanceData, setBalanceData] = useState<BalanceProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      async function getBalanceData(linkID: string) {
        try {
          const request = await api.get('/balance', {
            params: {
              linkId: linkID,
              date: new Date().toLocaleDateString('en-CA')
            }
          })
  
          const response = request.data;
  
          setIsLoading(false);
          setBalanceData(response);
  
        } catch (error) {
          throw new Error(error);
        }
  
      }
  
      getBalanceData(linkID);
    }, [linkID]);

    
  
    return (
      <div>
        {isLoading && <div><h3>Wait just a little more. I'm taking some air.</h3></div>}
        {balanceData && balanceData.map(balance => (
          <Card key={balance.id}>
            <span>{balance.value_date}</span>
            <span>{balance.account.name}</span>
            <span><strong>{localeFormatter(balance.account.currency, balance.current_balance)}</strong></span>
          </Card>
        ))}
      </div>
    )
  }

  export default Balance;