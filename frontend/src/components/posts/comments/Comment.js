import React, { Component, Fragment } from 'react'

export class Comment extends Component {

    render() {
        const loadingJSX = <p>Loading</p>;
        const loadedJSX = <li className="list-group-item">
            <p>{ this.props.comment.author }</p>
            <p>{ this.props.comment.created_at }</p>
            <p>{ this.props.comment.content }</p>
        </li>

        return (
            <Fragment>
                { loadedJSX }
            </Fragment>
        )
    }
}

export default Comment
