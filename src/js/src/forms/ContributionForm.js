import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const inputBottomMargin = { marginBottom: "10px" };
const tagStyle = {
  backgroundColor: "#f50",
  color: "white",
  display: "block",
  maxWidth: "min-content",
  ...inputBottomMargin,
};

const ContributionForm = (props) => {
  const { submitter, initialValues, depositId } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        date: Yup.mixed().required("Date Required"),
        sum: Yup.number().required("Sum Required").min(0, "Over zero"),
      })}
      onSubmit={(contribution, { setSubmitting }) => {
        contribution.depositId = depositId;
        console.log(contribution);
        submitter(contribution);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, touched, isValid }) => (
        <Form>
          <Field
            style={inputBottomMargin}
            id="date"
            name="date"
            type="date"
            className="ant-picker"
          />

          <ErrorMessage
            component="div"
            style={tagStyle}
            name="date"
            className="ant-tag"
          />

          <Field
            style={inputBottomMargin}
            id="sum"
            name="sum"
            type="number"
            className="ant-input"
            placeholder="Sum"
          />

          <ErrorMessage
            component="div"
            style={tagStyle}
            name="sum"
            className="ant-tag"
          />

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

export default ContributionForm;
