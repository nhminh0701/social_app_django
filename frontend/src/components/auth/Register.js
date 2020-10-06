import React, { Component } from 'react'

export class Register extends Component {
    state = {
        username: "",
        email: "",
        password: ""
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
        console.log(this.state);
    }

    render() {
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

export default Register
