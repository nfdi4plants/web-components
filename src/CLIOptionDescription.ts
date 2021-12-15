import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class CLIOptionDescription extends LitElement {
    static styles = css`
        dt {
            font-family: var(--consolas);
            font-weight: bold;
            color: var(--argument-color, black);
            padding-left: 25px;
        }
        dd {
            color: var(--argument-description-color, black);
            padding-left: 25px;
        }
        p {
            color: var(--argument-description-color, black);
            display: inline;
            color: var(--heading-color, black);
        }
    `;

    @property({ type: String }) option = '--blank';

    @property({ type: String }) description = 'Blank description';

    @property({ type: Boolean }) isMandatory = false;

    @property({ type: String }) example = '';

    get mand() {
        if (this.isMandatory) {
            return ' (mandatory)';
        }
        return '';
    }

    render() {
        return html`
            <dt>
                ${this.option}
                <p>${this.mand}</p>
            </dt>
            <dd>${this.description}</dd>
            <dd style="">${this.example}</dd>
            <br />
        `;
    }
}
