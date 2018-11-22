import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Label, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Stagger, Fade } from 'react-animation-components';


class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleCommentModal = this.toggleCommentModal.bind(this);
    }

    toggleCommentModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    submitComment(values) {        
        console.log("Submitted comment: ", values);
        this.props.postComment(this.props.dishId, +values.rating, values.author, values.comment);
    }

    render() {
        const minLen = (len) => (val) => val && val.length >= len;
        const maxLen = (len) => (val) => !val || val.length <= len;

        return (
            <div>
                <Button outline onClick={this.toggleCommentModal}>
                    <span className="fa fa-lg fa-sign-in" /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleCommentModal}>
                    <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.submitComment(values)}>
                            <div className="form-group">
                                <Label for="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label for="author">Your Name</Label>
                                <Control.text model=".author" id="author" className="form-control"
                                    validators={{ minLen: minLen(3), maxLen: maxLen(15) }} />
                                <Errors className="text-danger" model=".author" show="touched"
                                    messages={{
                                        minLen: "User name must contain at least 3 characters",
                                        maxLen: "User name must be 15 characters or less"
                                    }} />
                            </div>
                            <div className="form-group">
                                <Label for="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" className="form-control" rows="6" />
                            </div>
                            <div className="form-group">
                                <Button type="submit" color="primary">Submit</Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


function RenderDish(dish) {
    if (dish != null) {
        return (
            <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    } else {
        return (<div></div>);
    }
}

function RenderComments(comments, postComment, dishId) {
    if (comments != null) {
        const dateOpts = {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        };
        const dateFormatter = new Intl.DateTimeFormat("en-US", dateOpts);
        const commentsItem = comments.map((comm) => {
            return (
                <Fade in  key={comm.id}>
                    <li>
                        <p>{comm.comment}</p>
                        <p>--{comm.author}, {dateFormatter.format(new Date(comm.date))}</p>
                    </li>
                </Fade>
            );
        });
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {commentsItem}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        );
    } else {
        return (<CommentForm dishId={dishId} postComment={postComment}/>);
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {RenderDish(props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {RenderComments(props.comments, props.postComment, props.dish.id)}
                    </div>
                </div>
            </div>
        );
    } else {
        return (<div></div>);
    }
}

export default DishDetail;