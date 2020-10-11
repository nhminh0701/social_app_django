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
            commentsShowed: !this.state.commentsShowed
        })
    }

    static propTypes = {
        deletePost: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
    }

    onEditBtnClicked = (e) => {
        this.setState({
            editMode: !this.state.editMode,
        });
        e.target.innerHTML = this.state.editMode ?  'Edit' : 'Cancel';
    }

    onDeleteBtnClicked = () => {
        this.props.deletePost(this.props.data.id)
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
                            <PostEditForm data={this.props.data}/> :
                            <p className="my-4">{this.props.data.content}</p>
                        }
                    </li>
                    <li className="list-group-item">
                        { this.props.auth.isAuthenticated ?
                            <CommentForm postID={this.props.data.id} /> :
                            <Fragment />
                        }

                        { this.getShowCommentBtn() }

                        {
                            this.state.commentsShowed ?
                            <Comments comments={this.props.data.comments} /> : <Fragment />
                        }
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { deletePost })(Post);
