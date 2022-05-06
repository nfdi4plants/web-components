import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { bulmaStyles } from '../cssts/bulma-css'
import * as Colors from '../cssts/nfdi-colors.js'

// https://highlightjs.org/download/
@customElement('nfdi-code')
export class Code extends LitElement {

    static styles = [
        bulmaStyles,
        css`
            pre {
                background-color: var(--outside-background-color,#F8F8FF);
                border: 1px solid #ddd;
                border-left: 3px solid var(--accent-text-color,${Colors.nfdiLightblue});
                color: var(--element-text-color, ${Colors.nfdiBlack});;
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
                border-left: 1px solid var(--element-text-color,#F8F8FF) !important;
                border-bottom: 1px solid var(--element-text-color,#F8F8FF) !important;
            }

            .copybutton:active {
                box-shadow: 0 0 0 1px var(--element-text-color,#F8F8FF) !important;
            }
        `
      ] 

    render() {
        return html`
            <pre><button class="button is-small copybutton is-ghost" @click=${this._copyTextToClipboard}>copy</button><code><slot></slot></code></pre>
        `
    }
    // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    private fallbackCopyTextToClipboard(text:string) {
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
        navigator.clipboard.writeText(!text ? '' : text).then(function() {
          console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
        });
      }

}

declare global {
    interface HTMLElementTagNameMap {
        'nfdi-code': Code
    }
}