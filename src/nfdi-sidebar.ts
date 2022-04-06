import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { bulmaStyles } from './bulma-css'

@customElement('nfdi-sidebar')
export class Sidebar extends LitElement {

    static styles = [
        bulmaStyles,
      ] 

    render() {
        return html`
            <div class="content">
                <h2>Title</h2>
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