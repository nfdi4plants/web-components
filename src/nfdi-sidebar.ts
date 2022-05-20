import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { bulmaStyles } from './cssts/bulma-css'
import * as Colors from './cssts/nfdi-colors'

@customElement('nfdi-sidebar')
export class Sidebar extends LitElement {

    static styles = [
        bulmaStyles,
        css`
            .inner-wrapper {
                position: sticky;
                top: 71px;
                max-height: 90%;
                scrollbar-color: var(--element-background-color, ${Colors.nfdiWhite}) var(--accent-text-color, ${Colors.nfdiBlack});
                background-color: var(--sidebar-background-color, transparent);
                padding: 1rem;
                border-radius: 10px;
                overscroll-behavior: contain;
                overflow-y: auto;
                width: 300px;
            }

            .inner-wrapper::-webkit-scrollbar {
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                width: 5px;
                height: 0px;
            }

            .inner-wrapper::-webkit-scrollbar-track { /* Background */
                background-color: var(--element-background-color, ${Colors.nfdiWhite});
            }

            .inner-wrapper::-webkit-scrollbar-thumb { /* Foreground */
                background-color: var(--accent-text-color, ${Colors.nfdiBlack});
            }

            ::slotted(*) {
                margin-bottom: 1rem;
                display: block;
                background: none;
                color: var(--element-text-color, ${Colors.nfdiBlack});
                border-color: var(--element-text-color, ${Colors.nfdiBlack});
                overflow: hidden
            }
            
            .fixed-footer {
                position: fixed;
                display: none;
                left: 0;
                bottom: 0;
                z-index: 10000;
                width: 100%;
                border-top: .5px solid var(--element-text-color, ${Colors.nfdiBlack});
                background-color: var(--element-background-color, ${Colors.nfdiDarkblue});
                justify-content: center;
                padding: .5rem;
            }

            .close-sidebar-button {
                position: absolute;
                top: 0;
                right: 0;
                z-index: 10001;
                display: none;
            }

            @media only screen and (min-width: 1024px) {
                .main {
                    display: grid; 
                    height: 100%;
                    grid-template-columns: 1fr; grid-template-rows: 1fr;
                }

                .wrapper {
                    display: inline-block;
                    grid-column: 1 / span 1; 
                    grid-row: 1 / span 1;
                }
            }

            @media only screen and (max-width: 1023px) {
                .inner-wrapper {
                    position: fixed;
                    height: 100%;
                    top: 0;
                    left: -300px;
                    border-right: .5px solid var(--element-text-color, ${Colors.nfdiBlack});
                    border-bottom: .5px solid var(--element-text-color, ${Colors.nfdiBlack});
                    border-top: .5px solid var(--element-text-color, ${Colors.nfdiBlack});
                    background-color: var(--sidebar-background-color, ${Colors.nfdiWhite});
                    border-radius: 0;
                    z-index: 10000;
                    width: 300px;
                    transition: left .5s;
                    padding: 1rem;
                    max-height: 100%;
                    max-width: 100%;
                    overflow: scroll;
                }
                
                .close-sidebar-button {
                    display: block;
                }

                .is-active {
                    left: 0
                }

                :host {
                    display: inline
                }

                .fixed-footer {
                    display: flex
                }
            }
        `
      ] 

    @property({type: Boolean})
    navbarIsActive = false;

    render() {
        return html`
            <footer class="fixed-footer">
                <button class="button is-ghost" @click=${this._toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" class="icon" height=16 width=16><path fill="currentcolor" d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z"/></svg>
                </button>
            </footer>
            <div class="main">
                <div class="wrapper">
                    <div class=${this.navbarIsActive ? "inner-wrapper is-active" : "inner-wrapper"}>
                        <button class="button is-ghost close-sidebar-button" @click=${this._toggleSidebar}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="icon" height=16 width=16><path fill="currentcolor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
                        </button>
                        <slot></slot>
                    </div>    
                </div>
            </div>
        `
    }

    private _toggleSidebar() { 
        this.navbarIsActive = !this.navbarIsActive
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'nfdi-sidebar': Sidebar
    }
}