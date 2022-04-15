import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { bulmaStyles } from '../cssts/bulma-css'
import * as Colors from '../cssts/nfdi-colors.js'

type Header = {
    depth: number
    text: string
    id: string
    children: Header []
}

function findlowestLevelHeader(headers: Header []) {
    const min = Math.min(...headers.map(h => h.depth))
    return headers.filter((x_2) => (x_2.depth === min));
}

function nest(currentHeaders: Header []) {
    const currentLevelHeader = findlowestLevelHeader(currentHeaders);
    return currentLevelHeader.map(function(h, i) {
        const headerIndex = currentHeaders.findIndex((x) => x == h) | 0;
        let nextIndex;
        const next = currentLevelHeader[i+1] as Header | undefined
            // tryItem(i + 1, currentLevelHeader);
        nextIndex = ((next == null) ? currentHeaders.length : currentHeaders.findIndex((x_1) => x_1 == next));
        const children = currentHeaders.slice(headerIndex + 1, (nextIndex - 1) + 1);
        const updatedH : Header = {depth: h.depth, text: h.text, id: h.id, children: (children.length === 0) ? [] : nest(children)};
        return updatedH;
    })
}

function headerToHtml(header: Header) {
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
                    <a href=${"#" + header.id}>${header.text}</a>
                </li>
            `
    return nextHtml;
}

@customElement('nfdi-toc')
export class TOC extends LitElement {

    @property({ type: Array })
    foundHeaders : {depth: number, text: string, id: string, children: Array<Header>} [] = [ ]

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
                this.foundHeaders.push({depth: parseInt(depth), text: element.innerHTML, id: element.id, children: []})
            });
            // console.log(this.foundHeaders)
            this.foundHeaders = nest(this.foundHeaders)
            this.requestUpdate()
        })
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'nfdi-toc': TOC
    }
}