import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { bulmaStyles } from './bulma-css'

@customElement('nfdi-body')
export class Body extends LitElement {

    static styles = [
        bulmaStyles,
        css`
            .body {
                background-color: #f0f5e6;
                padding: 2rem;
            }
        `
      ] 

    render() {
        return html`
            <div class="body">
                <div class="container is-max-desktop">
                    <div class="columns">
                        <div class="column is-one-quarter">
                            <nfdi-sidebar>  
                                <slot name="sidebar"></slot>
                            </nfdi-sidebar>
                        </div>
                        <div class="column">
                            <nfdi-content>  
                                <slot></slot>
                            </nfdi-content>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'nfdi-body': Body
    }
}
