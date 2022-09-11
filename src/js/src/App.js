import React, { Component, Fragment } from "react";
import moment from "moment";

import Container from "./Container";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
import {
  getAllDeposits,
  addNewDeposit,
  updateDeposit,
  deleteDeposit,
  deleteContribution,
  addNewContribution,
  updateContribution,
} from "./client";
import DepositForm from "./forms/DepositForm";
import ContributionForm from "./forms/ContributionForm";

import { errorNotification } from "./Notification";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Table,
  Avatar,
  Spin,
  Modal,
  Space,
  Empty,
  PageHeader,
  notification,
  Button,
  Popconfirm,
} from "antd";

const getIndicatorIcon = () => (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

class App extends Component {
  state = {
    deposits: [],
    isFetching: false,
    selectedDeposit: {},
    selectedContribution: {},
    isAddDepositModalVisible: false,
    isEditDepositModalVisible: false,
    isContributeDepositModalVisible: false,
    isEditContributionModalVisible: false,
  };

  componentDidMount() {
    this.fetchDeposits();
  }

  openAddDepositModal = () => this.setState({ isAddDepositModalVisible: true });
  closeAddDepositModal = () =>
    this.setState({ isAddDepositModalVisible: false });
  openEditDepositModal = () =>
    this.setState({ isEditDepositModalVisible: true });
  closeEditDepositModal = () =>
    this.setState({ isEditDepositModalVisible: false });
  openContributeDepositModal = () =>
    this.setState({ isContributeDepositModalVisible: true });
  closeContributeDepositModal = () =>
    this.setState({ isContributeDepositModalVisible: false });
  openEditContributionModal = () =>
    this.setState({ isEditContributionModalVisible: true });
  closeEditContributionModal = () =>
    this.setState({ isEditContributionModalVisible: false });

  openNotificationWithIcon = (type, message, description) =>
    notification[type]({ message, description });

  fetchDeposits = () => {
    this.setState({
      isFetching: true,
    });
    getAllDeposits()
      .then((res) =>
        res.json().then((deposits) => {
          console.log(deposits);
          this.setState({
            deposits,
            isFetching: false,
          });
        })
      )
      .catch((error) => {
        console.log(error);
        const message = error.error? error.error.message : 'Something went wrong'
        // const message = error;
        const description = error.error.httpStatus ? error.error.httpStatus : "500";
        // const description = error;
        errorNotification(message, description);
        this.setState({
          isFetching: false,
        });
      });
  };

  editDeposit = (selectedDeposit) => {
    this.setState({ selectedDeposit });
    this.openEditDepositModal();
  };

  addDepositFormSubmitter = (deposit) => {
    addNewDeposit(deposit)
    .then(() =>{
      this.closeAddDepositModal();
      this.fetchDeposits();
    })
  }

  updateDepositFormSubmitter = (deposit) => {
    updateDeposit(deposit.id, deposit)
      .then(() => {
        this.openNotificationWithIcon(
          "success",
          "Deposit updated",
          `${deposit.id} was updated`
        );
        this.closeEditDepositModal();
        this.fetchDeposits();
      })
      .catch((err) => {
        console.error(err.error);
        this.openNotificationWithIcon(
          "error",
          "error",
          `(${err.error.status}) ${err.error.error}`
        );
      });
  };

  contributeDepositOn = (selectedDeposit) => {
    this.setState({ selectedDeposit });
    this.openContributeDepositModal();
  };

  editContribution = (selectedContribution) => {
    this.setState({ selectedContribution });
    this.openEditContributionModal();
  };

  addContributionFormSubmitter = (contribution) => {
    addNewContribution(contribution)
    .then(() => {
      this.openNotificationWithIcon(
        "success",
        "Contribution ",
        "was added"
      );
      this.closeContributeDepositModal();
      this.fetchDeposits();
  })
  .catch((err) => {
    console.error(err.error);
    this.openNotificationWithIcon(
      "error",
      "error",
      `(${err.error.httpStatus}) ${err.error.message}`
    );
  });
};

  updateContributionFormSubmitter = (contribution) => {
    updateContribution(contribution.id, contribution)
      .then(() => {
        this.openNotificationWithIcon(
          "success",
          "Contribution ",
          `${contribution.id} was updated`
        );
        this.closeEditContributionModal();
        this.fetchDeposits();
      })
      .catch((err) => {
        console.error(err.error);
        this.openNotificationWithIcon(
          "error",
          "error",
          `(${err.error.status}) ${err.error.error}`
        );
      });
  };

  deleteDeposit = (id) => {
    deleteDeposit(id)
      .then(() => {
        this.openNotificationWithIcon(
          "success",
          "Deposit deleted",
          `${id} was deleted`
        );
        this.fetchDeposits();
      })
      .catch((err) => {
        this.openNotificationWithIcon(
          "error",
          "error",
          `(${err.error.status}) ${err.error.error}`
        );
      });
  };

  deleteContribution = (id) => {
    deleteContribution(id)
      .then(() => {
        this.openNotificationWithIcon(
          "success",
          "Contribution deleted",
          `${id} was deleted`
        );
        this.fetchDeposits();
      })
      .catch((err) => {
        this.openNotificationWithIcon(
          "error",
          "error",
          `(${err.error.status}) ${err.error.error}`
        );
      });
  };

  buttonShow = (record) => (
    <Fragment>
      <Popconfirm
        placement="topRight"
        title={`Are you sure to delete contribution?`}
        onConfirm={() => this.deleteContribution(record.id)}
        okText="Yes"
        cancelText="No"
        onCancel={(e) => e.stopPropagation()}
      >
        <Button type="danger" onClick={(e) => e.stopPropagation()}>
          Delete
        </Button>
      </Popconfirm>
      <Button
        style={{ marginLeft: "5px" }}
        type="primary"
        onClick={() => this.editContribution(record)}
      >
        Edit
      </Button>
    </Fragment>
  );

  render() {
    const { deposits, isFetching, isAddDepositModalVisible } = this.state;

    const commonElements = () => (
      <div>
        {/* <Header
          numberOfDeposits={deposits.length}
          handleAddDepositClickEvent={this.openAddDepositModal}
        /> */}
        <Modal
          title="Add new deposit"
          visible={isAddDepositModalVisible}
          onOk={this.closeAddDepositModal}
          onCancel={this.closeAddDepositModal}
          width={500}
        >
          <DepositForm
            submitter={this.addDepositFormSubmitter}

          />
        </Modal>

        <Modal
          title="Edit deposit"
          visible={this.state.isEditDepositModalVisible}
          onOk={this.closeEditDepositModal}
          onCancel={this.closeEditDepositModal}
          destroyOnClose={true}
          width={500}
        >
          <PageHeader title={`${this.state.selectedDeposit.id}`} />

          <DepositForm
            initialValues={this.state.selectedDeposit}
            submitter={this.updateDepositFormSubmitter}
          />
        </Modal>

        <Modal
          title="Contribute deposit"
          visible={this.state.isContributeDepositModalVisible}
          onOk={this.closeContributeDepositModal}
          onCancel={this.closeContributeDepositModal}
          destroyOnClose={true}
          width={300}
        >
          <PageHeader title={`${this.state.selectedDeposit.name}`} />

          <ContributionForm
            submitter={this.addContributionFormSubmitter}
            depositId={this.state.selectedDeposit.id}
            initialValues = {{date:`${new Date().toLocaleDateString("en-CA")}`}}
          />
        </Modal>

        <Modal
          title="Edit contribution"
          visible={this.state.isEditContributionModalVisible}
          onOk={this.closeEditContributionModal}
          onCancel={this.closeEditContributionModal}
          destroyOnClose={true}
          width={300}
        >
          <PageHeader title={`${this.state.selectedContribution.id}`} />

          <ContributionForm
            initialValues={this.state.selectedContribution}
            submitter={this.updateContributionFormSubmitter}
          />
        </Modal>

        <Footer
          numberOfDeposits={deposits.length}
          handleAddDepositClickEvent={this.openAddDepositModal}
        />
      </div>
    );

    if (isFetching) {
      return (
        <Container>
          <Spin indicator={getIndicatorIcon()} />
        </Container>
      );
    }

    if (deposits && deposits.length) {
      const expandedRowRender = (record) => {
        const columns = [
          {
            title: "Date",
            dataIndex: "date",
            key: "date",
            // defaultSortOrder: "ascend",
            // sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
          },

          {
            title: "Sum",
            dataIndex: "sum",
            key: "sum",
          },

          {
            title: "Action",
            key: "action",
            render: (text, record) => (
              <Fragment>
                <Popconfirm
                  placement="topRight"
                  title={`Are you sure to delete contribution?`}
                  onConfirm={() => this.deleteContribution(record.id)}
                  okText="Yes"
                  cancelText="No"
                  onCancel={(e) => e.stopPropagation()}
                >
                  {record.id !== null ? (
                    <Button
                      type="danger"
                      size="small"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Delete
                    </Button>
                  ) : (
                    ""
                  )}
                </Popconfirm>
                {record.id !== null ? (
                  <Button
                    style={{ marginLeft: "5px" }}
                    size="small"
                    type="primary"
                    onClick={() => this.editContribution(record)}
                  >
                    Edit
                  </Button>
                ) : (
                  <Space>Capitalization</Space>
                )}
              </Fragment>
            ),
          },
        ];

        const data = [];

        const contrs = record.contributionList;
        for (let i = 0; i < contrs.length; ++i) {
          data.push({
            key: i.toString(),
            id: contrs[i].id,
            date: contrs[i].date,
            sum: contrs[i].sum,
          });
        }

        return (
          <Table
            title={() => "Contributions and Payments"}
            style={{
              marginBottom: "70px",
            }}
            columns={columns}
            dataSource={data}
            pagination={false}
            rowClassName={(record, index) =>
              record.id === null ? "green" : "white"
            }
          />
        );
      };

      const setAlarmByDate = (deposit) => {
        const dateStartAlarm = moment(deposit.closeDate, "YYYY-MM-DD").add(
          -30,
          "days"
        );
        const dateNow = moment();
        return dateNow.isAfter(dateStartAlarm) ? "red" : "#CCCCCC";
      };

      const columns = [
        {
          title: "",
          key: "avatar",
          render: (text, deposit) => (
            <Avatar
              size="large"
              style={{ backgroundColor: setAlarmByDate(deposit) }}
            >
              {`${deposit.bankName.charAt(0).toUpperCase()}`}
            </Avatar>
          ),
        },
        {
          title: "Deposite",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Bank",
          dataIndex: "bankName",
          key: "bankName",
        },

        Table.EXPAND_COLUMN,

        {
          title: "Sum",
          dataIndex: "sum",
          key: "sum",
        },
        {
          title: "Open Date",
          dataIndex: "openDate",
          key: "openDate",
          defaultSortOrder: "ascend",
          sorter: (a, b) => Date.parse(a.openDate) - Date.parse(b.openDate),
        },
        {
          title: "Duration",
          dataIndex: "durationDays",
          key: "durationDays",
        },
        {
          title: "Close Date",
          dataIndex: "closeDate",
          key: "closeDate",
          defaultSortOrder: "descend",
          sorter: (a, b) => Date.parse(a.closeDate) - Date.parse(b.closeDate),
        },
        {
          title: "Percent",
          dataIndex: "yearPercent",
          key: "yearPercent",
        },
        {
          title: "Percentage Type",
          dataIndex: "percentageType",
          key: "percentageType",
        },
        {
          title: "Capa",
          dataIndex: "capitalization",
          key: "capitalization",
          render: (text, deposit) => (
            <Avatar size="large">{`${deposit.capitalization}`}</Avatar>
          ),
        },
        {
          title: "Profit",
          dataIndex: "profit",
          key: "profit",
        },
        {
          title: "Action",
          key: "action",
          render: (text, record) => (
            <Fragment>
              <Popconfirm
                placement="topRight"
                title={`Are you sure to delete "${record.name}"?`}
                onConfirm={() => this.deleteDeposit(record.id)}
                okText="Yes"
                cancelText="No"
                onCancel={(e) => e.stopPropagation()}
              >
                <Button
                  type="danger"
                  size="small"
                  onClick={(e) => e.stopPropagation()}
                >
                  Delete
                </Button>
              </Popconfirm>
              <Button
                style={{ marginLeft: "5px" }}
                type="primary"
                size="small"
                onClick={() => this.editDeposit(record)}
              >
                Edit
              </Button>
              <Button
                style={{ marginLeft: "5px" }}
                type="primary"
                size="small"
                onClick={() => this.contributeDepositOn(record)}
              >
                Contribute
              </Button>
            </Fragment>
          ),
        },
      ];

      const depositsSum = (deposits) => {
        return deposits.map((d) => d.sum).reduce((a, b) => a + b, 0);
      };

      const depositsSumWithProfit = (deposits) => {
        return deposits.map((d) => d.profit).reduce((a, b) => a + b, 0);
      };

      return (
        <Container>
          <Header
            sumOfDeposits={depositsSum(deposits)}
            sumOfDepositsWithProfit={depositsSumWithProfit(deposits)}

            // handleAddDepositClickEvent={this.openAddDepositModal}
          />
          <Table
            style={{marginBottom: '100px'}}
            dataSource={deposits}
            expandable={{
              expandedRowRender,
            }}
            columns={columns}
            size="small"
            pagination={false}
            rowKey="id"
          />
          {commonElements()}
        </Container>
      );
    }

    return (
      <Container>
        <Empty description={<h1>No Deposits found</h1>} />
        {commonElements()}
      </Container>
    );
  }
}

export default App;
