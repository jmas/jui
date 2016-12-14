import Component from './Component';

export default class Form extends Component {
    get tagName () {
        return 'form';
    }

    get defaultProps () {
        return {
            action: null,
            method: null,
            data: {}
        };
    }

    get data () {
        return this.props.data;
    }

    render () {
        super.render();
        this.el.method = this.props.method || 'get';
        if (this.props.action) {
            this.el.action = this.props.action;
        }
    }
}
