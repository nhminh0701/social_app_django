import React, { Fragment } from 'react';
import Posts from '../layouts/Posts';
import PostCreateForm from '../layouts/PostForm';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';


export function Dashboard(props) {
    document.title = "Dashboard"

    return (
        <div>
            {   props.auth.isAuthenticated ?
                <PostCreateForm ws={props.ws}/> : <Fragment />
            }
            <Posts ws={props.ws} />
        </div>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    ws: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(Dashboard)