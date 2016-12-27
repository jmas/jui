import Tabs from '~/src/Tabs';

export default class MyTabs extends Tabs {
    get defaultProps () {
        return {
            ...super.defaultProps,
            activeTab: 'tab1'
        };
    }

    get tabs () {
        return [
            {
                id: 'tab1',
                name: 'Tab 1',
                content: 'Content of Tab 1.'
            },
            {
                id: 'tab2',
                name: 'Tab 2',
                content: 'Content of Tab 2.'
            },
            {
                id: 'tab3',
                name: 'Tab 3',
                content: 'Content of Tab 3.'
            }
        ];
    }
}
