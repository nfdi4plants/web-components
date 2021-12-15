import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class CLISynopsis extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 25px;
            color: var(--test-component-text-color, #000);
        }
    `;

    @property({ type: String }) text = 'Hey there';

    render() {
        return html`
            <h1 style="background-color:var(--header-color, #000);">
                Synopsis
            </h1>
            <pre style="background-color:var(--synopsis, #000);">
            ${this.text}
            </pre
            >
        `;
    }
}
