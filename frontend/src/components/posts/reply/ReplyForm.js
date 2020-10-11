import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postReply } from '../../../actions/replies';

export class ReplyForm extends Component {
    state = {
        reply: '',
    }

    static propTypes = {
        commentID: PropTypes.number,
        postID: PropTypes.number,
        postReply: PropTypes.func.isRequired,
    }

    onReplyChange = e => {
        this.setState({
            ...this.state,
            reply: e.target.value,
        })
    }

    onFormSubmit = e => {
        e.preventDefault();
        this.props.postReply(
            this.props.postID, 
            this.props.commentID, this.state.reply);
        this.setState({
            reply: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="mt-2">
                <div className="input-group">
                    <input 
                        className="form-control border-0" 
                        placeholder="Reply..."
                        type="text"
                        onChange={this.onReplyChange}
                        value={this.state.reply}
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

export default connect(null, { postReply })(ReplyForm)