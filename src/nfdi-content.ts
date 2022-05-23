import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { bulmaStyles } from './cssts/bulma-css'
import * as Colors from './cssts/nfdi-colors'

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
                background-color: var(--element-background-color, ${Colors.nfdiWhite}) !important;
                border-color: var(--element-text-color, ${Colors.nfdiBlack});
            }

            .box {
                padding: 1.25rem 2rem;
                background-color: var(--element-background-color, ${Colors.nfdiWhite});
                color: var(--element-text-color, ${Colors.nfdiBlack}) !important;
                border-color: var(--element-text-color, ${Colors.nfdiBlack});
                border: 1px solid;
                /* box-shadow: unset */
            }

            ::slotted(nfdi-h1), ::slotted(nfdi-h2), ::slotted(nfdi-h3), ::slotted(nfdi-h4), ::slotted(nfdi-h5), ::slotted(nfdi-h6) {
                color: var(--header-color, ${Colors.nfdiBlack}) !important;
            }

            ::slotted(*) {
                min-width: 0 !important;
            }

            @media only screen and (max-width: 1023px) {
                .box {
                   border: none;
                   border-radius: 0;
                }
            }

            @media only screen and (max-width: 599px) {
                .box {  
                    border-radius: 0;
                    padding: 1rem;
                    border: unset
                }
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

