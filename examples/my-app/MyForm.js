import Form from '~/src/Form';
import SpinnerDialog from '~/src/SpinnerDialog';

export default class MyForm extends Form {
    get defaultProps () {
        return {
            data: {
                name: 'Wow, name'
            }
        };
    }

    get template () {
        return `
            <input type="text" name="name" value="${ this.props.data.name || '' }" data-ref="name" />
            <button type="submit">Send</button>
        `;
    }

    _handleFormSubmit (event) {
        event.preventDefault();
        this.props = {
            data: {
                name: this.refs.name.value
            }
        };
        const spinnerDialog = new SpinnerDialog({
            closeTimeout: 1000,
            destroyOnClose: true
        });
        spinnerDialog.open();
    }

    render () {
        super.render();
        this.el.addEventListener('submit', this._handleFormSubmit.bind(this));
    }
}
