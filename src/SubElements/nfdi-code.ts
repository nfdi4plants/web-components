import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { bulmaStyles } from '../cssts/bulma-css'
import * as Colors from '../cssts/nfdi-colors.js'
import { isLight } from '../UtilFunctions/isLight.js'
import { prismStyles } from '../cssts/prism-css';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-fsharp';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-csharp';

// https://github.com/PrismJS/prism/blob/master/plugins/line-numbers/prism-line-numbers.js#L109
// https://stackoverflow.com/a/59577306/12858021
const NEW_LINE_EXP = /\n(?!$)/g;
let lineNumbersWrapper : string;

Prism.hooks.add('after-tokenize', function (env) {
    const match = env.code.match(NEW_LINE_EXP);
    const linesNum = match ? match.length + 1 : 1;
    const lines = new Array(linesNum + 1).join('<span></span>');
    
    lineNumbersWrapper = `<span aria-hidden="true" class="line-numbers-rows">${lines}</span>`;
});

function suggestedHighlight(code: string, language: string) : string {
	if (Prism.languages[language]) {
		return Prism.highlight(code, Prism.languages[language], language) + lineNumbersWrapper;
	} else {
        console.log('grammar not found')
		return Prism.util.encode(code).toString() + lineNumbersWrapper;
	}
}

// https://highlightjs.org/download/
@customElement('nfdi-code')
export class Code extends LitElement {

    static styles = [
        bulmaStyles,
        prismStyles,
        css`
            pre {
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
                padding: 1em 1.5em;
                display: block;
                word-wrap: break-word;
                position: relative
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
            <pre id="code" class="line-numbers"><button class="button is-small copybutton is-ghost" @click=${this._copyTextToClipboard}>copy</button><code>${unsafeHTML(this.highlightedCode)}<slot></slot></code></pre>
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
        let text = this.innerHTML
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
            this.highlightedCode = suggestedHighlight(this.innerHTML, 'fsharp')
            this.requestUpdate()
        })
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'nfdi-code': Code
    }
}