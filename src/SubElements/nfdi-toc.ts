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
            <div class="card" style="margin-bottom: 1rem">
                <header class="card-header">
                    <p class="card-header-title">Content</p>
                    <!-- <button class="card-header-icon" aria-label="more options">
                        <span class="icon is-small">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path fill="currentColor" d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/>
                            </svg>
                        </span>
                    </button> -->
                </header>
                <div class="card-content">
                    <div class="content">
                        <ul>
                            ${this.foundHeaders.map((item) =>
                                html`
                                    <div></div><a class=${"pseudoMarker " + this.marginLeft(item.depth)} href=${"#" + item.id}>${item.text}</a></div>
                                `
                            )}
                        </ul>
                    </div>
                </div>
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
            default:
                return "depth1";
                break;
        }
    };

    connectedCallback() {
        super.connectedCallback()
        setTimeout(() => {
            let headers = document.querySelectorAll("nfdi-h1, nfdi-h2, nfdi-h3, nfdi-h4, nfdi-h5, nfdi-h6")
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