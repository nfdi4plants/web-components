import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import * as Colors from '../cssts/nfdi-colors.js'
import { isLight } from '../UtilFunctions/isLight.js'
import { prismStyles } from '../cssts/prism-css';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-fsharp';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';

// https://github.com/PrismJS/prism/blob/master/plugins/line-numbers/prism-line-numbers.js#L109
// https://stackoverflow.com/a/59577306/12858021
// const NEW_LINE_EXP = /\n(?!$)/g;
// let lineNumbersWrapper : string;

// Prism.hooks.add('after-tokenize', function (env) {
//     const match = env.code.match(NEW_LINE_EXP);
//     const linesNum = match ? match.length + 1 : 1;
//     const lines = new Array(linesNum + 1).join('<span></span>');
//     lineNumbersWrapper = `<span aria-hidden="true" class="line-numbers-rows">${lines}</span>`;
// });

function suggestedHighlight(code: string, language: string) : string {
	if (Prism.languages[language]) {
		return Prism.highlight(code, Prism.languages[language], language) //+ lineNumbersWrapper;
	} else {
        console.log('grammar not found')
		return Prism.util.encode(code).toString() //+ lineNumbersWrapper;
	}
}

function trimCode(code: string) {
    const start = '<script type="text/plain">'
    const end = '</script>'
    const trimStart = code.startsWith(start) ? code.slice(start.length) : code
    return trimStart.endsWith(end) ? trimStart.slice(0, trimStart.length - end.length) : trimStart
}

function processInnerHtml(innerHtml: string) : string  {
    return trimCode(innerHtml.replace(/&gt;/ig,'>',).replace(/&lt;/ig,'<').replace(/&amp;/ig,'&'))
}

// https://highlightjs.org/download/
@customElement('nfdi-code')
export class Code extends LitElement {

    static styles = [
        prismStyles,
        css`
            div {
                background-color: var(--outside-background-color,${Colors.nfdiWhite});
                border: 1px solid #ddd;
                border-left: 3px solid var(--accent-text-color,${Colors.nfdiLightblue});
                color: ${Colors.nfdiBlack};
                page-break-inside: avoid;
                font-family: monospace;
                font-size: 15px;
                line-height: 1.6;
                margin-bottom: 1.6em;
                max-width: 100%;
                overflow: auto;
                display: block;
                word-wrap: break-word;
                position: relative
            }

            /* from bulma except: remove border-radius */
            .button {
                -moz-appearance: none;
                -webkit-appearance: none;
                align-items: center;
                border: 1px solid transparent;
                box-shadow: none;
                display: inline-flex;
                font-size: 1rem;
                height: 2.5em;
                justify-content: flex-start;
                line-height: 1.5;
                padding-bottom: calc(0.5em - 1px);
                padding-left: calc(0.75em - 1px);
                padding-right: calc(0.75em - 1px);
                padding-top: calc(0.5em - 1px);
                position: relative;
                vertical-align: top;
            }

            .button.is-small {
                font-size: 0.75rem;
            }

            .button:focus, .button.is-focused {
                border-color: #3273dc;
                color: #363636;
            }
            .button:focus:not(:active), .button.is-focused:not(:active) {
                box-shadow: 0 0 0 0.125em rgba(79, 179, 217, 0.25);
            }
            .button:active, .button.is-active {
                border-color: #4a4a4a;
                color: #363636;
            }

            .button.is-ghost {
                background: none;
                border-color: transparent;
                color: #4FB3D9;
                text-decoration: none;
            }

            .button.is-ghost:hover, .button.is-ghost.is-hovered {
                color: #4FB3D9;
                text-decoration: underline;
            }

            .copybutton {
                position: absolute;
                right: 0;
                top: 0;
                border-left: 1px solid var(--element-text-color,${Colors.nfdiWhite}) !important;
                border-bottom: 1px solid var(--element-text-color,${Colors.nfdiWhite}) !important;
            }

            .copybutton:active {
                box-shadow: -1 1 0 1px var(--element-text-color,${Colors.nfdiWhite}) !important;
            }

            slot {
                display: none
            }
        `
    ]

    @property()
    highlightedCode?: string

    render() {
        return html`
            <div>
                <button class="button is-small copybutton is-ghost" @click=${this._copyTextToClipboard}>copy</button>
                <pre id="code" class="line-numbers"><code>${unsafeHTML(this.highlightedCode)}<slot></slot></code></pre>
            </div>
        `
    }
    // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    private fallbackCopyTextToClipboard(text: string) {
        const textArea = document.createElement('textarea')
        textArea.hidden = true
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        textArea.remove()
    }

    private _copyTextToClipboard() {
        let text = processInnerHtml(this.innerHTML)
        if (!navigator.clipboard) {
            this.fallbackCopyTextToClipboard(!text ? '' : text);
            return;
        }
        navigator.clipboard.writeText(!text ? '' : text).then(function () {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    connectedCallback() {
        super.connectedCallback()
        setTimeout(() => {
            let customBGC = getComputedStyle(this).getPropertyValue('--outside-background-color');
            let customCTC = getComputedStyle(this).getPropertyValue('--code-text-color');
            if (customBGC !== '' && customCTC == '') {
                const newC = isLight(customBGC) ? "black" : "white"
                this.style.setProperty('--code-text-color', newC);
            }
            const languageArr = this.className.match(/language-[a-z]+/);
            const language = languageArr ? languageArr[0] : "language-"
            let c = this.shadowRoot?.getElementById('code');
            // add specified language to the code element
            c?.classList.add(language);
            if (c != undefined && customBGC !== '') {
                const newC = isLight(customBGC) ? "black" : "white"
                c.style.color = newC
            }           
            this.innerHTML.replace(/&gt;/ig,'>',).replace(/&lt;/ig,'<').replace(/&amp;/ig,'&')
            let processedInnerHtml = processInnerHtml(this.innerHTML)
            // console.log(this.innerHTML)
            // console.log(processedInnerHtml)
            this.highlightedCode = suggestedHighlight(processedInnerHtml, language.replace("language-", ""))
            this.requestUpdate()
        })
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'nfdi-code': Code
    }
}