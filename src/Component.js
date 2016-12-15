export default class Component {
    constructor (props={}) {
        this._props = { ...this.defaultProps, ...props };
        this._rootEl = this._props.rootEl;
        this._el = null;
        this._refs = {};
        if (!this._rootEl) {
            this._rootEl = document.createElement('div');
            document.body.appendChild(this._rootEl);
        }
        this.render();
    }

    get defaultProps () {
        return {};
    }

    get tagName () {
        return 'div';
    }

    get content () {
        return null;
    }

    get el () {
        return this._el;
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
        while (this._rootEl.firstChild) {
            this._rootEl.removeChild(this._rootEl.firstChild);
        }
    }

    render () {
        const el = document.createElement(this.tagName);
        const content = this.preparedContent;
        this._el = el;
        this._el.insertAdjacentHTML('afterbegin', content || '');
        const refs = this._el.querySelectorAll('[data-ref]');
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
        this.clean();
        this._rootEl.appendChild(el);
    }
}
