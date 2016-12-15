import Dialog from '~/src/Dialog';
import SpinnerDialog from '~/src/SpinnerDialog';
import MessageDialog from '~/src/MessageDialog';
import MyForm from './MyForm';

export default class MyDialog extends Dialog {
    get content () {
        return `
            <p>Lorem ipsum dolor sit amet, duo tota mnesarchum eu, nam virtute ocurreret consetetur at. Ad vix urbanitas argumentum, eius scriptorem an duo, illum soleat vim eu. Et nam novum eripuit, in paulo pertinacia sea, quo ad meliore accusata repudiare. Quo munere petentium eu, ei dolorem gubergren mei. Cu dolorum officiis posidonium sea, ea option admodum fierent mel.</p>
            <p>An cum affert menandri mandamus. Cum te nonumes singulis, no eos unum quas insolens. Te eos nisl facete. Te sea homero malorum euripidis, ad vel veniam homero volutpat. Et agam solum mea, aliquip dolorum percipitur per at.</p>
            <p>Ex vix petentium urbanitas maiestatis, maiorum noluisse mel eu, adhuc patrioque in ius. In sed facer exerci, expetendis persequeris eu has. Et mutat philosophia qui, ne autem habemus scaevola sit, vim et amet possim ocurreret. Id vim autem iriure diceret. Te vix error disputationi, ei saperet temporibus interpretaris eam, est malorum eripuit et. Mucius accusamus ut usu, pri an cetero accusata. Ex mucius omnesque deleniti eam.</p>
            <p>Cum admodum instructior ex. Simul omittam incorrupte te sit, id facer veritus singulis pri, lorem utinam meliore eos id. Graeci causae voluptatum ex sea, mutat vidisse usu at. Dicam ornatus cu his, et possim sapientem maluisset sea. Ei per solet fabulas senserit.</p>
            <p>Qui virtute delenit perpetua et. Ad vel quaeque eruditi, per no semper nostro interpretaris. Nam ex malorum cotidieque. Pro et everti eligendi, ea duo agam malorum. Idque hendrerit assueverit ut quo. Ex ius putant audire mediocrem, vix graece intellegam ea, dolor epicurei no mel. Vis scaevola appetere ei, mea cu aliquid interpretaris.</p>
            <button data-ref="button" class="button is-normal">Spin</button>
            &nbsp;
            <button data-ref="messageButton" class="button is-normal">Message</button>
            <div data-ref="formContainer"></div>
        `;
    }

    _handleButtonClick (event) {
        event.preventDefault();
        const spinnerDialog = new SpinnerDialog({
            closeTimeout: 1000,
            destroyOnClose: true
        });
        spinnerDialog.open();
    }

    _handleMessageClick () {
        event.preventDefault();
        const messageDialog = new MessageDialog({
            message: 'An cum affert menandri mandamus. Cum te nonumes singulis, no eos unum quas insolens. Te eos nisl facete. Te sea homero malorum euripidis, ad vel veniam homero volutpat. Et agam solum mea, aliquip dolorum percipitur per at.',
            destroyOnClose: true
        });
        messageDialog.open();
    }

    render () {
        super.render();
        this.refs.button.addEventListener('click', this._handleButtonClick.bind(this));
        this.refs.messageButton.addEventListener('click', this._handleMessageClick.bind(this));
        const myForm = new MyForm({ mountEl: this.refs.formContainer });
        myForm.on('submit', (payload) => console.log(payload));
        myForm.on('submit', (payload) => console.log(payload));
    }
}
