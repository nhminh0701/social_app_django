import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


export class Register extends Component {
    state = {
        username: "",
        email: "",
        password: ""
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        register: PropTypes.func.isRequired,
    }
    
    componentDidMount = () => {
        document.title = 'Register'
    }

    onUsernameChange = event => {
        this.setState({
            ...this.state,
            username: event.target.value
        })
    }

    onPasswordChange = event => {
        this.setState({
            ...this.state,
            password: event.target.value
        })
    }

    onEmailChange = event => {
        this.setState({
            ...this.state,
            email: event.target.value
        })
    }

    onFormSubmit = event => {
        event.preventDefault();
        this.props.register(
            this.state.username, this.state.email, this.state.password
        )
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <div className="card mt-4">
                <form onSubmit={this.onFormSubmit} className="card-body">
                    <h5 className="card-title">Register</h5>

                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            className="form-control" 
                            name="username" 
                            type="text"
                            onChange={this.onUsernameChange}
                            value={this.state.username}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            className="form-control" 
                            name="email" 
                            type="email"
                            onChange={this.onEmailChange}
                            value={this.state.email}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            className="form-control" 
                            name="password" 
                            type="password"
                            onChange={this.onPasswordChange}
                            value={this.state.password}
                        />
                    </div>

                    <button type="submit" className="btn btn-success">Register</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {register})(Register)
