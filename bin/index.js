#!/usr/bin/env node

'use strict';
const readline = require('readline');
const Immutable = require('immutable');
const store = require('../lib/create-store')(require('../main'));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

store.subscribe(() => {
    console.log('state changed', store.getState());
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
                if (!jsonPayload) {
                    return;
                }

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
    },
    help() {
        console.log(`
        Available commands:
        state - get current state
        new_trainer - add new Trainer
        action - propagate custom action
        timetravel - get the state at some point in time
        help - get available commands
        `);
    }
};

rl.on('line', (line) => {
    const command = line.trim();
    commands[command]
        ? commands[command]()
        : (() => { console.log('no such command'); commands.help();})();
});

commands.help();