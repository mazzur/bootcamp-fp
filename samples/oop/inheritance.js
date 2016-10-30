(() => {
    /**
     * Pseudo-classical
     */

    class Shape {
        constructor(borderColor) {
            Object.assign(this, {
                borderColor
            });
        }

        draw() {
            // do stuff
        }
    }

    class Rectangle extends Shape {
        constructor(sizeX, sizeY, borderColor) {
            super(borderColor);
            Object.assign(this, {
                sizeX,
                sizeY
            });
        }
    }
})();

(() => {
    /**
     * Prototypal
     */

    const generalShape = {
        draw() {
            // do stuff
        }
    };

    function shapeFactory(borderColor) {
        return Object.assign(Object.create(generalShape), {
            borderColor
        })
    }

    function reactangleFactory(sizeX, sizeY, borderColor) {
        return Object.assign(shapeFactory(borderColor), {
            sizeX,
            sizeY
        });
    }
})();

(() => {
    /**
     * Functional
     */

    function Shape(borderColor) {
        this.borderColor = borderColor;
        this.draw = function() {
            // do stuff
        }
    }

    function Rectangle(sizeX, sizeY, borderColor) {
        const rectangle = Object.assign({}, {
            sizeX,
            sizeY
        });

        Shape.call(this, borderColor);

        return rectangle;
    }
})();
