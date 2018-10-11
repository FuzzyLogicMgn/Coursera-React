import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderDish(dish) {
    if (dish != null) {
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } else {
        return (<div></div>);
    }
}

function RenderComments(comments) {
    if (comments != null) {
        const dateOpts = {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        };
        const dateFormatter = new Intl.DateTimeFormat("en-US", dateOpts);
        const commentsItem = comments.map((comm) => {
            return (
                <li>
                    <p>{comm.comment}</p>
                    <p>--{comm.author}, {dateFormatter.format(new Date(comm.date))}</p>
                </li>
            );
        });
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentsItem}
                </ul>
            </div>
        );
    } else {
        return (<div></div>);
    }
}

const DishDetail = (props) => {
    if (props.selectedDish != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {RenderDish(props.selectedDish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {RenderComments(props.selectedDish.comments)}
                    </div>
                </div>
            </div>
        );
    } else {
        return (<div></div>);
    }
}

export default DishDetail;