import { css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { bulmaStyles } from './cssts/bulma-css'
import { unsafeStatic, html } from 'lit/static-html.js';
import * as Colors from './cssts/nfdi-colors.js'

const headerstyles = css`

    :host {
        scroll-margin-top: 100px
    }

    h1,h2,h3,h4,h5,h6 {
        display: block; 
        width: 100%;
        line-height: 1.2;
        padding: 0.5rem 0rem 0.75rem;
    }

    h1:hover .anchor, h2:hover .anchor, h3:hover .anchor, h4:hover .anchor, h5:hover .anchor, h6:hover .anchor {
        visibility: visible;
    }

    .anchor {
        float: left;
        padding-right: 4px;
        margin-left: -20px;
        line-height: 1;
        visibility: hidden;
    }

    .anchor-icon {
        display: inline-block;
        overflow: visible !important;
        vertical-align: middle;
        text-size-adjust: 100%;
        width: 16px;
        height: 16px;
    }

    a {
        color: var(--link-color, ${Colors.nfdiLightblue})
    }

    a:hover {
        color:var(--link-hover-color, ${Colors.nfdiBlack})
    }

`

const headerTemplate = (h:any, textId:string, text:string) => html`
    <${h}>
        <a href=${textId} class="anchor">
            <svg xmlns="http://www.w3.org/2000/svg" class="anchor-icon" viewBox="0 0 16 16">
                <path fill-rule="evenodd" fill="currentColor" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/>
            </svg>
        </a>
        ${text}
    </${h}>
`

function toInDOMHref(href: string | undefined) {
    if(href !== undefined) {
        return "#" + href
    } 
    // else
    {return "#"}
} 

const removeSpecialCharRegex = /[^a-zA-Z0-9\s]/g

export function createInPageLinkText(innerHtml:string) {
    const lightDOMText = innerHtml.trim()
    return lightDOMText.toLowerCase().replace(removeSpecialCharRegex,"").replace(/\s/g,"-")
}

@customElement('nfdi-h1')
export class H1 extends LitElement {

    static styles = [
        bulmaStyles,
        headerstyles
      ] 

    @property()
    text?: string;

    @property()
    textId?: string

    render() {
        return headerTemplate (
            unsafeStatic("h1"),
            toInDOMHref(this.textId), 
            this.text!
        ) 
    }

    connectedCallback() {
        // https://lit.dev/docs/components/lifecycle/#custom-element-lifecycle
        super.connectedCallback()
        // make sure we can access (light)DOM here
        setTimeout(() => {
            let lightDOMText = this.innerHTML.trim()
            this.text = lightDOMText
            let id = createInPageLinkText(lightDOMText)
            this.id = id
            this.textId = id
        })
    }
}


@customElement('nfdi-h2')
export class H2 extends LitElement {

    static styles = [
        bulmaStyles,
        headerstyles
      ] 

    @property()
    text?: string;

    @property()
    textId?: string

    render() {
        return headerTemplate (
            unsafeStatic("h2"),
            toInDOMHref(this.textId), 
            this.text!
        ) 
    }

    connectedCallback() {
        // https://lit.dev/docs/components/lifecycle/#custom-element-lifecycle
        super.connectedCallback()
        // make sure we can access (light)DOM here
        setTimeout(() => {
            let lightDOMText = this.innerHTML.trim()
            this.text = lightDOMText
            let id = lightDOMText.toLowerCase().replace(removeSpecialCharRegex,"").replace(/\s/g,"-")
            this.id = id
            this.textId = id
        })
    }
}

@customElement('nfdi-h3')
export class H3 extends LitElement {

    static styles = [
        bulmaStyles,
        headerstyles
      ] 

    @property()
    text?: string;

    @property()
    textId?: string

    render() {
        return headerTemplate (
            unsafeStatic("h3"),
            toInDOMHref(this.textId), 
            this.text!
        ) 
    }

    connectedCallback() {
        // https://lit.dev/docs/components/lifecycle/#custom-element-lifecycle
        super.connectedCallback()
        // make sure we can access (light)DOM here
        setTimeout(() => {
            let lightDOMText = this.innerHTML.trim()
            this.text = lightDOMText
            let id = lightDOMText.toLowerCase().replace(removeSpecialCharRegex,"").replace(/\s/g,"-")
            this.id = id
            this.textId = id
        })
    }
}

@customElement('nfdi-h4')
export class H4 extends LitElement {

    static styles = [
        bulmaStyles,
        headerstyles
      ] 

    @property()
    text?: string;

    @property()
    textId?: string

    render() {
        return headerTemplate (
            unsafeStatic("h4"),
            toInDOMHref(this.textId), 
            this.text!
        ) 
    }

    connectedCallback() {
        // https://lit.dev/docs/components/lifecycle/#custom-element-lifecycle
        super.connectedCallback()
        // make sure we can access (light)DOM here
        setTimeout(() => {
            let lightDOMText = this.innerHTML.trim()
            this.text = lightDOMText
            let id = lightDOMText.toLowerCase().replace(removeSpecialCharRegex,"").replace(/\s/g,"-")
            this.id = id
            this.textId = id
        })
    }
}

@customElement('nfdi-h5')
export class H5 extends LitElement {

    static styles = [
        bulmaStyles,
        headerstyles
      ] 

    @property()
    text?: string;

    @property()
    textId?: string

    render() {
        return headerTemplate (
            unsafeStatic("h5"),
            toInDOMHref(this.textId), 
            this.text!
        ) 
    }

    connectedCallback() {
        // https://lit.dev/docs/components/lifecycle/#custom-element-lifecycle
        super.connectedCallback()
        // make sure we can access (light)DOM here
        setTimeout(() => {
            let lightDOMText = this.innerHTML.trim()
            this.text = lightDOMText
            let id = lightDOMText.toLowerCase().replace(removeSpecialCharRegex,"").replace(/\s/g,"-")
            this.id = id
            this.textId = id
        })
    }
}

@customElement('nfdi-h6')
export class H6 extends LitElement {

    static styles = [
        bulmaStyles,
        headerstyles
      ] 

    @property()
    text?: string;

    @property()
    textId?: string

    render() {
        return headerTemplate (
            unsafeStatic("h6"),
            toInDOMHref(this.textId), 
            this.text!
        ) 
    }

    connectedCallback() {
        // https://lit.dev/docs/components/lifecycle/#custom-element-lifecycle
        super.connectedCallback()
        // make sure we can access (light)DOM here
        setTimeout(() => {
            let lightDOMText = this.innerHTML.trim()
            this.text = lightDOMText
            let id = lightDOMText.toLowerCase().replace(removeSpecialCharRegex,"").replace(/\s/g,"-")
            this.id = id
            this.textId = id
        })
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'nfdi-h1': H1,
        'nfdi-h2': H2,
        'nfdi-h3': H3,
        'nfdi-h4': H4,
        'nfdi-h5': H5,
        'nfdi-h6': H6
    }
}