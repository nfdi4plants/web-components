import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class CLISynopsis extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 25px;
            color: var(--test-component-text-color, #000);
        }
        h2 {
            font-family: 'Roboto Slab', 'DejaVu Serif', Georgia,
                'Times New Roman', sans-serif !important;
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
            line-height: 44px;
            color: var(--heading-color, black);
            text-rendering: optimizelegibility;
        }
        pre {
            padding: 1em;
            margin-bottom: 1em;
            font-family: Courier, monospace !important;
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
        return html`
            <h2>Synopsis</h2>
            <pre>
<b>${this.commandlinename}</b> ${this.text}
            </pre>
        `;
    }
}
