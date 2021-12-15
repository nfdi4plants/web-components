import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class MySynopsis extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 25px;
            color: var(--test-component-text-color, #000);
        }
    `;

    @property({ type: String }) title = 'Hey there';

    @property({ type: String }) text = 'Hey there';

    render() {
        return html` <pre>${this.title} <br> ${this.text}</pre> `;
    }
}
