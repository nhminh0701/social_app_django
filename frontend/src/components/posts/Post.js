import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostEditForm from './PostEditForm';
import CommentForm from './CommentForm';
import Comments from './comments';
import { deletePost } from '../../actions/posts';


export class Post extends Component {
    state = {
        editMode: false,
        commentsShowed: false,
    }

    toggleCommentShowed = () => {
        this.setState({
            ...this.state,
            commentsShowed: !this.state.commentsShowed
        })
    }

    toggleEditMode = () => {
        this.setState({
            ...this.state,
            editMode: !this.state.editMode,
        })
    }

    onEditBtnClicked = (e) => {
        this.toggleEditMode()
        e.target.innerHTML = this.state.editMode ?  'Edit' : 'Cancel';
    }

    onDeleteBtnClicked = () => {
        // this.props.deletePost(this.props.data.id)
        this.props.ws.send(JSON.stringify({
            type: 'DELETING_POST',
            id: this.props.data.id,
            token: this.props.auth.token,
        }))
    }

    isEditable = () => {
        if (this.props.auth.user) {
            return this.props.data.author === this.props.auth.user.username;
        } else {
            return this.props.auth.user;
        }
            
    }

    getBtnGroups = () => (
        <div className="btn-group" role="group">
            <button
                className="btn btn-sm btn-primary"
                onClick={this.onEditBtnClicked}
                >Edit</button>
            <button
                className="btn btn-sm btn-danger"
                onClick={this.onDeleteBtnClicked}
                >Delete</button>
        </div>
    )

    getShowCommentBtn = () => {
        return (
            <Fragment>
                { this.props.data.comments.length > 0 ?
                    <button 
                        className="btn btn-sm bg-light btn-block my-2 text-center"
                        onClick={this.toggleCommentShowed}
                    >{ this.getShowCommentBtnText() }</button> :
                    <Fragment />
                }
            </Fragment>
        )
    }

    getShowCommentBtnText = () => {
        const commentsCount = this.props.data.comments.length;
        const commentShowedText = commentsCount === 1 ?
            "Hide comment" : `Hide ${commentsCount} comments`;
        const commentHidedText = commentsCount === 1 ?
            "Show comment" : `Show ${commentsCount} comments`;
        return  this.state.commentsShowed ? 
                commentShowedText : 
                commentHidedText;
    }

    render() { 
        return (
            <div className="card my-5">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="d-flex justify-content-between">
                            <p className="card-title mb-0">
                                {this.props.data.author}</p> 
                            { this.isEditable() ? 
                            this.getBtnGroups() : <Fragment /> }
                        </div>
                        <small>{this.props.data.created_at}</small>
                        
                        {   this.state.editMode && this.isEditable() ? 
                            <PostEditForm 
                                ws={this.props.ws} 
                                data={this.props.data}
                                toggleEditMode={this.toggleEditMode}/> :
                            <p className="my-4">{this.props.data.content}</p>
                        }
                    </li>
                    <li className="list-group-item">
                        { this.props.auth.isAuthenticated ?
                            <CommentForm postID={this.props.data.id} 
                            ws={this.props.ws} /> :
                            <Fragment />
                        }

                        { this.getShowCommentBtn() }

                        {
                            this.state.commentsShowed ?
                            <Comments 
                            comments={this.props.data.comments} 
                            ws={this.props.ws} /> : 
                            <Fragment />
                        }
                    </li>
                </ul>
            </div>
        )
    }
}

Post.propTypes = {
    deletePost: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    ws: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { deletePost })(Post);
