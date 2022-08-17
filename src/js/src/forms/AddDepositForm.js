import React from "react";
import { Formik } from "formik";
import moment from "moment";

import { Input, Button, Tag, DatePicker, Space, Select, Checkbox } from "antd";

import { addNewDeposit } from "../client";

const inputBottomMargin = { marginBottom: "10px" };
const tagStyle = {
  backgroundColor: "#f50",
  color: "white",
  ...inputBottomMargin,
};

const { Option } = Select;

const AddDepositForm = (props) => (
  <Formik
    initialValues={{
      name: "",
      bankName: "",
      sum: "",
      openDate: moment(
        `${new Date().toLocaleDateString("en-CA")}`,
        "YYYY-MM-DD"
      ),
      closeDate: "",
      durationDays: 0,
      yearPercent: "",
      percentageType: "",
      capitalization: "true",
    }}
    validate={(values) => {
      let errors = {};

      if (!values.bankName) {
        errors.bankName = "Bank Name Required";
      }

      if (!values.sum) {
        errors.sum = "Initial Sum Required";
      }

      if (!values.openDate) {
        errors.openDate = "Open Date Required";
      }

      if (!values.durationDays && !values.closeDate) {
        errors.durationDays = "Duration or Close date Required";
        errors.closeDate = "Duration or Close date Required";
      }

      // if (values.durationDays&&values.closeDate) {

      //     errors.durationDays = 'Duration or Close date Required';
      //     errors.closeDate = 'Duration or Close date Required';

      // }

      if (!values.yearPercent) {
        errors.yearPercent = "Persentage Required";
      }

      if (!values.percentageType) {
        errors.percentageType = "Persentage Type Required";
      }

      return errors;
    }}
    onSubmit={(deposit, { setSubmitting }) => {
      addNewDeposit(deposit).then(() => {
        props.onSuccess();
        setSubmitting(false);
      });
    }}
  >
    {({
      values,

      errors,

      touched,

      handleChange,

      handleBlur,

      handleSubmit,

      isSubmitting,

      submitForm,

      isValid,

      setFieldValue,

      /* and other goodies */
    }) => (
      <form onSubmit={handleSubmit}>
        <Input
          style={inputBottomMargin}
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          placeholder="Deposit Name"
        />

        {errors.name && touched.name && errors.name}

        <Input
          style={inputBottomMargin}
          name="bankName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.bankName}
          placeholder="Bank Name"
        />

        {errors.bankName && touched.bankName && (
          <Tag style={tagStyle}>{errors.bankName}</Tag>
        )}

        <Input
          style={inputBottomMargin}
          name="sum"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.sum}
          placeholder="Initial Sum"
        />

        {errors.sum && touched.sum && <Tag style={tagStyle}>{errors.sum}</Tag>}

        <Input.Group
          style={inputBottomMargin}
          name="openDate"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.openDate}
          placeholder="Open Date"
        >
          <Space direction="vertical">
            <DatePicker
              name="openDate"
              defaultValue={moment(
                `${new Date().toLocaleDateString("en-CA")}`,
                "YYYY-MM-DD"
              )}
              onChange={(date, dateString) => {
                setFieldValue("openDate", dateString);
                setFieldValue(
                  "durationDays",
                  moment(values.closeDate, "YYYY-MM-DD").diff(date, "days")
                );
              }}
            />
          </Space>
        </Input.Group>

        {errors.openDate && touched.openDate && (
          <Tag style={tagStyle}>{errors.openDate}</Tag>
        )}

        <Input.Group
          // compact
          style={inputBottomMargin}
        >
          <Input
            style={{
              width: "50%",
            }}
            name="durationDays"
            // onChange={handleChange}
            onChange={(days) => {
              setFieldValue("durationDays", days.currentTarget.value);
              // const clDate = values.openDate.add(days.currentTarget.value, 'days').format("YYYY-MM-DD");
              // setFieldValue("closeDate",
              // // '2022-08-25'
              //  clDate);
            }}
            onBlur={handleBlur}
            // onBlur={(days) => {
            //     // setFieldValue("durationDays", days.currentTarget.value);
            //     const opDate = values.openDate;
            //     const clDate = opDate.add(days.currentTarget.value, 'days').format("YYYY-MM-DD");
            //     setFieldValue("closeDate",
            //     // '2022-08-25'
            //      clDate);
            // }}

            value={values.durationDays}
            disabled
            placeholder="Duration, Days"
          />

          <Space direction="vertical">
            <DatePicker
              name="closeDate"
              // value={values.closeDate}
              onBlur={handleBlur}
              // defaultValue={moment(`${new Date().toLocaleDateString('en-CA')}`, 'YYYY-MM-DD')}
              // defaultValuePicker={moment(`${new Date().toLocaleDateString('en-CA')}`, 'YYYY-MM-DD')}
              onChange={(date, dateString) => {
                setFieldValue("closeDate", dateString);
                setFieldValue(
                  "durationDays",
                  date.diff(values.openDate, "days")
                );
              }}
            />
          </Space>
        </Input.Group>

        {errors.durationDays && touched.durationDays && (
          <Tag style={tagStyle}>{errors.durationDays}</Tag>
        )}
        {errors.closeDate && touched.closeDate && (
          <Tag style={tagStyle}>{errors.closeDate}</Tag>
        )}

        <Input.Group
          // compact
          style={inputBottomMargin}
        >
          <Input
            style={{
              width: "50%",
            }}
            name="yearPercent"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.yearPercent}
            placeholder="Percentage"
          />

          <Select
            name="percentageType"
            // defaultValue="AT_THE_END"
            style={{ width: 120 }}
            onChange={(percentageType) =>
              setFieldValue("percentageType", percentageType)
            }
            onBlur={handleBlur}
            value={values.percentageType}
            placeholder="Percentage Type"
          >
            <Option value="AT_THE_END">At the End</Option>
            <Option value="YEARLY">Yearly</Option>
            <Option value="SEMIANNUALLY">Semiannually</Option>
            <Option value="QUARTERLY">Quarterly</Option>
            <Option value="MONTHLY">Monthly</Option>
            <Option value="MONTHLY_ON_DEPOSIT_DAY">
              Monthly on Deposit Day
            </Option>
            <Option value="DAILY">Daily</Option>
          </Select>
        </Input.Group>

        {errors.yearPercent && touched.yearPercent && (
          <Tag style={tagStyle}>{errors.yearPercent}</Tag>
        )}
        {errors.percentageType && touched.percentageType && (
          <Tag style={tagStyle}>{errors.percentageType}</Tag>
        )}

        {values.percentageType !== "AT_THE_END" && (
          <Input.Group style={inputBottomMargin}>
            <Checkbox
              name="capitalization"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.capitalization}
            >
              Capitalization
            </Checkbox>
          </Input.Group>
        )}

        <Button
          onClick={() => submitForm()}
          type="submit"
          disabled={isSubmitting | (touched && !isValid)}
        >
          Submit
        </Button>
      </form>
    )}
  </Formik>
);

export default AddDepositForm;
