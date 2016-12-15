export default class Emitter {
    constructor () {
        this._handlers = {};
    }

    on (handlerName, handlerFn) {
        if (typeof handlerFn!=='function') {
            throw new Error('`handlerFn` should be an function.');
        }
        if (!this._handlers[handlerName]) {
            this._handlers[handlerName] = [];
        }
        this._handlers[handlerName].push(handlerFn);
    }

    emit (handlerName, payload={}) {
        if (this._handlers[handlerName]) {
            for (let i=0; i<this._handlers[handlerName].length; i++) {
                this._handlers[handlerName][i](payload);
            }
        }
    }
}
