import React, { Component } from 'react';
import { Formik } from 'formik';
import moment from 'moment';

import {
    Input,
    Tag,
    Button,
    Select,
    Space,
    DatePicker,
    Checkbox
} from 'antd';

const inputBottomMargin = { marginBottom: '10px' };
const tagStyle = { backgroundColor: '#f50', color: 'white', ...inputBottomMargin }
const { Option } = Select;

export default class EditDepositForm extends Component {
    render() {
        const { submitter, initialValues } = this.props;
        return (
            <Formik
                initialValues={initialValues}

                validate={values => {

                    let errors = {};

                    if (!values.bankName) {

                        errors.bankName = 'Bank Name Required';

                    }

                    if (!values.openDate) {

                        errors.openDate = 'Open Date Required';

                    }

                    if (!values.durationDays) {

                        errors.durationDays = 'Duration Required';

                    }

                    if (!values.yearPercent) {

                        errors.yearPercent = 'Persentage Required';

                    }

                    return errors;

                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values)
                    submitter(values);
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    isValid,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    submitForm,
                    setFieldValue
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Input
                            style={inputBottomMargin}

                            name="name"

                            onChange={handleChange}

                            onBlur={handleBlur}

                            value={values.name}

                            placeholder='Deposit Name'

                        />

                        {errors.name && touched.name && errors.name}

                        <Input
                            style={inputBottomMargin}

                            name="bankName"

                            onChange={handleChange}

                            onBlur={handleBlur}

                            value={values.bankName}

                            placeholder='Bank Name'

                        />

                        {errors.bankName && touched.bankName && <Tag style={tagStyle}>{errors.bankName}</Tag>}


                        <Input.Group
                            style={inputBottomMargin}

                            name="openDate"

                            onChange={handleChange}

                            onBlur={handleBlur}

                            value={values.openDate}

                            placeholder='Open Date'
                        >

                            {/* <Space direction="vertical"> */}
                            <DatePicker
                                name="openDate"
                                defaultValue={moment(`${initialValues.openDate}`, 'YYYY-MM-DD')}
                                format='YYYY-MM-DD'
                                onChange={(date, dateString) =>
                                    setFieldValue("openDate", dateString)
                                }
                            // value={values.openDate !== "" ? moment(values.openDate) : ""}
                            />
                            {/* </Space> */}
                        </Input.Group>

                        {errors.openDate && touched.openDate && <Tag style={tagStyle}>{errors.openDate}</Tag>}

                        
                <Input.Group
                    // compact
                    style={inputBottomMargin}>
                    <Input
                        style={{
                            width: '50%',
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

                        placeholder='Duration, Days'

                    />

                    <Space direction="vertical">
                        <DatePicker
                            name="closeDate"
                            // value={values.closeDate}
                            onBlur={handleBlur}
                            defaultValue={moment(`${initialValues.closeDate}`, 'YYYY-MM-DD')}
                            onChange={(date, dateString) => {
                                setFieldValue("closeDate", dateString);
                                setFieldValue("durationDays", date.diff(values.openDate, 'days'));
                            }
                            }
                        />
                    </Space>
                </Input.Group>

                {errors.durationDays && touched.durationDays && <Tag style={tagStyle}>{errors.durationDays}</Tag>}
                {errors.closeDate && touched.closeDate && <Tag style={tagStyle}>{errors.closeDate}</Tag>}

                        {
                            <Input.Group
                                compact
                                style={inputBottomMargin}>

                                <Input
                                    style={{
                                        width: '50%',
                                    }}

                                    name="yearPercent"

                                    onChange={handleChange}

                                    onBlur={handleBlur}

                                    value={values.yearPercent}

                                    placeholder='Percentage'

                                />

                                <Select
                                    name="percentageType"
                                    defaultValue="AT_THE_END"
                                    style={{ width: 200 }}
                                    onChange={(percentageType) =>
                                        setFieldValue("percentageType", percentageType)
                                    }
                                    onBlur={handleBlur}
                                    value={values.percentageType}
                                    placeholder='Percentage Type'

                                >
                                    <Option value="AT_THE_END">At the End</Option>
                                    <Option value="YEARLY">Yearly</Option>
                                    <Option value="SEMIANNUALLY">Semiannually</Option>
                                    <Option value="QUARTERLY">Quarterly</Option>
                                    <Option value="MONTHLY">Monthly</Option>
                                    <Option value="MONTHLY_ON_DEPOSIT_DAY">Monthly on Deposit Day</Option>
                                    <Option value="DAILY">Daily</Option>
                                </Select>
                            </Input.Group>
                        }

                        {errors.yearPercent && touched.yearPercent && <Tag style={tagStyle}>{errors.yearPercent}</Tag>}
                        <Input.Group
                            style={inputBottomMargin}>

                            <Checkbox
                                name="capitalization"
                                checked={values.capitalization}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.capitalization}
                            >
                                Capitalization
                            </Checkbox>

                        </Input.Group>

                        <Button
                            onClick={() => submitForm()}
                            type="submit"
                            disabled={isSubmitting | (touched && !isValid)}>
                            Submit
                        </Button>

                    </form>
                )}
            </Formik>
        )
    }
}