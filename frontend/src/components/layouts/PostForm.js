import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { postPost } from '../../actions/posts';



export class PostForm extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        postPost: PropTypes.func.isRequired,
    }

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
        this.props.postPost(this.state.content);
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

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { postPost })(PostForm)
