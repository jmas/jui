import Emitter from './Emitter';

export default class Component extends Emitter {
    constructor (props={}) {
        super();
        this._props = { ...this.defaultProps, ...props };
        this._mountEl = this._props.mountEl;
        this._refs = {};
        if (!this._mountEl) {
            this._mountEl = document.createElement('div');
            document.body.appendChild(this._mountEl);
        }
        this.render();
    }

    get defaultProps () {
        return {};
    }

    get content () {
        return null;
    }

    get refs () {
        return this._refs;
    }

    get props () {
        return this._props;
    }

    set props (props) {
        this._props = { ...this._props, ...props };
        this.render();
    }

    get preparedContent () {
        return this.content;
    }

    clean () {
        while (this._mountEl.firstChild) {
            this._mountEl.removeChild(this._mountEl.firstChild);
        }
    }

    render () {
        const content = this.preparedContent.replace(/(>)\s+/gm, '$1').replace(/\s+(<)/gm, '$1');
        this.clean();
        this._mountEl.insertAdjacentHTML('afterbegin', content || '');
        const refs = this._mountEl.querySelectorAll('[data-ref]');
        this._refs = {};
        for (let i=0; i<refs.length; i++) {
            const refName = refs[i].getAttribute('data-ref');
            if (!this._refs[refName]) {
                this._refs[refName] = refs[i];
            } else {
                if (!(this._refs[refName] instanceof Array)) {
                    this._refs[refName] = [this._refs[refName]];
                }
                this._refs[refName].push(refs[i]);
            }
        }
    }
}
