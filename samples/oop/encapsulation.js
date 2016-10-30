'use strict';

class SomeService {
    constructor(dependency) {
        Object.assign(this, {
            dependency
        });
    }

    publicMethod() {
        this.dependency.doStuff();
    }
}

function WhateverService(dependency) {
    return {
        publicMethod
    };

    function publicMethod() {
        dependency.doStuff();
    }
}
