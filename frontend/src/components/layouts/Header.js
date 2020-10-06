import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class Header extends Component {

    render() {
        const guestLinks = (
            <React.Fragment>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
            </React.Fragment>
        )


        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-lg">
                    <a className="navbar-brand" href="#">MyApp</a>

                    <button 
                        className="navbar-toggler" 
                        data-toggle="collapse" 
                        data-target="#navigationMenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div id="navigationMenu" className="navbar-collapse collapse">
                        <ul className="navbar-nav mr-auto">
                            { guestLinks }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) =>  ({
    auth: state.auth,
})

export default connect(mapStateToProps)(Header)
