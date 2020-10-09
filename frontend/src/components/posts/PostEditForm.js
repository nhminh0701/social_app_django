import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editPost } from '../../actions/posts';


export class PostEditForm extends Component {
    static propTypes = {
        editPost: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
    }

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
        this.props.editPost(this.state.content, this.props.data.id);
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

export default connect(null, { editPost })(PostEditForm)
