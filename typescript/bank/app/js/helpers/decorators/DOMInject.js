System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function DOMInject(selector) {
        return function (target, key) {
            let elemento;
            const getter = function () {
                if (!elemento) {
                    console.log(`dom ---> ${selector} | key ---> ${key}`);
                    elemento = $(selector);
                }
                return elemento;
            };
            Object.defineProperty(target, key, {
                get: getter
            });
        };
    }
    exports_1("DOMInject", DOMInject);
    return {
        setters: [],
        execute: function () {
        }
    };
});
