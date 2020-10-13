import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postReply } from '../../../actions/replies';

export class ReplyForm extends Component {
    state = {
        reply: '',
    }

    onReplyChange = e => {
        this.setState({
            ...this.state,
            reply: e.target.value,
        })
    }

    onFormSubmit = e => {
        e.preventDefault();
        // this.props.postReply(
        //     this.props.postID, 
        //     this.props.commentID, this.state.reply);
        this.props.ws.send(JSON.stringify({
            token: this.props.auth.token,
            type: 'POSTING_REPLY',
            postID: this.props.postID,
            commentID: this.props.commentID,
            content: this.state.reply,
        }))
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

ReplyForm.propTypes = {
    commentID: PropTypes.number,
    postID: PropTypes.number,
    postReply: PropTypes.func.isRequired,
    ws: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { postReply })(ReplyForm)