import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Login extends Component {
    state = {
        username: "",
        password: ""
    }
    
    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    }

    componentDidMount() {
        document.title = "Login";
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

    onFormSubmit = event => {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        }

        return (
            <div className="card mt-4">
                <form onSubmit={this.onFormSubmit} className="card-body">
                    <h5 className="card-title">Login</h5>

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
                        <label>Password</label>
                        <input 
                            className="form-control" 
                            name="password" 
                            type="password"
                            onChange={this.onPasswordChange}
                            value={this.state.password}
                        />
                    </div>

                    <button type="submit" className="btn btn-success">Login</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login)
