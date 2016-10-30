const chai = require('chai');
const expect = chai.expect;
const createStore = require('../lib/create-store');
const reducers = require('../main');

describe('bootcamp state management module', () => {
    let store;

    beforeEach(() => {
        store = createStore(reducers);
    });

    describe('providing trainees management feature', () => {
        let traineeEntry;

        beforeEach(() => {
            traineeEntry = {
                id: 3,
                name: 'John Doe'
            };

            store.dispatch({
                type: 'ADD_TRAINEE',
                payload: traineeEntry
            });
        });

        it('should allow to add new trainee', () => {
            expect(store.getState().trainees.toJS()).to.deep.equal([traineeEntry]);
        });

        it('should allow to remove trainee from the registry', () => {
            store.dispatch({
                type: 'REMOVE_TRAINEE',
                payload: traineeEntry.id
            });

            expect(store.getState().trainees.toJS()).to.be.empty;
        });
    });

    describe('providing trainers management feature', () => {
        let trainerEntry;

        beforeEach(() => {
            trainerEntry = {
                id: 3,
                name: 'John Doe'
            };

            store.dispatch({
                type: 'ADD_TRAINER',
                payload: trainerEntry
            });
        });

        it('should allow to add new trainer', () => {
            expect(store.getState().trainers.toJS()).to.deep.equal([trainerEntry]);
        });

        it('should allow to remove trainer from the registry', () => {
            store.dispatch({
                type: 'REMOVE_TRAINER',
                payload: trainerEntry.id
            });

            expect(store.getState().trainers.toJS()).to.be.empty;
        });
    });

    describe('providing workshops management', () => {
        let workshopTopic;
        let workshop;

        beforeEach(() => {
            workshopTopic = 'OOP in JavaScript';
            workshop = {
                id: 11221,
                topic: workshopTopic
            };

            store.dispatch({
                type: 'ADD_WORKSHOP',
                payload: workshop
            });
        });

        it('should allow to add new workshop assigning pending status', () => {
            expect(store.getState().workshops.toJS()).to.deep.equal([
                Object.assign({
                    status: 'PENDING'
                }, workshop)
            ])
        });

        it('should allow to move workshop status to progress', () => {
            store.dispatch({
                type: 'START_WORKSHOP',
                payload: 0
            });

            expect(store.getState().workshops.toJS()[0].status).to.equal('IN_PROGRESS');
        });

        it('should allow to move workshop status to finished', () => {
            store.dispatch({
                type: 'FINISH_WORKSHOP',
                payload: 0
            });

            expect(store.getState().workshops.toJS()[0].status).to.equal('FINISHED');
        });

        it('should allow to set trainer for workshop', () => {
            const trainerId = 12312;
            store.dispatch({
                type: 'ADD_TRAINER',
                payload: {
                    id: 123,
                    name: 'Some Name'
                }
            });
            store.dispatch({
                type: 'ADD_TRAINER',
                payload: {
                    id: trainerId,
                    name: 'Whatever'
                }
            });

            store.dispatch({
                type: 'SET_WORKSHOP_TRAINER',
                payload: {
                    workshopId: workshop.id,
                    trainerId
                }
            });

            expect(store.getState().workshops.toJS()[0].trainer).to.equal(trainerId);
        });

        it('should allow to track trainees who were present at workshop', () => {
            const attendingId = 13123;
            const trainees = [{
                id: attendingId,
                name: 'Some Name'
            }, {
                id: 32423,
                name: 'Whatever'
            }];

            trainees.forEach(traineeEntry => store.dispatch({
                type: 'ADD_TRAINEE',
                payload: traineeEntry
            }));

            store.dispatch({
                type: 'FILL_IN_TRAINEES_ATTENDANCE',
                payload: {
                    workshopId: workshop.id,
                    traineeIds: [attendingId]
                }
            });

            expect(store.getState().workshops.toJS()[0].attendance).to.deep.equal([attendingId]);
        });
    });
});
