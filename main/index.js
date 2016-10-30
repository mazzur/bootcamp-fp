const Immutable = require('immutable');

module.exports = (state = {}, action) => ({
    trainees: traineesReducer(state.trainees, action)
});

const ACTIONS = {
    ADD_TRAINEE: 'ADD_TRAINEE'
};

function traineesReducer(state = Immutable.List(), action) {
    switch (action.type) {
    case ACTIONS.ADD_TRAINEE:
        return state.push(action.payload);
    default:
        return state;
    }
}
