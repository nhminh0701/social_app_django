import React, { Component } from 'react'

export class CommentForm extends Component {
    state = {
        comment: '',
    }

    onCommentChange = e => {
        this.setState({
            ...this.state,
            comment: e.target.value,
        })
    }

    onFormSubmit = e => {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="input-group">
                    <input 
                        className="form-control" 
                        placeholder="Comment..."
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

export default CommentForm
