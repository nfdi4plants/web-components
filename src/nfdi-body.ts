import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { bulmaStyles } from './bulma-css'
import { nfdiBrandingStyles } from './nfdi-branding-css'


// https://stackoverflow.com/questions/61626493/slotted-css-selector-for-nested-children-in-shadowdom-slot
@customElement('nfdi-body-pseudo')
export class BodyPseudo extends LitElement {

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

// https://stackoverflow.com/questions/61626493/slotted-css-selector-for-nested-children-in-shadowdom-slot
@customElement('nfdi-body')
export class Body extends LitElement {

    static styles = [
        bulmaStyles,
        nfdiBrandingStyles,
      ] 

    render() {
        return html`
            <nfdi-body-pseudo id="nfdi-body" class="content"></nfdi-body-pseudo>
        `
    }

    // Ok this part needs explaining:
    // Without the following, the children, which we want slotted into 'nfdi-body-pseudo' would have styling according to the lightDOM (the html where the children are written).
    // But we want the children to use the imported 'bulmaStyles' + adjusted nfdi-branding so we need to place them inside our shadowDOM with the styles.
    // 1. nfdi-body-pseudo with nicely styled and slotted children is our goal.
    // 2. nfdi-body is a wrapper element that when created will move the children from the lightDOM to the nfdi-body shadowDOM.
    // 2.5 This is done with the function below. 
    //      'templateContent' gets the children from the lightDOM.
    //      'shadowRoot', followed by 'body' gets the nfdi-body-pseudo node from the wrapper shadowDOM.
    //      we then append the lightDOM children as children to the nfdi-body-pseudo node.
    //      because they are then inside our wrapper shadowDOM our styling in 'nfdi-body' will apply to them

    // https://jsfiddle.net/CustomElementsExamples/Lhcsd2m5/?slotmeister
    // This is executed when the element is loaded
    connectedCallback() {
        // https://lit.dev/docs/components/lifecycle/#custom-element-lifecycle
        super.connectedCallback()
        // make sure we can access (light)DOM here
        setTimeout(() => {
            let templateContent = Array.from(this.children)
            let shadowRoot = this.shadowRoot
            let body = shadowRoot?.getElementById("nfdi-body")
            body?.append(...templateContent)
            // console.log(templateContent)
        })
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'nfdi-body-pseudo': BodyPseudo;
        'nfdi-body': Body
    }
}
