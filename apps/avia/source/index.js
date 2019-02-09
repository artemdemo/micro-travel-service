import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import App from './app.jsx';

const reactLifeCycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: App,
    // Establishes where single-spa will mount this application
    //
    domElementGetter() {
        return document.getElementById('app');
    },
});

export function bootstrap(props) {
    return reactLifeCycles.bootstrap(props);
}

export function mount(props) {
    return reactLifeCycles.mount(props);
}

export function unmount(props) {
    return reactLifeCycles.unmount(props);
}
