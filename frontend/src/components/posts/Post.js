import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostEditForm from './PostEditForm';
import CommentForm from './CommentForm';
import Comments from './comments';
import { deletePost } from '../../actions/posts';


export class Post extends Component {
    state = {
        editMode: false,
    }

    static propTypes = {
        deletePost: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
    }

    onEditBtnClicked = (e) => {
        this.setState({
            editMode: !this.state.editMode,
        });
        e.target.innerHTML = this.state.editMode ? 'Cancel' : 'Edit'
    }

    onDeleteBtnClicked = () => {
        this.props.deletePost(this.props.data.id)
    }

    render() {

        const btnGroup =   <div className="btn-group" role="group">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={this.onEditBtnClicked}
                                >Edit</button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={this.onDeleteBtnClicked}
                                >Delete</button>
                            </div>

        return (
            <div className="card mb-4">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="d-flex justify-content-between">
                            <p className="card-title mb-0">
                                {this.props.data.author}</p> 
                            { btnGroup }
                        </div>
                        <small>{this.props.data.created_at}</small>
                        
                        {   this.state.editMode ? 
                            <PostEditForm data={this.props.data}/> :
                            <p className="my-4">{this.props.data.content}</p>
                        }
                    </li>
                    <li className="list-group-item">
                        <CommentForm postID={this.props.data.id} />
                        <Comments postData={this.props.data} />
                    </li>
                </ul>
            </div>
        )
    }
}

export default connect(null, { deletePost })(Post);
