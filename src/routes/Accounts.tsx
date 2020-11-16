import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { ComponentProps } from '../App';
import api from '../services/api';
import { localeFormatter } from '../utils/localeFormatter';

interface AccountProps {
    id: string;
    name: string;
    number: string;
    currency: string;
    balance: {
      current: number;
    }
    collected_at: string;
  }

  const Container = styled.div`
    display: flex;
    justify-content: space-around;
  `

  const Card = styled.div`
    display: flex;
    width: 350px;
    flex-direction: column;
    background-color: azure;
    color: #262626;
    padding: 10px;
    margin: 10px 0px;
  `;

  const CardTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
        font-size: 12px;
    }
  `

  const CardBottom = styled.div`
    height: 10px;
    font-size: 8px;
    text-align: center;
    margin-top: 5px;
  `

const Accounts: React.FC<ComponentProps> = ({ linkID }) => {
    const [accountsData, setAccountsData] = useState<AccountProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      async function getAccountsData(linkID: string) {
        try {
          const request = await api.get('/accounts', {
            params: {
              linkId: linkID
            }
          })
  
          const response = request.data;
          
          setIsLoading(false);
          setAccountsData(response);
  
        } catch (error) {
          throw new Error(error);
        }
  
      }
  
      getAccountsData(linkID);
    }, [linkID]);
  
    return (
      <Container>
          {isLoading && <div><h3>Information is being retrieved. I promise.</h3></div>}
          {accountsData && accountsData?.map(account => (
        <Card key={account.id}>
            <CardTop>
              <h3>{account.name}</h3>
              <p>#{account.number}</p>
            </CardTop>
          <h1>{localeFormatter(account.currency, account.balance.current)}</h1>
         <CardBottom>
            <p>Information retrieved at {account.collected_at}</p>
         </CardBottom>
        </Card>
      )
      )}</Container>
    )
  }

  export default Accounts;