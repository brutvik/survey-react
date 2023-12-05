import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { FormControlLabel, RadioGroup, Radio } from '@mui/material';
import axios from 'axios';
import { Container, Row, Col, Button, FormLabel, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';

const Survey = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        telephone: '',
        address: '',
        interest: '',
        state: '',
        zip: '',
        email: '',
        dos: '',
        comments: '',
		checked: [],
		recommendation: "" ,
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        telephone: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        interest: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        zip: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email format").required("Required"),
        dos: Yup.date().required("Required"),
        comments: Yup.string().required("Required"),
		recommendation: Yup.string().required("Color is required!"),
    });

    const onSubmit = async (values) => {
        try {
            console.log(values);
			let liked="";
			for(let i=0;i<values.checked.length;i++){
				if(i===0){
					liked=liked+values.checked[i];
				}
				else{
					liked=liked+','+values.checked[i];
				}
				values['liked']=liked;
			}
            const response = await axios.post("http://localhost:8080/hw3/registerUser", values, {
                headers: {
                    "Content-Type": "application/json",
                },
                data: values,
            });
            if(response.status===202){
                alert('Survey submitted successfully');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/userList">User List</Link></li>
                        <li><Link to="/home">Home</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="d-flex 100-vh m-5">
                <Container className="container Body">
                    <Card className="p-5 card">
					<div className="header-box">
   						<h2 className="text-center m-5">Student Survey !!</h2>
					</div>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
						{({ dirty, isValid, values, setFieldValue, handleChange}) => (
								<Form>
									<Row spacing={3}>
										<Col xs={12} sm={6} md={6}>
											<FormLabel className="form-label" >First Name</FormLabel>
											<Field component={TextField} variant="outlined" fullWidth name="firstName" />
										</Col>	
										<Col xs={12} sm={6} md={6}>
											<FormLabel className="form-label">Last Name</FormLabel>
											<Field component={TextField} variant="outlined" fullWidth name="lastName" />
										</Col>									
									</Row>
									<Row>
										
										<Col xs={12} sm={6} md={6}>
											<FormLabel className="form-label">Telephone Number</FormLabel>
											<Field component={TextField} variant="outlined" fullWidth name="telephone" type="number" />
										</Col>
										<Col xs={12} sm={6} md={6}>
											<FormLabel className="form-label">Address</FormLabel>
											<Field component={TextField} variant="outlined" fullWidth name="address" />
										</Col>
									</Row>
									<Row>
										
										<Col xs={12} sm={6} md={6}>
											<FormLabel className="form-label">State</FormLabel>
											<Field component={TextField} variant="outlined" fullWidth name="state" />
										</Col>
										<Col xs={12} sm={6} md={6}>
											<FormLabel className="form-label">Email</FormLabel>
											<Field component={TextField} variant="outlined" fullWidth name="email" type="email" />
										</Col>
									</Row>
									<Row>
										<Col xs={12} sm={6} md={6}>
											<FormLabel className="form-label">Zip</FormLabel>
											<Field component={TextField} variant="outlined" fullWidth name="zip" />
										</Col>
										<Col xs={12} sm={6} md={6}>
											<FormLabel className="form-label">How did you become interested in the university?</FormLabel>
												<RadioGroup name="interest" value={values.interest} onChange={handleChange}>
													<FormControlLabel value="friends" control={<Radio />} label="Friends" className="form-check-label"/>
													<FormControlLabel value="television" control={<Radio />} label="Television" className="form-check-label"/>
													<FormControlLabel value="internet" control={<Radio />} label="Internet" className="form-check-label"/>
													<FormControlLabel value="other" control={<Radio />} label="Other" className="form-check-label"/>
												</RadioGroup>
												</Col>
									</Row>
                				    <Row>
										<Col xs={12} sm={6} md={6}>
											<FormLabel className="form-label">Date</FormLabel>
											<Field component={TextField} variant="outlined" fullWidth name="dos" type="date" />
										</Col>
										<Col xs={12} sm={6} md={6}>
											<FormLabel className="form-label">Any additional comments/suggestions?</FormLabel>
											<Field component={TextField} variant="outlined" fullWidth name="comments" multiline />
										</Col>
										<Col xs={12} sm={6} md={6}>
                                            <FormLabel className="form-label">Recommendation</FormLabel>
                                            <select
                                                name="recommendation"
                                                value={values.recommendation}
                                                onChange={handleChange}
                                                className="form-control">
                                                <option value="" label="Select a option">Select a Option</option>
                                                <option value="Likely" label="Likely">Likely</option>
                                                <option value="Very Likely" label="Very Likely">Very Likely</option>
                                                <option value="Unlikely" label="Unlikely">Unlikely</option>
                                            </select>
                                        </Col>
										<Col xs={12} sm={6} md={6}>
                                            <FormLabel className="form-label">Checkboxes</FormLabel>
                                            <div role="group" aria-labelledby="checkbox-group">
                                                {['Students', 'Location', 'Campus', 'Atmosphere', 'Dorm Rooms', 'Sports'].map((option) => (
                                                    <div key={option} className="form-check">
                                                        <Field type="checkbox" name="checked" value={option} id={option} />
                                                        <label htmlFor={option} className="form-check-label">
                                                            {option}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </Col>
									</Row>                                    																		
									<div className="m-5 text-center">
									<Button className="button-primary" disabled={!dirty || !isValid} variant="contained" type="submit">
  										 Submit
									</Button>
                                    <Button className="button-primary" variant="contained" type="reset">
  										 Reset
									</Button>
									</div>
								</Form>
							)}
                        </Formik>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default Survey;
