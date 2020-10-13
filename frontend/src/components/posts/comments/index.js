import React from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';


export default function Comments(props) {
    return (
        <ul className="list-group list-group-flush mt-3">
            { props.comments.map((comment, index) => 
            <Comment 
            key={index} ws={props.ws}
            comment={comment} />) }
        </ul>
    )
}

Comments.propTypes = {
    ws: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
}