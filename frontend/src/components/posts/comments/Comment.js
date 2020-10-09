import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteComment } from '../../../actions/comments';
import CommentEditForm from './CommentEditForm';
import Replies from '../reply';



export class Comment extends Component {

    static propTypes = {
        comment: PropTypes.shape({
            author: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            post: PropTypes.number.isRequired,
        }),
        auth: PropTypes.object.isRequired,
        posts: PropTypes.object.isRequired,
        deleteComment: PropTypes.func.isRequired,
    }

    state = {
        editMode: false,
    }

    isEditable = () => {
        if (this.props.auth.user) {
            return this.props.auth.user.username === this.props.comment.author;
        } else {
            return this.props.auth.user;
        }
    }

    onDeleteClick = () => {
        this.props.deleteComment(
            this.props.comment.id, this.props.comment.post);
    }

    onEditClick = e => {
        this.toggleEditMode()
        e.target.innerText = this.state.editMode ? "Edit" : "Cancel";
    }

    toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    render() {
        const loadingJSX = <p>Loading</p>;

        const loadingBtnJSX = <p>Loading</p>;
        const loadedBtnJSX = <div className="btn-group" role="group">
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

        const loadedJSX = <li className="list-group-item">
            <div className="d-flex w-100 justify-content-between align-items-center mb-4">
                <p className="my-0">{ this.props.comment.author }</p>
                {   
                    !this.isEditable() ?
                    <Fragment /> :
                    this.props.posts.isCommentLoading ? 
                    loadingBtnJSX : loadedBtnJSX }
            </div>
            <p>{ this.props.comment.created_at }</p>
            {   
                !(this.state.editMode && this.isEditable()) ? 
                <p>{ this.props.comment.content }</p> :
                this.props.posts.isCommentLoading ? 
                loadingJSX : 
                <CommentEditForm 
                    comment={this.props.comment} 
                    toggleEditMode={this.toggleEditMode}
                />
            }
            
        </li>

        return (
            <Fragment>
                { loadedJSX }
                <Replies 
                    postID={this.props.comment.post}
                    commentID={this.props.comment.id}
                    replies={this.props.comment.replies}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    auth: state.auth,
})

export default connect(mapStateToProps, {deleteComment})(Comment)
