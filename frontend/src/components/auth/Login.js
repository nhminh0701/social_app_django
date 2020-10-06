import React, { Component } from 'react'

export class Login extends Component {
    state = {
        username: "",
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

    onFormSubmit = event => {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
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

export default Login
