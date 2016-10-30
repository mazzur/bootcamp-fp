'use strict';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function reduceState(state = 0, action) {
    switch (action.type) {
    case INCREMENT:
        return state + 1;
    case DECREMENT:
        return state - 1;
    default:
        return state;
    }
}

const actionsLog = [
    {type: INCREMENT},
    {type: INCREMENT},
    {type: INCREMENT},
    {type: INCREMENT},
    {type: INCREMENT}
];

function applyActions(actions) {
    return actions.reduce(
        (state, action) => reduceState(state, action),
        reduceState(undefined, {})
    )
}

function stateAtStep(step) {
    return applyActions(actionsLog.slice(0, step));
}

console.log(stateAtStep(5));
