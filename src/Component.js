import Emitter from './emitter';

/**
 * @class Component
 * @extends Emitter
 */
export default class Component extends Emitter {
    /**
     * @returns {Object}
     */
    get defaultProps () {
        return {};
    }

    /**
     * @returns {Object}
     */
    get props () {
        return this._props;
    }

    /**
     * @returns {Object}
     */
    get refs () {
        return this._refs;
    }

    /**
     * @returns {Object}
     */
    get binds () {
        return {};
    }

    /**
     * @returns {Element}
     */
    get mountEl () {
        return this._mountEl;
    }

    /**
     * @returns {null|String}
     */
    get content () {
        return null;
    }

    /**
     * @param {Object} props
     */
    constructor (props={}) {
        super(props.handlers);
        let mountProps = {};
        this._mountEl = props.mountEl;
        if (!this._mountEl) {
            this._mountEl = document.createElement('div');
            document.body.appendChild(this._mountEl);
        } else {
            mountProps = JSON.parse(this._mountEl.getAttribute('data-props'));
        }
        this._props = { ...this.defaultProps, ...mountProps, ...props };
        this._refs = this._getRefs();
        this._binds = this.binds;
        this.render();
    }

    /**
     * @param {Object} props
     */
    render (props=null) {
        const content = this.content;
        if (content) {
            this._mountEl.innerHTML = content;
        }
        this._refs = this._getRefs();
        Object.keys(this._binds).forEach((bindName) => {
            const result = this._binds[bindName].call(this, this._refs[bindName]);
            if (result instanceof Element) {
                this._refs[bindName].innerHTML = '';
                this._refs[bindName].appendChild(result);
            } else if (typeof result==='string') {
                this._refs[bindName].innerHTML = result ? result: '';
            } else if (result instanceof Array) {
                this._refs[bindName].innerHTML = '';
                for (let i=0; i<result.length; i++) {
                    if (result[i] instanceof Element) {
                        this._refs[bindName].appendChild(result[i]);
                    } else if (result[i] instanceof Component) {
                        this._refs[bindName].appendChild(result[i].mountEl);
                    }
                }
            }
            this._refs = this._getRefs();
        });
    }

    /**
     * @param {Object|Function} props
     */
    setProps (props) {
        if (typeof props==='function') {
            props = props(this._props);
        }
        this._props = { ...this._props, ...props };
        this.render(props);
    }

    /**
     * @param {String} name
     * @param {*} value
     */
    setProp (name, value) {
        this.setProps({
            [name]: value
        });
    }

    /**
     * @returns {Object}
     * @private
     */
    _getRefs () {
        const refsEls = this._mountEl.querySelectorAll('[data-ref]');
        const refs = {};
        for (let i=0; i<refsEls.length; i++) {
            let refName = refsEls[i].getAttribute('data-ref');
            const refEl = refsEls[i];
            if (refName.substr(-2)==='[]') {
                refName = refName.substr(0, refName.length-2);
                if (!refs[refName]) {
                    refs[refName] = [refEl];
                } else {
                    refs[refName].push(refEl);
                }
            } else {
                if (!refs[refName]) {
                    refs[refName] = refEl;
                }
            }
        }
        return refs;
    }
}
