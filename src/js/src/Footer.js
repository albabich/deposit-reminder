import { Button, Avatar } from "antd";
import React from "react";
import Container from "./Container";
import './Footer.css';

const Footer = (props) => (
    <div className="footer">
        <Container>
            {props.numberOfDeposits !== undefined ? <Avatar style={{backgroundColor: '#f56a00', marginRight: '5px'}}
             size='large'>{props.numberOfDeposits}</Avatar> : null}
            <Button onClick={()=>props.handleAddDepositClickEvent()} type='primary'>Add new Deposit</Button>
        </Container>
    </div>
);

export default Footer;