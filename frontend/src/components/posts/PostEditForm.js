import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editPost } from '../../actions/posts';


export class PostEditForm extends Component {

    state = {
        content: this.props.data.content,
    }
    
    onContentChanged = e => {
        this.setState({
            content: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
        // this.props.editPost(this.state.content, this.props.data.id);
        this.props.ws.send(JSON.stringify({
            type: 'EDITING_POST',
            token: this.props.auth.token,
            id: this.props.data.id,
            content: this.state.content,
        }))
        this.props.toggleEditMode();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="my-4 py-3 container">
                <textarea 
                    className="form-control my-2"
                    name="content"
                    onChange={this.onContentChanged}
                    placeholder="What do you want to write about ..."
                    value={this.state.content}
                />

                <button
                    className="btn btn-primary"
                    type="submit"
                >Edit</button>
            </form>
        )
    }
}

PostEditForm.propTypes = {
    editPost: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    ws: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    toggleEditMode: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { editPost })(PostEditForm)
