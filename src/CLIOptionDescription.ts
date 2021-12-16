import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class CLIOptionDescription extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 0px 25px 0px 25px;
            color: var(--test-component-text-color, #000);
        }
        dt {
            font-family: var(--argument-font);
            font-weight: bold;
            color: var(--argument-color, black);
        }
        dd {
            font-family: var(--argument-description-font);
            color: var(--argument-description-color, black);
        }
        .mandatory {
            color: var(--argument-description-color, black);
            display: inline;
            color: var(--heading-color, black);
        }
        .exmpl {
            font-family: var(--argument-font);
            font-style: italic;
            display: inline;
            color: var(--argument-example-color, black);
        }
        p {
            color: var(--argument-description-color, black);
            display: inline;
        }
        code {
            background-color: var(--code-background-color, #fff);
            border: solid 1px #efeee6;
            border-radius: 3px;
            color: var(--code-color, #f14e32);
            display: inline;
            font-family: var(--code-font, (Courier, monospace));
            word-wrap: break-word;
            overflow: auto;
            white-space: pre;
            white-space: pre-wrap;
        }
    `;

    @property({ type: String }) option = '--blank';

    @property({ type: String }) abbreviation = '';

    @property({ type: Boolean }) isMandatory = false;

    @property({ type: String }) example = '';

    get mand() {
        if (this.isMandatory) {
            return ' (mandatory)';
        }
        return '';
    }

    get exmpl() {
        if (this.example !== '') {
            return 'Example: ';
        }
        return '';
    }

    render() {
        return html`
            <dt>${this.abbreviation}</dt>
            <dt>
                ${this.option}
                <p class="mandatory">${this.mand}</p>
            </dt>
            <dd>${this.children}</dd>
            <dd>
                ${this.exmpl}
                <p class="exmpl">${this.example}</p>
            </dd>
            <br />
        `;
    }
}
