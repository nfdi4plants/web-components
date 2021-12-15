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
    `;

    @property({ type: String }) title = 'Heading';

    @property({ type: String }) text = '';

    render() {
        return html`
            <h2>${this.title.toUpperCase()}</h2>
            <p>${this.text}</p>
        `;
    }
}
