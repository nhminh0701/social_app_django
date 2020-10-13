import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { postPost } from '../../actions/posts';



export class PostForm extends Component {

    state = {
        content: '',
    }

    onContentChanged = e => {
        this.setState({
            content: e.target.value,
        })
    }

    onSubmit = e => {
        e.preventDefault();
        // this.props.postPost(this.state.content);
        this.props.ws.send(JSON.stringify({
            type: 'POSTING_POST',
            content: this.state.content,
            token: this.props.auth.token,
        }))
        e.target.value = '';
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
                >Submit</button>
            </form>
        )
    }
}

PostForm.propTypes = {
    auth: PropTypes.object.isRequired,
    postPost: PropTypes.func.isRequired,
    ws: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { postPost })(PostForm)
