import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Button } from "../styles/global";
import api from '../services/api';

declare global {
    interface Window {
        belvoSDK: {
            createWidget: (access_token: string, options: object) => any;
        }
    }
}

interface MenuProps {
    connected: boolean;
    linkID: string;
    onSuccess: (link: string, institution: string) => any;
    onEvent: (data: any) => any;
    onError: (data: any) => any;
    disconnect: () => any;
}

const Container = styled.div`
    min-width: 100%;
    height: 70px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: space-between;
`;

const MenuOptions = styled.ul`
    list-style: none;

    a {
        text-decoration: none;
        color: #ffffff;
    }
` 

const Option = styled.li`
    padding: 10px;
    display: inline;
    background-color: #353535;
    transition: all 500ms;

    &:hover {
        background-color: #565656;
    }

    
`

const LinkId = styled.p`
    font-size: 12px;
`

const Menu: React.FC<MenuProps> = ({ connected, disconnect, linkID, onError, onEvent, onSuccess }) => {

    const connectToBelvo = async () => {
        const request = await api.get('/auth');

        const access_token = await request.data.access;

        window.belvoSDK.createWidget(access_token, {
            locale: 'en', 
            company_name: "RAA LTDA.", 
            country_codes: ['MX', 'CO', 'BR'],
            callback: (link: string, institution: string) => onSuccess(link, institution),
            onExit: (data: any) => onError(data),
            onEvent: (data: any) => onEvent(data)
          }).build();
    }

    return(
        <Container>
            {!connected && <img src="/belvo.png" alt="Belvo logo" width="10%" />}
            {connected && (<MenuOptions>
                <Link to="/">
                    <Option>Dashboard</Option>
                </Link>
                <Link to="/accounts">
                    <Option>Accounts</Option>
                </Link>
                <Link to="/owners">
                    <Option>Owners</Option>
                </Link>
                <Link to="/transactions">
                    <Option>Transactions</Option>
                </Link>
                <Link to="/balance">
                    <Option>Balance</Option>
                </Link>
            </MenuOptions>)}
            {linkID && <LinkId>Logged as: {linkID}</LinkId> }
            <Button btnType={connected ? "logoff" : "default"} onClick={() => connected ? disconnect() : connectToBelvo() }>{connected ? "Logoff" : "Connect"}</Button>
        </Container>
    );
};

export default Menu;