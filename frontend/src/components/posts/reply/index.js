import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Reply from './Reply';
import ReplyForm from './ReplyForm';
import PropTypes from 'prop-types';


function Replies(props) {
    const repliesList = (
        <ul className="list-group list-group-flush">
            { props.replies.map((reply, index) => 
            <Reply key={index} reply={reply} 
                postID={props.postID} ws={props.ws} />) }
        </ul>
    )

    return (
        <Fragment>
            { props.repliesShowed ?
                repliesList : <Fragment />
            }
            { props.auth.isAuthenticated ? 
                <ReplyForm
                    postID={props.postID}
                    commentID={props.commentID} 
                    ws={props.ws}
                    /> : <Fragment />
            }
        </Fragment>
    )
}


Replies.propTypes = {
    commentID: PropTypes.number.isRequired,
    postID: PropTypes.number.isRequired,
    replies: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    ws: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(Replies);