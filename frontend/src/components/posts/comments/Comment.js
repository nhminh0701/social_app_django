import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteComment } from '../../../actions/comments';
import CommentEditForm from './CommentEditForm';
import Replies from '../reply';



export class Comment extends Component {

    state = {
        editMode: false,
        repliesShowed: false,
    }

    isEditable = () => {
        if (this.props.auth.user) {
            return this.props.auth.user.username === this.props.comment.author;
        } else {
            return this.props.auth.user;
        }
    }

    onDeleteClick = () => {
        // this.props.deleteComment(
        //     this.props.comment.id, this.props.comment.post);
        this.props.ws.send(JSON.stringify({
            commentID: this.props.comment.id,
            postID: this.props.comment.post,
            token: this.props.auth.token,
            type: 'DELETING_COMMENT',
        }))
    }

    onEditClick = e => {
        this.toggleEditMode()
        e.target.innerText = this.state.editMode ? "Edit" : "Cancel";
    }

    onShowRepliesToggle = () => {
        this.toggleShowReplies();
    }

    toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    toggleShowReplies = () => {
        this.setState({
            repliesShowed: !this.state.repliesShowed
        })
    }

    getCommentComponent = () => (
        <li className="list-group-item">
            <div className="d-flex w-100 justify-content-between align-items-center mb-1 mt-3">
                <p className="my-0">{ this.props.comment.author }</p>
                {   
                    !this.isEditable() ?
                    <Fragment /> :
                    this.props.posts.isCommentLoading ? 
                    <p>Loading</p> : this.getLoadedEditBtns() }
            </div>
            <small>{ this.props.comment.created_at }</small>
            {   
                !(this.state.editMode && this.isEditable()) ? 
                <p>{ this.props.comment.content }</p> :
                this.props.posts.isCommentLoading ? 
                <p>Loading</p> : 
                <CommentEditForm 
                    comment={this.props.comment} 
                    toggleEditMode={this.toggleEditMode}
                    ws={this.props.ws}
                />
            }
            {  
                !this.props.auth.isAuthenticated && this.props.comment.replies.length === 0 ?
                <Fragment /> : this.getShowRepliesBtn()
            }
        </li>
    )

    getLoadedEditBtns = () => (
        <div className="btn-group" role="group">
            <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={this.onEditClick}
                >Edit</button>
            <button 
                type="button" 
                className="btn btn-danger btn-sm"
                onClick={this.onDeleteClick}
                >Delete</button>
        </div>
    )
    
    getShowRepliesBtnText = () => {
        const repliesCount = this.props.comment.replies.length;
        const showBtnText = repliesCount === 0 ?
            'Reply' : 
            repliesCount === 1 ? `Show reply` :
            `Show all ${repliesCount} replies`;
        const hideBtnText = repliesCount === 0 ?
            'Reply' : 
            repliesCount === 1 ? 'Hide reply' :
            `Hide all ${repliesCount} replies`;
        return this.state.repliesShowed ?  
            hideBtnText : showBtnText;
    }

    getShowRepliesBtn = () => (
        <button 
                className="btn btn-sm btn-light"
                onClick={this.onShowRepliesToggle}
        >{this.getShowRepliesBtnText()}</button>
    )

    render() {
            
        return (
            <Fragment>
                { this.getCommentComponent() }
                <div className="ml-4 pl-3 mt-2 mb-4">
                    <Replies 
                        repliesShowed={this.state.repliesShowed}
                        postID={this.props.comment.post}
                        commentID={this.props.comment.id}
                        replies={this.props.comment.replies}
                        ws={this.props.ws}
                    />
                </div>
            </Fragment>
        )
    }
}

Comment.propTypes = {
    comment: PropTypes.shape({
        author: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        post: PropTypes.number.isRequired,
        replies: PropTypes.array.isRequired,
    }),
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    ws: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    posts: state.posts,
    auth: state.auth,
})

export default connect(mapStateToProps, {deleteComment})(Comment)
