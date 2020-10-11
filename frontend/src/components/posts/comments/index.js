import React from 'react';
import Comment from './Comment';


export default function Comments(props) {
    return (
        <ul className="list-group list-group-flush mt-3">
            { props.comments.map((comment, index) => 
            <Comment key={index} comment={comment} />) }
        </ul>
    )
}
