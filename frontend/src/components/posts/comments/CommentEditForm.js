import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    editComment
} from '../../../actions/comments';
import PropTypes from 'prop-types';


export class CommentEditForm extends Component {
    state = {
        comment: this.props.comment.content,
    }

    static propTypes = {
        comment: PropTypes.object.isRequired,
        editComment: PropTypes.func.isRequired,
    }

    onCommentChange = e => {
        this.setState({
            ...this.state,
            comment: e.target.value,
        })
    }
    
    onSubmitForm = e => {
        e.preventDefault();
        this.props.editComment(
            this.props.comment.id, this.state.comment)
    }

    render() {
        return (
            <form onSubmit={this.onSubmitForm}>
                <div className="input-group">
                    <input 
                        className="form-control"
                        type="text"
                        placeholder="Comment ..."
                        value={this.state.comment}
                        onChange={this.onCommentChange} 
                    />
                    <div className="input-group-append">
                        <button
                            type="submit"
                            className="btn btn-block btn-sm btn-success"
                        >Submit</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default connect(null, { editComment })(CommentEditForm)
