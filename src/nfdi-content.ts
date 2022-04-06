import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { bulmaStyles } from './bulma-css'

@customElement('nfdi-content')
export class Content extends LitElement {

    static styles = [
        bulmaStyles,
        css`
        `
      ] 

    render() {
        return html`
            <div class="box">
                <div>
                    <slot></slot>
                </div>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'nfdi-content': Content;
    }
}

