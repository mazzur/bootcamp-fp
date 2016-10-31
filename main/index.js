const Immutable = require('immutable');
const combineReducers = require('../lib/combine-reducers');

module.exports = combineReducers({
    trainees,
    trainers,
    workshop,
    history
});

const ACTIONS = {
    ADD_TRAINEE: 'ADD_TRAINEE',
    ADD_TRAINER: 'ADD_TRAINER',
    REMOVE_TRAINEE: 'REMOVE_TRAINEE',
    REMOVE_TRAINER: 'REMOVE_TRAINER',
    ADD_WORKSHOP: 'ADD_WORKSHOP',
    START_WORKSHOP: 'START_WORKSHOP',
    FINISH_WORKSHOP: 'FINISH_WORKSHOP',
    SET_WORKSHOP_TRAINER: 'SET_WORKSHOP_TRAINER',
    FILL_IN_TRAINEES_ATTENDANCE: 'FILL_IN_TRAINEES_ATTENDANCE'
};

function trainees(state = Immutable.List(), action) {
    switch (action.type) {
    case ACTIONS.ADD_TRAINEE:
        return state.push(action.payload);
    case ACTIONS.REMOVE_TRAINEE:
        return state.delete(state.findIndex(traineeEntry => traineeEntry.id === action.payload));
    default:
        return state;
    }
}

function trainers(state = Immutable.List(), action) {
    switch (action.type) {
    case ACTIONS.ADD_TRAINER:
        return state.push(action.payload);
    case ACTIONS.REMOVE_TRAINER:
        return state.delete(state.findIndex(trainerEntry => trainerEntry.id === action.payload));
    default:
        return state;
    }
}

const STATUS = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    FINISHED: 'FINISHED'
};
function workshop(state = Immutable.List(), action) {
    switch (action.type) {
    case ACTIONS.ADD_WORKSHOP:
        const workshop = Immutable.Map(Object.assign({
            status: STATUS.PENDING
        }, action.payload));
        return state.push(workshop);
    case ACTIONS.START_WORKSHOP:
        return state.setIn([action.payload, 'status'], STATUS.IN_PROGRESS);
    case ACTIONS.FINISH_WORKSHOP:
        return state.setIn([action.payload, 'status'], STATUS.FINISHED);
    case ACTIONS.SET_WORKSHOP_TRAINER:
        return state.setIn([
            state.findIndex(workshop => workshop.id === action.payload.workshopId),
            'trainer'
        ], action.payload.trainerId);
    case ACTIONS.FILL_IN_TRAINEES_ATTENDANCE:
        return state.setIn([
            state.findIndex(workshop => workshop.id === action.payload.workshopId),
            'attendance'
        ], Immutable.List(action.payload.traineeIds));
    default:
        return state;
    }
}

function history(state = [], action) {
    state.push(action);
    return state;
}
