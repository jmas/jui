import Component from '~/src/Component';
import MyDialog from './MyDialog';

export default class MyApp extends Component {
    get content () {
        return `
            <button data-ref="openDialogButton" class="button is-primary">Open Dialog</button>
        `;
    }

    render () {
        super.render();
        this.refs.openDialogButton.addEventListener('click', this._handleOpenDialogButtonClick.bind(this))
    }

    _handleOpenDialogButtonClick () {
        const myDialog = new MyDialog({
            destroyOnClose: true
        });
        myDialog.open();
    }
}
