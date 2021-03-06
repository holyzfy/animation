(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('animation', ['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.animation = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var className = 'animation';

    function parallel() {
        for (var _len = arguments.length, targets = Array(_len), _key = 0; _key < _len; _key++) {
            targets[_key] = arguments[_key];
        }

        return flow('all', targets);
    }

    function race() {
        for (var _len2 = arguments.length, targets = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            targets[_key2] = arguments[_key2];
        }

        return flow('race', targets);
    }

    function flow(type, targets) {
        targets = targets.map(function (item) {
            return getElement(item);
        }).reduce(function (x, y) {
            return x.concat(y);
        });
        var promises = targets.map(function (el) {
            return new Promise(function (resolve) {
                return el.addEventListener('transitionend', resolve);
            });
        });
        targets.forEach(function (el) {
            return el.classList.add(className);
        });
        return Promise[type](promises);
    }

    function series() {
        for (var _len3 = arguments.length, targets = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            targets[_key3] = arguments[_key3];
        }

        targets = targets.map(function (item) {
            return getElement(item);
        }).reduce(function (x, y) {
            return x.concat(y);
        });
        var promises = targets.map(function (el) {
            return new Promise(function (resolve) {
                return el.addEventListener('transitionend', resolve);
            });
        });

        var _loop = function _loop(i, length) {
            promises[i].then(function () {
                return targets[i + 1].classList.add(className);
            });
        };

        for (var i = 0, length = promises.length; i < length - 1; i++) {
            _loop(i, length);
        }
        targets[0].classList.add(className);
        return Promise.all(promises);
    }

    function getElement(selector) {
        if (typeof selector === 'string') {
            return Array.from(document.querySelectorAll(selector));
        }
        if (selector.length >= 0) {
            return Array.from(selector);
        }
        return selector;
    }

    exports.default = {
        parallel: parallel,
        race: race,
        series: series
    };
    module.exports = exports['default'];
});
