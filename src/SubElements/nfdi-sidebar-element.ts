import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { bulmaStyles } from '../cssts/bulma-css'
import * as Colors from '../cssts/nfdi-colors.js'
import { isLight } from '../UtilFunctions/isLight'

@customElement('nfdi-sidebar-title')
export class SidebarTitle extends LitElement { 
    static styles = [
        bulmaStyles,
        css`
            .myIcon {
                position: absolute;
                right: -1.5rem;
                top: 0.5rem;
                display: inline-block;
                font-style: normal;
                font-variant: normal;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                color: var(--accent-text-color, ${Colors.nfdiBlack}) !important;
                transition: transform 0.1s ease-in-out;
            }

            .myIcon.isActive { 
                transform: rotate(90deg);
            }

            ::slotted(*) {
                display: inline-block
            }

            #slot-container {
                position: relative;
                width: fit-content;
                text-align: left;
            }
        `
    ]

    @property({type: Boolean})
    isActive = false;

    render() {
        return html`
            <div id="slot-container">
                <slot></slot>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" width=1rem height=1rem class="${this.isActive ? `myIcon isActive` : `myIcon`}">
                    <path fill="currentColor" d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/>
                </svg>
            </div>
            `
    }
}

@customElement('nfdi-sidebar-element')
export class SidebarElement extends LitElement {

    static styles = [
        bulmaStyles,
        css`

            :host {
                min-width: 0;
            }
            
            button {
                width: 90%;
                padding: 0rem;
                border: none;
                background: none;
                cursor: pointer;
            }

            button ::slotted(*) {
                font-weight: bold;
                color: var(--accent-text-color, ${Colors.nfdiBlack}) !important;
                font-size: 1.4rem;
                margin-bottom: 0.2rem;
            }

            button:hover ::slotted(h1,h2,h3) {
                text-decoration: underline !important;
            }
            
            .inner-wrapper {
                margin-left: -2px;
                display: none
            }

            .inner-wrapper ::slotted(*:nth-child(n+3)) {
                margin-top: 0.3rem !important
            }
            
            .inner-wrapper ::slotted(*:hover) {
                text-decoration: underline !important;
            }
            
            .inner-wrapper ::slotted(h1) {
                font-size: 0.9rem !important;
                color: var(--sidebar-text-color, ${Colors.nfdiBlack}) !important;
                color: ${Colors.nfdiBlack};
                padding: 2px !important;
                margin: 0 !important;
                cursor: pointer;
            }

            .inner-wrapper ::slotted(h2) {
                font-size: 0.9rem !important;
                color: var(--sidebar-text-color, ${Colors.nfdiBlack}) !important;
                padding: 2px !important;
                margin: 0 0 0 1rem !important;
                cursor: pointer;
            }

            .inner-wrapper ::slotted(h3) {
                font-size: 0.9rem !important;
                color: var(--sidebar-text-color, ${Colors.nfdiBlack}) !important;
                padding: 2px !important;
                margin: 0 0 0 2rem !important;
                cursor: pointer;
            }

            ::slotted(.active-sub-page) {
                font-weight: bold !important;
                text-decoration: underline !important;
                /* border-radius: 2px !important; */
                /* background-color: lightgrey; */
                /* border-radius: 0; */
            }

            .is-active { 
                display: block !important
            }

            .container {
                padding: 3px
            }

        `
      ] 
      

    @property({type: Boolean})
    isActive = false;

    render() {
        return html`
            <div class="container">
                <button @click=${this._toggleActive}><nfdi-sidebar-title ?isactive=${this.isActive}><slot name="title"></slot></nfdi-sidebar-title></button>
                <div class="${this.isActive ? `inner-wrapper is-active` : `inner-wrapper`}">
                    <slot name="inner"></slot>
                </div>
            </div>
        `
    }

    private _toggleActive() {
        this.isActive = !this.isActive
    }

    connectedCallback() {
        super.connectedCallback()
        setTimeout(() => {
            const customSBGC = getComputedStyle(this).getPropertyValue('--sidebar-background-color');
            const customSTC = getComputedStyle(this).getPropertyValue('--sidebar-text-color');
            if (customSBGC !== '' && customSTC == '') {
                const newC = isLight(customSBGC) ? "black" : "white"
                this.style.setProperty('--sidebar-text-color', newC);
            } 
            const currentPage = window.location.pathname
            const currentUrl = window.location.href
            const children = Array.from(this.children)
            const anchoredChildren : Node [] = 
                children.map(child => {
                    if (child.hasAttribute('slot') && child.getAttribute('slot') === 'title')
                    {
                        child.innerHTML = child.innerHTML
                        return child; 
                    }
                    else 
                    {
                        let hasHref = child.hasAttribute('href')
                        let url = hasHref ? child.getAttribute('href') : ''
                        let href = `href="${url}" `
                        if (url == currentPage || url == currentUrl) {
                            child.classList.add('active-sub-page')
                        }
                        child.innerHTML = `<a ${href}style="color: unset !important">${child.innerHTML}</a>`; 
                        return child;
                    }
                })
            this.replaceChildren(...anchoredChildren)
            this.requestUpdate()
        })
    }
};



declare global {
    interface HTMLElementTagNameMap {
        'nfdi-sidebar-element': SidebarElement
    }
}