import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { bulmaStyles } from './cssts/bulma-css'

@customElement('nfdi-content')
export class Content extends LitElement {

    static styles = [
        bulmaStyles,
        css`
            ::slotted(p) {
                text-align: justify;
            }

            ::slotted(blockquote) {
                text-align: justify;
            }

            .box {
                padding: 1.25rem 2rem;
            }
        `
      ] 

    render() {
        return html`
            <div class="box"><slot></slot></div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'nfdi-content': Content;
    }
}

