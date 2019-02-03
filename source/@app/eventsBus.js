/**
 * Events bus.
 *
 * Will be available for all apps.
 * This is the way to send messages between applications.
 */

import NanoEvents from 'nanoevents';

const emitter = new NanoEvents();

/**
 * Create listener to specific event.
 * Will return `unbind()` function, that should be called in order to remove event listener
 * @param key {string}
 * @param cb {function}
 * @returns {function}
 */
export const on = (key, cb) => {
    return emitter.on(key, cb);
};

/**
 * Event emitter
 * @param key {string}
 * @param data {*}
 * @returns {*}
 */
export const emit = (key, data) => {
    return emitter.emit(key, data);
};
