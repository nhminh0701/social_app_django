import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {  
    editComment, deleteComment
} from '../../../actions/comments';
import PropTypes from 'prop-types';
import CommentEditForm from './CommentEditForm';

export class Comment extends Component {

    static propTypes = {
        comment: PropTypes.shape({
            author: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            post: PropTypes.number.isRequired,
        }),
        posts: PropTypes.object.isRequired,
        editComment: PropTypes.func.isRequired,
        deleteComment: PropTypes.func.isRequired,
    }

    state = {
        editMode: false,
    }

    onDeleteClick = () => {
        this.props.deleteComment(this.props.comment.id, this.props.comment.post);
    }

    onEditClick = e => {
        this.setState({
            editMode: !this.state.editMode
        })
        e.target.innerText = this.state.editMode ? "Edit" : "Cancel"
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
                { this.props.posts.isLoading ? loadingBtnJSX : loadedBtnJSX }
            </div>
            <p>{ this.props.comment.created_at }</p>
            { this.state.editMode ? 
                <CommentEditForm comment={this.props.comment} /> :
                <p>{ this.props.comment.content }</p>
            }
            
        </li>

        return (
            <Fragment>
                { this.props.posts.isLoading ? loadingJSX : loadedJSX }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts
})

export default connect(mapStateToProps, {editComment, deleteComment})(Comment)
