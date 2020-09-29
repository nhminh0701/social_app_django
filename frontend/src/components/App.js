import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    componentDidMount() {
        document.title = "Home Page";
    }

    render() {
        return (
            <Fragment>
                <h1>My App</h1>
            </Fragment>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));