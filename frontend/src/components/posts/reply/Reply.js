import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteReply } from '../../../actions/replies';
import ReplyEditForm from './ReplyEditForm';



export class Reply extends Component {

    static propTypes = {
        reply: PropTypes.shape({
            author: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            comment: PropTypes.number.isRequired,
        }),
        auth: PropTypes.object.isRequired,
        posts: PropTypes.object.isRequired,
        deleteReply: PropTypes.func.isRequired,
        postID: PropTypes.number.isRequired,
    }

    state = {
        editMode: false,
    }

    isEditable = () => {
        if (this.props.auth.user) {
            return this.props.auth.user.username === this.props.reply.author;
        } else {
            return this.props.auth.user;
        }
    }

    onDeleteClick = () => {
        this.props.deleteReply(this.props.reply, this.props.postID);
    }

    toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    onEditClick = e => {
        this.toggleEditMode();
        e.target.innerText = this.state.editMode ? "Edit" : "Cancel";
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
                <p className="my-0">{ this.props.reply.author }</p>
                {   
                    !this.isEditable() ?
                    <Fragment /> :
                    this.props.posts.isReplyLoading ? 
                    loadingBtnJSX : loadedBtnJSX }
            </div>
            <p>{ this.props.reply.created_at }</p>
            {   
                !(this.state.editMode && this.isEditable()) ? 
                <p>{ this.props.reply.content }</p> :
                this.props.posts.isReplyLoading ? 
                loadingJSX : 
                <ReplyEditForm 
                    reply={this.props.reply} 
                    postID={this.props.postID} 
                    toggleEditMode={this.toggleEditMode}
                />
            }
            
        </li>

        return (
            <Fragment>
                { loadedJSX }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    auth: state.auth,
})

export default connect(mapStateToProps, { deleteReply})(Reply)
