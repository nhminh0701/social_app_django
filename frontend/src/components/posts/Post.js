import React from 'react';
import CommentForm from './CommentForm';
import Comments from './comments';


export default function Post(props) {
    return (
        <div className="card mb-4">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <p className="card-title mb-0">{props.data.author} <small>{props.data.created_at}</small></p> 
                    
                    <p className="my-4">{props.data.content}</p>
                </li>
                <li className="list-group-item">
                    <CommentForm postID={props.data.id} />
                    <Comments postData={props.data} />
                </li>
            </ul>
        </div>
    )
}
