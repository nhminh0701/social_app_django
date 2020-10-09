import React, { Fragment } from 'react';
import Reply from './Reply';
import ReplyForm from './ReplyForm';


export default function Replies(props) {
    return (
        <Fragment>
            <ReplyForm 
                postID={props.postID} 
                commentID={props.commentID}
            />
            <ul className="list-group list-group-flush">
                { props.replies.map((reply, index) => 
                <Reply key={index} 
                    reply={reply} postID={props.postID} />) }
            </ul>
        </Fragment>
    )
}
