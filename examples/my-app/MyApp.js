import Component from '~/src/Component';
import MyDialog from './MyDialog';
import MyTabs from './MyTabs';

export default class MyApp extends Component {
    get content () {
        return `
            <button data-ref="openDialogButton" class="button is-primary">Open Dialog</button>
            <div data-ref="tabs"></div>
        `;
    }

    get binds () {
        return {
            ...super.binds,
            openDialogButton: (el) => el.addEventListener('click', this._handleOpenDialogButtonClick.bind(this)),
            tabs: this._renderTabs.bind(this)
        };
    }

    _renderTabs (mountEl) {
        new MyTabs({ mountEl });
    }

    _handleOpenDialogButtonClick () {
        const myDialog = new MyDialog({
            destroyOnClose: true
        });
        myDialog.open();
    }
}
