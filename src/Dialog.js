import Component from './Component';

export default class Dialog extends Component {
    get defaultProps () {
        return {
            ...super.defaultProps,
            isClosable: true,
            className: 'is-medium',
            isOpen: false,
            destroyOnClose: false
        };
    }

    get preparedContent () {
        return `<div class="dialog-box" role="dialog">
            <div class="dialog-content" data-ref="content">${ this.content || '' }</div>
            ${ this.props.isClosable ? `<button class="dialog-close" data-ref="closeButton">&times;</button>`: '' }
        </div>`;
    }

    render () {

        super.render();
        if (this.props.className) {
            this.el.classList = this.props.className;
            this.el.classList.add('dialog');
        }
        if (!this.props.isOpen) {
            this.el.classList.add('is-hidden');
        }
        if (this.props.isClosable) {
            this.refs.closeButton.addEventListener('click', this._handleCloseButtonClick.bind(this));
        }
    }

    close () {
        this.props = { isOpen: false };
        if (this.props.destroyOnClose) {
            this.destroy();
        }
    }

    open () {
        this.props = { isOpen: true };
    }

    isOpen () {
        return this.props.isOpen;
    }

    destroy () {
        if (document.body.contains(this._rootEl)) {
            document.body.removeChild(this._rootEl);
        } else {
            this.clean();
        }
    }

    _handleCloseButtonClick (event) {
        event.preventDefault();
        this.close();
        if (this.props.onClose) {
            this.props.onClose();
        }
    }
}
