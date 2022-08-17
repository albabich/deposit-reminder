import React, { Component } from "react";
import { Formik } from "formik";
import moment from 'moment';
import {
    Input,
    Button,
    Tag,
    DatePicker,
} from "antd"


const inputBottomMargin = { marginBottom: '10px' };
const tagStyle = { backgroundColor: '#f50', color: 'white', ...inputBottomMargin }


export default class EditContributionForm extends Component {
    render() {
        const { submitter, initialValues } = this.props;
        return (
            <Formik
                initialValues = { initialValues }

                validate={values => {

                    let errors = {};

                    if (!values.date) {

                        errors.date = 'Date Required';

                    }

                    if (!values.sum) {

                        errors.sum = 'Sum Required';

                    }

                    return errors;

                }}

                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    submitter(values);
                    setSubmitting(false);

                }

                }
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

                    setFieldValue

                    /* and other goodies */

                }) => (

                    <form onSubmit={handleSubmit}>

                        <Input.Group
                            style={inputBottomMargin}

                            name="date"

                            onChange={handleChange}

                            onBlur={handleBlur}

                            value={values.date}

                            placeholder='Date'
                        >

                            {/* <Space direction="vertical"> */}
                            <DatePicker
                                name="date"
                                defaultValue={moment(`${initialValues.date}`, 'YYYY-MM-DD')}
                                format='YYYY-MM-DD'
                                onChange={(date, dateString) =>
                                    setFieldValue("date", dateString)
                                }
                                onBlur={handleBlur}
                            />
                            {/* </Space> */}
                        </Input.Group>

                        {errors.openDate && touched.openDate && <Tag style={tagStyle}>{errors.openDate}</Tag>}

                        <Input
                            style={inputBottomMargin}

                            name="sum"

                            onChange={handleChange}

                            onBlur={handleBlur}

                            value={values.sum}

                            placeholder='Sum'

                        />

                        {errors.sum && touched.sum && <Tag style={tagStyle}>{errors.sum}</Tag>}

                        <Button
                            onClick={() => submitForm()}
                            type="submit"
                            disabled={isSubmitting | (touched && !isValid)}>
                            Submit
                        </Button>

                    </form>

                )}

            </Formik >
        );
    }

}
