import React from 'react';
import styled from 'styled-components';
import { Button } from '../styles/global';

const Container = styled.div`
    min-width: 100%;
    height: 70px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #d2d7df;
    border-radius: 20px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around; 
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
`;

const TextField = styled.input`
    border: none;
    height: 80%;
    width: 300px;
    padding-left: 10px;
    border-radius: 10px;
`

const Select = styled.select`
    outline: none;
    border: none;
    appearance: none;
    height: 80%;
    width: 150px;
    padding-left: 10px;
    border-radius: 10px;
`

const Environment = styled.option``

const Credentials: React.FC = () => {
    return(
        <Container>
            <TextField type="text" placeholder="Belvo Secret ID" id="secret_id" />
            <TextField type="password" placeholder="Belvo Secret Key" id="secret_key" />
            <Select>
                <Environment value="sandbox">Sandbox</Environment>
                <Environment value="production">Production</Environment>
            </Select>
            <Button>
                Start!
            </Button>
        </Container>
    );
};

export default Credentials;