import Component from '~/src/Component';
import SpinnerDialog from '~/src/SpinnerDialog';

export default class MyForm extends Component {
    get defaultProps () {
        return {
            users: [
                'Mike', 'Ben', 'Alex'
            ],
            fruits: [
                'Apple', 'Banana', 'Orange'
            ],
            data: {
                name: 'Bob',
                user: 'Ben',
                fruits: ['Banana'],
                fruit: 'Apple'
            }
        };
    }

    get content () {
        return `
            <form data-ref="form">
                <h2>Form example</h2>
                <p>
                    <label>Input</label>
                    <input type="text" name="name" value="${ this.props.data.name || '' }" data-ref="name" />
                </p>
                <p>
                    <label>Select</label>
                    <select data-ref="user">
                        ${ this.props.users.map((user) => `
                            <option ${ this.props.data.user===user ? 'selected': '' }>${ user }</option>
                        `).join('') }
                    </select>
                </p>
                <p>
                    ${ this.props.fruits.map((fruit) => `
                        <label>
                            <input data-ref="fruitCheckboxes" type="checkbox" name="fruits[]" value="${ fruit }" ${ this.props.data.fruits.indexOf(fruit)!==-1 ? 'checked': '' } />
                            ${ fruit }
                        </label>
                    `).join('') }
                </p>
                <p>
                    ${ this.props.fruits.map((fruit) => `
                        <label>
                            <input data-ref="fruitRadios" type="radio" name="fruit" value="${ fruit }" ${ this.props.data.fruit===fruit ? 'checked': '' } />
                            ${ fruit }
                        </label>
                    `).join('') }
                </p>
                <button type="submit" class="button is-primary">Send</button>
            </form>
        `;
    }

    _handleFormSubmit (event) {
        event.preventDefault();
        this.props = {
            data: {
                name: this.refs.name.value,
                user: this.refs.user.value,
                fruits: this.refs.fruitCheckboxes.map((fruit) => fruit.checked ? fruit.value: null).filter((fruit) => fruit!==null),
                fruit: this.refs.fruitRadios.map((fruit) => fruit.checked ? fruit.value: null).filter((fruit) => fruit!==null).shift()
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
        this.refs.form.addEventListener('submit', this._handleFormSubmit.bind(this));
    }
}
