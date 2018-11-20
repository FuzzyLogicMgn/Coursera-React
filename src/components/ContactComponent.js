import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Label, Row, Col, Button } from 'reactstrap';
import { Form, Control, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

class Contact extends Component {

    onSubmit(values) {
        console.log("Submitted values: " + JSON.stringify(values));
        alert("Submitted values: " + JSON.stringify(values));
        this.props.resetFeedbackForm();
        //event.preventDefault();
    }

    render() {
        const required = (val) => val && val.length;
        const minLen = (len) => (val) => val && len <= val.length;
        const maxLen = (len) => (val) => !val || val.length < len;
        const isNumber = (val) => !isNaN(Number(val));
        const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <Col xs={12}>
                        <h3>Send us your Feedback</h3>
                    </Col>
                    <Col xs={12} md={10}>
                        <Form model='feedback' onSubmit={(values) => this.onSubmit(values)}>
                            <Row className="form-group">
                                <Label md={2} htmlFor="firstname">First Name:</Label>
                                <Col md={10}>
                                    <Control.text id="firstname" model=".firstname" name="firstname"
                                        placeholder="First Name" className="form-control"
                                        validators={{ required, minLen: minLen(2), maxLen: maxLen(15) }} />
                                    <Errors className="text-danger" model=".firstname" show="touched" messages={{
                                        required: "Field is required",
                                        minLen: "First name must be at least 2 characters long",
                                        maxLen: "First name must be 15 characters or less"
                                    }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="lastname">Last Name:</Label>
                                <Col md={10}>
                                    <Control.text id="lastname" model=".lastname" name="lastname"
                                        placeholder="Last Name" className="form-control"
                                        validators={{ required, minLen: minLen(2), maxLen: maxLen(15) }} />
                                    <Errors className="text-danger" model=".lastname" show="touched" messages={{
                                        required: "Field is required",
                                        minLen: "Last name must be at least 2 characters long",
                                        maxLen: "Last name must be 15 characters or less"
                                    }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="telnum">Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text id="telnum" model=".telnum" name="telnum"
                                        placeholder="Tel. number" className="form-control"
                                        validators={{ required, minLen: minLen(2), maxLen: maxLen(15), isNumber }} />
                                    <Errors className="text-danger" model=".telnum" show="touched" messages={{
                                        required: "Field is required",
                                        minLen: "Tel. number must be at least 2 digits long",
                                        maxLen: "Tel. number must be 15 digits or less",
                                        isNumber: "Tel. number must contain only digits"
                                    }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="email">Contact Email</Label>
                                <Col md={10}>
                                    <Control.text id="email" model=".email" name="email"
                                        placeholder="Email" className="form-control"
                                        validators={{ required, validEmail }} />
                                    <Errors className="text-danger" model=".email" show="touched" messages={{
                                        required: "Field is required",
                                        validEmail: "Not valid email address"
                                    }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 6, offset: 2 }}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree" className="form-check-input" />
                                            {' '} <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Control.select model=".contactType" name="contactType" className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="message">Your feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message" rows="12" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">Send Feedback</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </div>
            </div>
        );
    }
}

export default Contact;