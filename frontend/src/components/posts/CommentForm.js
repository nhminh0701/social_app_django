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
        this.props.postComment(
            this.props.postID.toString(), this.state.comment);
        this.setState({
            comment: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="input-group">
                    <input 
                        className="form-control border-0" 
                        placeholder="Comment..."
                        name="comment"
                        type="text"
                        onChange={this.onCommentChange}
                        value={this.state.comment}
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