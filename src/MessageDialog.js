import Dialog from './Dialog';

export default class MessageDialog extends Dialog {
    get defaultProps () {
        return {
            ...super.defaultProps,
            className: 'is-small is-text-centered',
            isClosable: true,
            message: null
        };
    }

    get content () {
        return this.props.message;
    }
}
