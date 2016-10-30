'use strict';

const Immutable = require('immutable');

(() => {
    const arr = [1, 2];
    arr.push(3);
    console.log('js array is mutable', arr);
})();

(() => {
    const arr = Immutable.List([1, 2]);
    const newArr = arr.push(3);
    console.log('list is immutable', arr);
})();