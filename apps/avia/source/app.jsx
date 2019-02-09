import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import history from '@app/history';

import store from './store';

import AppView from './views/components/AppView';
import MainView from './views/components/MainView';

class aviaApp extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    componentDidCatch() {
        this.setState({
            hasError: true,
        });
    }

    renderApp() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path='/' component={AppView}>
                        <IndexRoute component={MainView} />
                    </Route>
                </Router>
            </Provider>
        );
    }

    renderError() {
        return (
            <React.Fragment>
                Application encountered an error, please refresh the page
            </React.Fragment>
        );
    }

    render() {
        if (this.state.hasError) {
            return this.renderError();
        }
        return this.renderApp();
    }
}

export default aviaApp;
