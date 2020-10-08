import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postComment } from '../../actions/comments';

export class CommentForm extends Component {
    state = {
        comment: '',
    }

    static propTypes = {
        postID: PropTypes.number,
    }

    onCommentChange = e => {
        this.setState({
            ...this.state,
            comment: e.target.value,
        })
    }

    onFormSubmit = e => {
        e.preventDefault();
        this.props.postComment(this.props.postID.toString(), this.state.comment);
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="input-group">
                    <input 
                        className="form-control" 
                        placeholder="Comment..."
                        name="comment"
                        type="text"
                        onChange={this.onCommentChange}
                    />
                    <div className="input-group-append">
                        <button 
                            className="btn btn-block btn-success"
                            type="submit"
                        >Submit</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default connect(null, { postComment })(CommentForm)