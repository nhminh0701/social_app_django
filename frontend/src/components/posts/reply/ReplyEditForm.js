import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editReply } from '../../../actions/replies';
import PropTypes from 'prop-types';


export class ReplyEditForm extends Component {
    state = {
        reply: this.props.reply.content,
    }


    onReplyChange = e => {
        this.setState({
            ...this.state,
            reply: e.target.value,
        });
    }
    
    onSubmitForm = e => {
        e.preventDefault();
        this.props.editReply(
            this.props.reply, 
            this.state.reply, this.props.postID);
        this.setState({
            reply: ''
        })
        this.props.toggleEditMode();
    }

    render() {
        return (
            <form onSubmit={this.onSubmitForm}>
                <div className="input-group">
                    <input 
                        className="form-control"
                        type="text"
                        placeholder="Reply ..."
                        value={this.state.reply}
                        onChange={this.onReplyChange} 
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

ReplyEditForm.propTypes = {
    reply: PropTypes.object.isRequired,
    editReply: PropTypes.func.isRequired,
    postID: PropTypes.number.isRequired,
    toggleEditMode: PropTypes.func.isRequired,
}

export default connect(null, { editReply })(ReplyEditForm)