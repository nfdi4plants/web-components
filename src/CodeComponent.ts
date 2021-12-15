import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class CodeComponent extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 25px;
            color: var(--test-component-text-color, #000);
        }

        .colnum {
            -webkit-text-size-adjust: 100%;
            font-size: 1em;
            color: #f14e32;
            font-family: Courier, monospace;
            line-height: 18px;
            font-weight: bold;
        }
        pre {
            padding: 1em;
            -webkit-text-size-adjust: 100%;
            font-size: 1em;
            background-color: #fff;
            border: solid 1px #efeee6;
            border-radius: 3px;
            color: #f14e32;
            display: block;
            font-family: Courier, monospace;
            line-height: 18px;
            margin-bottom: 1em;
            overflow: auto;
            padding: 10px 15px 13px;
        }
    `;

    @property({ type: String }) codeLines = 'echo "Test"\nTest2';

    get splitedLines() {
        return this.codeLines
            .split('\n')
            .map((value, index) => `  (${index})  $ ${value} `)
            .join('\n');
    }

    render() {
        return html` <pre>${this.splitedLines}</pre> `;
    }
}
