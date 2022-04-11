import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { bulmaStyles } from '../cssts/bulma-css'
// import { nfdiMint } from '../cssts/nfdi-colors'


@customElement('nfdi-toc')
export class TOC extends LitElement {

    @property({attribute: false})
    foundHeaders : {depth: number, text: string, id: string} [] = [ ]

    @property({type: Number})
    lowestDepth: number = 1

    static styles = [
        bulmaStyles,
        css`
            ul {
                counter-reset: h1 h2 h3 h4 h5 h6;
            }

            .pseudoMarker::before {
                padding-right: 1rem;
                color: black;
                pointer-events: none;
                cursor: default;
            }

            .depth1 {counter-reset: h2 h3 h4 h5 h6;}
            .depth1::before {
                counter-increment: h1;
                content: counter(h1) ".";
                margin-left: 0px;
            }
            .depth2 {counter-reset: h3 h4 h5 h6;}
            .depth2::before {
                counter-increment: h2;
                content: counter(h1) "." counter(h2) ".";
                margin-left: 2vw
            }
            .depth3 {counter-reset: h4 h5 h6;}
            .depth3::before {
                counter-increment: h3;
                content: counter(h1) "." counter(h2) "." counter(h3) ".";
                margin-left: 4vw
            }
            .depth4 {counter-reset: h5 h6;}
            .depth4::before {
                counter-increment: h4;
                content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) ".";
                margin-left: 6vw
            }
            .depth5 {counter-reset: h6;}
            .depth5::before {
                counter-increment: h5;
                content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ".";
                margin-left: 8vw
            }
            .depth6::before {
                counter-increment: h6;
                content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) "." counter(h6) ".";
                margin-left: 10vw
            }
        `
      ] 

    render() {
        return html`
            <div class="content" style="margin-bottom: 1rem">
                <ul>
                    <p class="label" style="text-align: center">Content</p>
                    ${this.foundHeaders.map((item) =>
                        html`
                            <div></div><span class=${"pseudoMarker " + this.marginLeft(item.depth)}></span><a href=${"#" + item.id}>${item.text}</a>
                        `
                    )}
                </ul>
            </div>
        `
    }

    private marginLeft(depth: number) {
        const adjustedDepth = (depth - this.lowestDepth)
        switch (adjustedDepth) {
            case 0:
                return "depth1";
                break;
            case 1:
                return "depth2";
                break;
            case 2:
                return "depth3";
                break;
            case 3:
                return "depth4";
                break;
            case 4:
                return "depth5";
                break;
            case 5:
                return "depth6";
                break;
            default:
                return "depth1";
                break;
        }
    };

    connectedCallback() {
        super.connectedCallback()
        setTimeout(() => {
            let headers = 
                document.querySelectorAll("nfdi-h1, nfdi-h2, nfdi-h3, nfdi-h4, nfdi-h5, nfdi-h6")
            headers.forEach(element => {
                const depth = element.tagName.replace(/[^0-9]/g,"")  
                this.foundHeaders.push({depth: parseInt(depth), text: element.innerHTML, id: element.id})
            });
            console.log(this.foundHeaders)
            const depths = this.foundHeaders.map((item) => {return item.depth})
            let minDepth = Math.min(...depths)
            this.lowestDepth = minDepth
            this.requestUpdate()
        })
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'nfdi-toc': TOC
    }
}