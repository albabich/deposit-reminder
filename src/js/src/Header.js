import { Button, Avatar, Row, Col, Statistic } from "antd";
import React from "react";
import Container from "./Container";
import "./Header.css";

const Header = (props) => (
  <Row gutter={16}>
    <Col span={12}>
      <Statistic
        title="At Moment Accounts Balance (RUR)"
        value={props.sumOfDeposits}
        precision={2}
      />
    </Col>
    <Col span={12}>
      <Statistic
        title="Accounts Balance At The End (RUR)"
        value={props.sumOfDepositsWithProfit}
        precision={2}
      />
    </Col>
  </Row>
  // <div className="header">
  //     <Container>
  //         {props.numberOfDeposits !== undefined ? <Avatar style={{backgroundColor: '#f56a00', marginRight: '5px'}}
  //          size='large'>{props.numberOfDeposits}</Avatar> : null}
  //         <Button onClick={()=>props.handleAddDepositClickEvent()} type='primary'>Add new Deposit</Button>
  //     </Container>
  // </div>
);

export default Header;
