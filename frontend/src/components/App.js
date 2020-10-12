import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store from '../store';
import { loadUser } from '../actions/auth';
import { Provider } from 'react-redux';

import Header from '../components/layouts/Header';
import Dashboard from '../components/pages/Dashboard';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';


class App extends Component {

    ws = new WebSocket(`ws://${window.location.host}/ws/lobby/`)

    componentDidMount() {
        store.dispatch(loadUser());
        this.configWebSocket();
    }

    configWebSocket() {
        this.ws.onopen = () => {
            console.log('Connected');
        }

        this.ws.onclose = () => {
            console.log('Disconnected');
        }

        this.ws.onmessage = event => {
            console.log(event.data);
        }
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header />
                        <div className="container">
                            <Switch>
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="" component={() => <Dashboard ws={this.ws}/>} />
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));