import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class NewChapter extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding-left: 25px;
            color: var(--text-color, #000);
        }
        h2 {
            font-family: 'Roboto Slab', 'DejaVu Serif', Georgia,
                'Times New Roman', sans-serif !important;
            margin-top: 20px;
            font-weight: bold;
            line-height: 44px;
            color: var(--heading-color, black);
            text-rendering: optimizelegibility;
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

    @property({ type: String }) title = 'Heading';

    render() {
        return html`
            <h2>${this.title}</h2>
            ${this.children}
        `;
    }
}
