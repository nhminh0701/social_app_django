import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/posts';
import PropTypes from 'prop-types';
import Post from '../posts/Post';


class Posts extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const posts = this.props.posts.isLoading || !this.props.posts.posts ?
                    '' :
                    <Fragment>
                        {this.props.posts.posts.map(post => 
                        <Post key={post.id} data={post} ws={this.props.ws} />)}
                    </Fragment>
        return (
            <Fragment>
                <div className="container">
                    { posts }
                </div>
            </Fragment>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    ws: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
    posts: state.posts,
})

export default connect(mapStateToProps, { getPosts })(Posts)
