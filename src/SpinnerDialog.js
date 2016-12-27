import Dialog from './Dialog';

export default class SpinnerDialog extends Dialog {
    get defaultProps () {
        return {
            ...super.defaultProps,
            className: 'spinner-dialog is-small',
            isClosable: false
        };
    }

    get innerContent () {
        return `
            <div class="spinner">
                <div class="spinner-animation">
                    <div class="spinner-animation-item spinner-animation-r1"></div>
                    <div class="spinner-animation-item spinner-animation-r2"></div>
                    <div class="spinner-animation-item spinner-animation-r3"></div>
                    <div class="spinner-animation-item spinner-animation-r4"></div>
                    <div class="spinner-animation-item spinner-animation-r5"></div>
                </div>
                <div data-ref="message" class="spinner-message"></div>
            </div>
        `;
    }

    get binds () {
        return {
            message: this._renderMessage.bind(this)
        };
    }

    open () {
        super.open();
        if (this.props.closeTimeout) {
            if (typeof this.props.closeTimeout!=='number') {
                throw new Error('`closeTimeout` should be an Number.');
            }
            setTimeout(() => this.close(), this.props.closeTimeout);
        }
    }

    _renderMessage (el) {
        if (this.props.message) {
            el.classList.remove('is-hidden');
            el.innerHTML = this.props.message;
        } else {
            el.classList.add('is-hidden');
        }
    }
}
