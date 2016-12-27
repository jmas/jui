import Component from './Component';

export default class Dialog extends Component {
    get defaultProps () {
        return {
            ...super.defaultProps,
            isClosable: true,
            className: 'is-medium',
            dialog: {
                isOpen: false
            },
            destroyOnClose: false
        };
    }

    get binds () {
        return {
            ...super.binds,
            dialog: this._renderDialog.bind(this),
            closeButton: (el) => el.addEventListener('click', this._handleCloseButtonClick.bind(this))
        };
    }

    get content () {
        return `
            <div data-ref="dialog" class="dialog ${ this.props.className || '' }">
                <div class="dialog-box" role="dialog">
                    <div class="dialog-content" data-ref="content">
                        ${ this.innerContent || '' }
                    </div>
                    ${ this.props.isClosable ? `<button class="dialog-close" data-ref="closeButton">&times;</button>`: '' }
                </div>
            </div>
        `;
    }

    get innerContent () {
        return null;
    }

    get isOpen () {
        return this.props.dialog.isOpen;
    }

    close () {
        this.setProps({
            dialog: {
                isOpen: false
            }
        });
        if (this.props.destroyOnClose) {
            this.destroy();
        }
    }

    open () {
        this.setProps({
            dialog: {
                isOpen: true
            }
        });
    }

    destroy () {
        if (document.body.contains(this.mountEl)) {
            document.body.removeChild(this.mountEl);
        } else {
            while (this.mountEl.firstChild) {
                this.mountEl.removeChild(this.mountEl.firstChild);
            }
        }
    }

    _renderDialog (el) {
        if (this.props.dialog.isOpen) {
            el.classList.remove('is-hidden');
        } else {
            el.classList.add('is-hidden');
        }
    }

    _handleCloseButtonClick (event) {
        event.preventDefault();
        this.close();
        this.emit('close');
    }
}
