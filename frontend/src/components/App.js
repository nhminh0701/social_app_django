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
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header />
                        <div className="container">
                            <Switch>
                                <Route exact path="" component={Dashboard} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));