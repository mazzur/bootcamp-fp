#!/usr/bin/env node

'use strict';
const readline = require('readline');
const Immutable = require('immutable');
const store = require('../lib/create-store')(require('../main'));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const commands = {
    state() {
        console.log(Immutable.fromJS(store.getState()).toJS());
    },
    new_trainer() {
        rl.question('name>', (name) => {
                store.dispatch({
                    type: 'ADD_TRAINER',
                    payload: {
                        id: Math.random(),
                        name: name.trim()
                    }
                });
        });
    },
    action() {
        rl.question('action type>', (type) => {
            rl.question('action payload (JSON)>', (jsonPayload) => {
                const payload = JSON.parse(jsonPayload.trim());
                store.dispatch({
                    type,
                    payload
                });
            });
        });
    },
    timetravel() {
        rl.question('get the state at action index>', (index) => {
            const travelStore = require('../lib/create-store')(require('../main'));
            store.getState().history.slice(1, index++).forEach((action) => {
                travelStore.dispatch(action);
            });
            console.log(travelStore.getState());
        });
    }
};

rl.on('line', (line) => {
    const command = line.trim();
    commands[command]
        ? commands[command]()
        : console.log('no such command');
});
