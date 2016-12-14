import Dialog from './Dialog';

export default class SpinnerDialog extends Dialog {
    get defaultProps () {
        return {
            ...super.defaultProps,
            className: 'is-small',
            isClosable: false
        };
    }

    get content () {
        return `
            <div class="spinner">
                <div class="spinner-animation">
                    <div class="spinner-animation-item spinner-animation-r1"></div>
                    <div class="spinner-animation-item spinner-animation-r2"></div>
                    <div class="spinner-animation-item spinner-animation-r3"></div>
                    <div class="spinner-animation-item spinner-animation-r4"></div>
                    <div class="spinner-animation-item spinner-animation-r5"></div>
                </div>
                ${ this.props.message ? `<div class="spinner-message">${ this.props.message }</div>`: '' }
            </div>
        `;
    }

    open () {
        super.open();
        if (this.props.message) {
            this.props = { message: this.props.message };
        }
        if (this.props.closeTimeout) {
            if (typeof this.props.closeTimeout!=='number') {
                throw new Error('`closeTimeout` should be an Number.');
            }
            setTimeout(() => this.close(), this.props.closeTimeout);
        }
    }

    render () {
        super.render();
        this.el.classList.add('spinner-dialog');
    }
}
