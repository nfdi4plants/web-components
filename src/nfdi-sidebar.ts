import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { bulmaStyles } from './cssts/bulma-css'
import * as Colors from './cssts/nfdi-colors'

@customElement('nfdi-sidebar')
export class Sidebar extends LitElement {

    static styles = [
        bulmaStyles,
        css`
            ::slotted(*) {
                margin-bottom: 1rem;
                display: block;
                background-color: var(--outside-background-color, ${Colors.nfdiOliveLighter80});
                color: var(--element-text-color, ${Colors.nfdiBlack});
                border-color: var(--element-text-color, ${Colors.nfdiBlack});
                overflow: hidden
            }
        `
      ] 

    render() {
        return html`
            <div>
                <slot></slot>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'nfdi-sidebar': Sidebar
    }
}