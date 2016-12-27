import Component from './Component';

export default class Tabs extends Component {
    get defaultProps () {
        return {
            ...super.defaultProps,
            activeTab: null
        };
    }

    get tabs () {
        return [];
    }

    get content () {
        return `
            <div class="tabs-buttons">
                ${ this.tabs.map((tab) => `
                    <button
                        data-ref="buttons[]"
                        data-tab-id="${ tab.id }"
                        class="${ this.props.activeTab===tab.id ? 'is-active': '' }"
                    >${ tab.name }</button>
                `).join('') }
            </div>
            ${ this.tabs.map((tab) => `
                <div class="tabs-content ${ this.props.activeTab===tab.id ? 'is-active': '' }">
                    ${ tab.content }
                </div>
            `).join('') }
        `;
    }

    get binds () {
        return {
            buttons: this._renderButtons.bind(this)
        };
    }

    _renderButtons (els) {
        els.forEach((el) => el.addEventListener('click', this._handleButtonClick.bind(this)));
    }

    _handleButtonClick (event) {
        event.preventDefault();
        this.setProps({
            activeTab: event.target.getAttribute('data-tab-id')
        });
    }
}
