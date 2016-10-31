module.exports = function combineReducers(reducersHashMap) {
    return function combinedReducer(state = {}, action) {
        const newState = {};
        const stateChanged = Object.keys(reducersHashMap).reduce((changed, reducerName) => {
            newState[reducerName] = reducersHashMap[reducerName](state[reducerName], action);
            return changed || newState[reducerName] !== state[reducerName];
        }, false);

        if (stateChanged) {
            return newState;
        }

        return state;
    };
};
