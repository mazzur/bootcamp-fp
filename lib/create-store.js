'use strict';

const INITIALIZE_STATE = 'INITIALIZE_STATE';

module.exports = function createStore(reducer, initialState) {
    const listeners = [];
    let state = reducer(initialState, {
        type: INITIALIZE_STATE
    });

    function getState() {
        return state;
    }

    function dispatch(action) {
        const oldState = state;
        state = reducer(state, action);
        if (state !== oldState) {
            listeners.forEach(cb => cb());
        }
    }

    function subscribe(cb) {
        listeners.push(cb);
    }

    return {
        getState,
        dispatch,
        subscribe
    };
};
