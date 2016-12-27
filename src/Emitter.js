/**
 * @class Emitter
 */
export default class Emitter {
    /**
     * @param {Object} handlers
     */
    constructor (handlers={}) {
        this._handlers = handlers || {};
    }

    /**
     * @param {String} handlerName
     * @param {Function} handlerFn
     */
    on (handlerName, handlerFn) {
        if (!(handlerFn instanceof Function)) {
            throw new Error('`handlerFn` should be an function.');
        }
        if (!this._handlers[handlerName]) {
            this._handlers[handlerName] = [];
        } else if (this._handlers[handlerName] instanceof Function) {
            this._handlers[handlerName] = [this._handlers[handlerName]];
        }
        this._handlers[handlerName].push(handlerFn);
    }

    /**
     * @param {String} handlerName
     * @param {Object} payload
     */
    emit (handlerName, payload={}) {
        const handler = this._handlers[handlerName];
        if (handler) {
            if (handler instanceof Array) {
                for (let i = 0; i < handler.length; i++) {
                    handler[i](payload);
                }
            } else if (handler instanceof Function) {
                handler(payload);
            } else {
                throw new Error('`handler` should be an instance of Array or Function.');
            }
        }
    }
}
