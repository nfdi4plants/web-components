import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class CLISynopsis extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 25px;
            color: var(--test-component-text-color, #000);
        }
        pre {
            padding: 1em;
            margin-bottom: 1em;
            font-family: var(argument-font);
            line-height: 18px;
            color: #4e443c;
            word-wrap: break-word;
            white-space: pre;
            white-space: pre-wrap;
            background-color: var(--synopsis-background-color, lightgrey);
            border: solid 1px #efeee6;
            overflow: auto;
            border-radius: 3px;
        }
        b {
            font-weight: bolder;
            color: black;
        }
    `;

    @property({ type: String }) text = 'Hey there';

    @property({ type: String }) commandlinename = 'Hey there';

    render() {
        return html` <pre><b>${this.commandlinename}</b> ${this.text}</pre> `;
    }
}
