import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Col, Input, Button, FormFeedback } from 'reactstrap';
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
            touched: { ... this.state.touched, [field]: true }
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

    onSubmit(event) {
        console.log("Submited response: " + JSON.stringify(this.state));
        alert("Submited response: " + JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {
        const errors = this.validateFields(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
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
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup row>
                                <Label md={2} htmlFor="firstname">First Name:</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname" placeholder="First Name"
                                        value={this.state.firstname} onChange={this.onInputChange} onBlur={this.onBlur('firstname')}
                                         valid={errors.firstname===''} invalid={errors.firstname!==''}/>
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={2} htmlFor="lastname">Last Name:</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname" placeholder="Last Name"
                                        value={this.state.lastname} onChange={this.onInputChange} onBlur={this.onBlur('lastname')}
                                        valid={errors.lastname===''} invalid={errors.lastname!==''}/>
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={2} htmlFor="telnum">Contact Tel.</Label>
                                <Col md={10}>
                                    <Input type="tel" id="telnum" name="telnum" placeholder="Tel. number"
                                        value={this.state.telnum} onChange={this.onInputChange} onBlur={this.onBlur('telnum')}
                                        valid={errors.telnum===''} invalid={errors.telnum!==''}/>
                                    <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={2} htmlFor="email">Contact Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email" placeholder="Email"
                                        value={this.state.email} onChange={this.onInputChange} onBlur={this.onBlur('email')}
                                        valid={errors.email===''} invalid={errors.email!==''}/>
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 6, offset: 2 }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree"
                                                checked={this.state.agree} onChange={this.onInputChange} />
                                            {' '} <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Input type="select" name="contactType"
                                        checked={this.state.contactType} onChange={this.onInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={2} htmlFor="message">Your feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message" rows="12"
                                        value={this.state.message} onChange={this.onInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">Send Feedback</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </div>
            </div>
        );
    }
}

export default Contact;