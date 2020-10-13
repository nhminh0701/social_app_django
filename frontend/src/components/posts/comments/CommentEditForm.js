import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editComment } from '../../../actions/comments';
import PropTypes from 'prop-types';


export class CommentEditForm extends Component {
    state = {
        comment: this.props.comment.content,
    }

    onCommentChange = e => {
        this.setState({
            ...this.state,
            comment: e.target.value,
        })
    }
    
    onSubmitForm = e => {
        e.preventDefault();
        // this.props.editComment(
        //     this.props.comment.id, this.state.comment)
        this.props.ws.send(JSON.stringify({
            token: this.props.auth.token,
            type: 'EDITING_COMMENT',
            commentID: this.props.comment.id,
            content: this.state.comment,
        }))
        this.setState({
            comment: ''
        });
        this.props.toggleEditMode();
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

CommentEditForm.propTypes = {
    comment: PropTypes.object.isRequired,
    editComment: PropTypes.func.isRequired,
    toggleEditMode: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    ws: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { editComment })(CommentEditForm)