import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ComponentProps } from '../App'

interface OwnerProps {
    id: string;
    first_name: string;
    display_name: string;
    email: string;
    phone_number: string;
    address: string;
  }

const Owners: React.FC<ComponentProps> = ({ linkID }) => {
    const [ownersData, setOwnersData] = useState<OwnerProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function getOwnersData(linkID: string) {
        try {
          const request = await api.get('/owners', {
            params: {
              linkId: linkID
            }
          })
  
          const response = request.data;
  
          setIsLoading(false);
          setOwnersData(response);
  
        } catch (error) {
          throw new Error(error);
        }
  
      }
  
      getOwnersData(linkID);
    }, [linkID]);
  
    return (
      <div>
          {isLoading && <div><h3>Your information is right in the way. Hold up.</h3></div>}
          {ownersData && ownersData.map(owner => (
        <div key={owner.id}>
          <h2>Full name: {owner.display_name}</h2>
          <h2>Email: {owner.email}</h2>
          <h2>Phone no.: {owner.phone_number}</h2>
          <h2>Address: {owner.address}</h2>
        </div>
      ))}</div>
    )
  }

  export default Owners;