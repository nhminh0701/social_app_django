import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Reply from './Reply';
import ReplyForm from './ReplyForm';
import PropTypes from 'prop-types';


function Replies(props) {
    const repliesList = (
        <ul className="list-group list-group-flush">
            { props.replies.map((reply, index) => 
            <Reply key={index} 
                reply={reply} postID={props.postID} />) }
        </ul>
    )

    return (
        <Fragment>
            { props.repliesShowed ?
                repliesList : <Fragment />
            }
            { props.isAuthenticated ? 
                <ReplyForm
                    postID={props.postID}
                    commentID={props.commentID} /> : <Fragment />
            }
        </Fragment>
    )
}


Replies.propTypes = {
    commentID: PropTypes.number.isRequired,
    postID: PropTypes.number.isRequired,
    replies: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Replies);