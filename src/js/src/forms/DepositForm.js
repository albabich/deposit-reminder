import React from "react";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import moment from "moment";
import "./DepositForm.css";

const inputBottomMargin = { marginBottom: "10px" };
const tagStyle = {
  backgroundColor: "#f50",
  color: "white",
  display: "block",
  maxWidth: "min-content",
  ...inputBottomMargin,
};

const openDate = moment(new Date());
const year = openDate.year();
const closeDate = moment(new Date()).add(1, "years");
const daysInYear =
  (year % 4 === 0 && year % 100 > 0) || year % 400 === 0 ? 366 : 365;

const FormInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input {...field} { ...props} style= {{ marginBottom: "10px" }} className="ant-input"/>
      {meta.touched && meta.error ? (
        <div style={tagStyle} className="ant-tag">
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

const DepositForm = (props) => {
  const { submitter, initialValues } = props;

  return (
    <Formik
      initialValues={
        initialValues
          ? initialValues
          : {
              name: "",
              bankName: "",
              sum: "",
              openDate: `${openDate.format("YYYY-MM-DD")}`,
              durationDays: `${daysInYear}`,
              closeDate: `${closeDate.format("YYYY-MM-DD")}`,
              yearPercent: "",
              percentageType: "",
              capitalization: false,
            }
      }
      validationSchema={Yup.object({
        name: Yup.string().min(2, "Min 2 symbols").required("Name Required"),
        bankName: Yup.string()
          .min(2, "Min 2 symbols")
          .required("Bank Name Required"),
        sum: Yup.number().required("Sum Required").min(0, "Over zero"),
        durationDays: Yup.number("Must be a Number"),
        openDate: Yup.mixed().required("Open Date Required"),
        closeDate: Yup.mixed().required("Close Date Required"),
        yearPercent: Yup.number()
          .required("Percent Required")
          .min(0, "Over zero"),
        percentageType: Yup.string().required("Select Percentage Type"),
      })}
      onSubmit={(deposit, { setSubmitting }) => {
        console.log(deposit);
        submitter(deposit);
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, setFieldValue, touched, isValid }) => (
        <Form>
          <FormInput
            id="name"
            name="name"
            type="text"
            placeholder="Deposit Name"
          />

          <FormInput
            id="bankName"
            name="bankName"
            type="text"
            placeholder="Bank Name"
          />

          {initialValues === undefined && (
            <FormInput
              id="sum"
              name="sum"
              type="number"
              placeholder="Initial Sum"
            />
          )}

          <Field
            id="openDate"
            name="openDate"
            type="date"
            className="ant-picker"
            style={inputBottomMargin}
            onChange={(date) => {
              setFieldValue("openDate", date.currentTarget.value);
              if (date.currentTarget.value) {
                setFieldValue(
                  "durationDays",
                  moment(values.closeDate).diff(
                    date.currentTarget.value,
                    "days"
                  )
                );
              } else {
                setFieldValue("durationDays", "");
              }
            }}
          />

          <ErrorMessage
            component="div"
            style={tagStyle}
            name="openDate"
            className="ant-tag"
          />

          <FormInput
            id="durationDays"
            name="durationDays"
            type="number"
            placeholder="Duration, Days"
            onChange={(days) => {
              setFieldValue("durationDays", days.currentTarget.value);
              const clDate = moment(values.openDate)
                .add(days.currentTarget.value, "days")
                .format("YYYY-MM-DD");
              setFieldValue("closeDate", clDate);
            }}
          />

          <Field
            id="closeDate"
            name="closeDate"
            type="date"
            className="ant-picker"
            style={inputBottomMargin}
            onChange={(date) => {
              setFieldValue("closeDate", date.currentTarget.value);
              if (date.currentTarget.value) {
                setFieldValue(
                  "durationDays",
                  moment(date.currentTarget.value).diff(values.openDate, "days")
                );
              } else {
                setFieldValue("durationDays", "");
              }
            }}
          />

          <ErrorMessage
            component="div"
            style={tagStyle}
            name="closeDate"
            className="ant-tag"
          />

          <FormInput
            id="yearPercent"
            name="yearPercent"
            type="number"
            placeholder="Percentage"
          />

          <Field
            id="percentageType"
            name="percentageType"
            as="select"
            required
          >
            <option value="">Select Percentage Type</option>
            <option value="AT_THE_END">At the End</option>
            <option value="YEARLY">Yearly</option>
            <option value="SEMIANNUALLY">Semiannually</option>
            <option value="QUARTERLY">Quarterly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="MONTHLY_ON_DEPOSIT_DAY">
              Monthly on Deposit Day
            </option>
            <option value="DAILY">Daily</option>
          </Field>

          <ErrorMessage
            component="div"
            style={tagStyle}
            name="percentageType"
            className="ant-tag"
          />

          {values.percentageType !== "AT_THE_END" && (
            <label className="checkbox">
              <Field name="capitalization" type="checkbox" />
              Capitalization
            </label>
          )}

          <button
            type="submit"
            className="ant-btn ant-btn-submit"
            disabled={isSubmitting | (touched && !isValid)}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DepositForm;
