import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Label, Row, Col, Button } from 'reactstrap';
import { LocalForm, Control/*, Errors*/ } from 'react-redux-form';
import { Link } from 'react-router-dom';

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                telnum: false,
                email: false
            }
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    validateFields(firstname, lastname, telnum, email) {
        const errors = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: ''
        }

        const minLen = 3, maxLen = 10;
        if (this.state.touched.firstname && firstname.length < minLen) {
            errors.firstname = `Firstname should contain at least ${minLen} characters`;
        }
        if (this.state.touched.firstname && firstname.length > maxLen) {
            errors.firstname = `Firstname should be less or equals to ${maxLen} characters`;
        }

        if (this.state.touched.lastname && lastname.length < minLen) {
            errors.lastname = `Lastname should contain at least ${minLen} characters`;
        }
        if (this.state.touched.lastname && lastname.length > maxLen) {
            errors.lastname = `Lastname should be less or equals to ${maxLen} characters`;
        }

        const onlyDigitsReg = /^\d+$/;
        if (this.state.touched.telnum && !onlyDigitsReg.test(telnum)) {
            errors.telnum = "Telephone number should contain only digits";
        }

        if (this.state.touched.email && email.split('').filter((x) => x === '@').length === 0) {
            errors.email = "Email should contain @ character";
        }

        return errors;
    }

    onBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    onInputChange(event) {
        const input = event.target;
        const name = input.name;
        const value = input.type === 'checkbox' ? input.checked : input.value;

        this.setState({
            [name]: value
        });
    }

    onSubmit(values) {
        console.log("Submited response: " + JSON.stringify(values));
        alert("Submited response: " + JSON.stringify(values));
        //event.preventDefault();
    }

    render() {
        //const errors = this.validateFields(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
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
                        <LocalForm onSubmit={(values) => this.onSubmit(values)}>
                            <Row className="form-group">
                                <Label md={2} htmlFor="firstname">First Name:</Label>
                                <Col md={10}>
                                    <Control.text id="firstname" model=".firstname" name="firstname"
                                        placeholder="First Name" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="lastname">Last Name:</Label>
                                <Col md={10}>
                                    <Control.text id="lastname" model=".lastname" name="lastname"
                                        placeholder="Last Name" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="telnum">Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text id="telnum" model=".telnum" name="telnum"
                                        placeholder="Tel. number" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="email">Contact Email</Label>
                                <Col md={10}>
                                    <Control.text id="email" model=".email" name="email"
                                        placeholder="Email" className="form-control" />
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
                        </LocalForm>
                    </Col>
                </div>
            </div>
        );
    }
}

export default Contact;