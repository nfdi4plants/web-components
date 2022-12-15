import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { bulmaStyles } from '../cssts/bulma-css'
import * as Colors from '../cssts/nfdi-colors.js'
import * as Nesting from '../UtilFunctions/nestHeader.js'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

function headerToHtml(header: Nesting.Header) {
    const nextHtml: any = 
        header.children.length !== 0 
            ? html`
                    <li>
                        <a href=${"#" + header.id}>${header.text}</a>
                        <ul>
                            ${header.children.map(headerToHtml)}
                        </ul>   
                    </li>
                `
            : html`
                <li>
                    <a href=${"#" + header.id}>${unsafeHTML(header.text)}</a>
                </li>
            `
    return nextHtml;
}

@customElement('nfdi-toc')
export class TOC extends LitElement {

    @property({ type: Array })
    foundHeaders : {depth: number, text: string, id: string, children: Array<Nesting.Header>} [] = [ ]

    @property({type: Number})
    lowestDepth: number = 1

    static styles = [
        bulmaStyles,
        css`
            li>ul {
                margin: 0.1em 1em !important
            }

            li a {
                color: var(--link-color, ${Colors.nfdiLightblue})
            }

            li a:hover {
                color:var(--link-hover-color, ${Colors.nfdiBlack})
            }

            :host {
                color: var(--element-text-color, ${Colors.nfdiBlack}) !important
            }
        `
      ] 

    render() {
        return html`
            <div class="content" style="margin-bottom: 1rem">
                <ul>
                    ${this.foundHeaders.map((item) =>
                        headerToHtml(item)
                    )}
                </ul>
            </div>
        `
    }

    connectedCallback() {
        super.connectedCallback()
        setTimeout(() => {
            let headers = 
                document.querySelectorAll("nfdi-h1, nfdi-h2, nfdi-h3, nfdi-h4, nfdi-h5, nfdi-h6")
            headers.forEach(element => {
                const depth = element.tagName.replace(/[^0-9]/g,"")  
                this.foundHeaders.push({depth: parseInt(depth), text: element.innerHTML.replace('&amp;', '&'), id: element.id, children: []})
            });
            // console.log(this.foundHeaders)
            this.foundHeaders = Nesting.nest(this.foundHeaders)
            this.requestUpdate()
        })
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'nfdi-toc': TOC
    }
}