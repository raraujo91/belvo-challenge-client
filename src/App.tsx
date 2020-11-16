import React, { useState } from 'react';
import { Switch, Route, useHistory } from "react-router-dom";
import styled from 'styled-components';

import Balance from './routes/Balance';
import Accounts from './routes/Accounts';
import Owners from './routes/Owners';
import Transactions from './routes/Transactions';

import Menu from './components/Menu';
import api from './services/api';

export interface ComponentProps {
  linkID: string;
  setData?: React.Dispatch<React.SetStateAction<null>>;
  connected?: boolean;
}

const Container = styled.div`
  width: 80vw;
`;


const Home: React.FC<ComponentProps> = ({ connected }) => {
  return (
    <>
      {!connected && (
        <div>
          <h3>Welcome to my challenge app for Belvo</h3>
          <p>To start, just connect to a bank clicking on Connect right above.</p>
        </div>
      )}
      {connected && (
        <div>
          <h3>Good! Seems you was able to enter...</h3>
          <p>So... Just select one of the options above to retrieve the needed information.</p>
        </div>
      )}
    </>
  )
}

function App() {
  const [linkID, setLinkID] = useState('');
  const [connectedToBelvo, setConnectedToBelvo] = useState(false);
  const history = useHistory();

  const onError = (data: any) => { console.log(data) };
  const onEvent = (data: any) => { console.log(data) };
  const onSuccess = (link: string, institution: string) => {
    setLinkID(link);
    setConnectedToBelvo(true);
  };

  const disconnectBelvo = async () => {
    try {
      const request = await api.get('/destroy');

      const statusCode = await request.status;
      
      history.push('/');

      if (statusCode === 204) {
        setLinkID('');
        setConnectedToBelvo(false);
      }
    } catch(error) {
      throw new Error(error);
    }

    }

  return (
      <Container>
        <Menu
          connected={connectedToBelvo}
          disconnect={disconnectBelvo}
          linkID={linkID}
          onSuccess={onSuccess}
          onEvent={onEvent}
          onError={onError}
        />
        <Switch>
          <Route path="/accounts">
            <Accounts linkID={linkID} />
          </Route>
          <Route path="/owners">
            <Owners linkID={linkID} />
          </Route>
          <Route path="/transactions">
            <Transactions linkID={linkID} />
          </Route>
          <Route path="/balance">
            <Balance linkID={linkID} />
          </Route>
          <Route path="/">
            <Home linkID={linkID} connected={connectedToBelvo} />
          </Route>
        </Switch>
        <div id="belvo"></div>
      </Container>
  );
}

export default App;
