import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { bulmaStyles } from './cssts/bulma-css'
import {mainPageBaseUrl, gitlabBaseUrl, knowledgeBaseUrl} from './params'
import * as Colors from './cssts/nfdi-colors'

/**
 * This element needs html {'padding-top: 3.25rem;'} for the source html.
 *
 */
@customElement('nfdi-navbar')
export class Navbar extends LitElement {

  static styles = [
    bulmaStyles,
    css`
        :host {
            position: fixed;
            z-index: 30;
            width: 100%;
        }
        .icon {
            width: 1em;
            height: 1em;
            vertical-align: -.125em;
        }
        .variable-colors, .navbar-item, .navbar-link, .navbar-dropdown {
            background-color: var(--element-background-color, ${Colors.nfdiDarkblue});
            color: var(--element-text-color, white);
            border-color: var(--element-text-color, white);
        }
        .navbar-divider {
            background-color: var(--element-text-color, white);
        }

        @media only screen and (max-width: 1023px) {
            #navbar-v-divide {
                display: none
            }
        }
    `
  ]
  
  @property({type: Boolean})
  navbarIsActive = false;

  // // https://stackoverflow.com/a/4504739/12858021
  // @property()
  // path = window.location.pathname+window.location.search

  @property()
  url = window.location.href

  render() {
    return html`
      <nav class="navbar is-fixed-top variable-colors" style="border-bottom: 1px solid">
        <div class="navbar-brand">
          <a class="navbar-item" href="${mainPageBaseUrl}">
            <img src="https://nfdi4plants.org/images/logo.svg" alt="Logo" width="32" height="32">
          </a>
          <div class=${this.navbarIsActive ? 'navbar-burger is-active' : 'navbar-burger'} data-target="navMenu" aria-label="menu" role="button" aria-expanded="false" @click=${this._toggleNavbar}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div id="navMenu" class=${this.navbarIsActive ? 'navbar-menu is-active' : 'navbar-menu'}>
          <div class="navbar-start is-justify-content-center is-flex-grow-1">
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" href="${mainPageBaseUrl}">
                About
                </a>
                <div class="navbar-dropdown is-active smooth-hover">
                  <a class=${this.url == "${mainPageBaseUrl}content/learn-more/our-mission.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}content/learn-more/our-mission.html">
                    Our Mission
                  </a>
                  <a class=${this.url == "${mainPageBaseUrl}content/learn-more/the-community.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}content/learn-more/the-community.html">
                    The Community
                  </a>
                  <a class=${this.url == "${mainPageBaseUrl}content/learn-more/annotated-research-context.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}content/learn-more/annotated-research-context.html">
                    Annotated Research Context
                  </a>
                  <a class=${this.url == "${mainPageBaseUrl}content/service.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}content/service.html">
                    Service
                  </a>
                  <a class=${this.url == "${mainPageBaseUrl}content/about.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}content/about.html">
                    The Consortium
                  </a>
                </div>
              </div>
            <a class=${this.url == "${mainPageBaseUrl}news.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}news.html">
              News
            </a>
            <a class=${this.url == "${mainPageBaseUrl}content/jobs.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}content/jobs.html">
              Jobs
            </a>
            <a class=${this.url == gitlabBaseUrl ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${gitlabBaseUrl}">
              DataHUB
            </a>
            <a class=${this.url.includes(knowledgeBaseUrl,0)  ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${knowledgeBaseUrl}index.html">
            Knowledge Base
            </a>
          </div>
          <div class="navbar-end">
            <a class="navbar-item" href="https://helpdesk.nfdi4plants.org/" title="Helpdesk">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 512 512" >
                <path fill="currentColor" d="M191.1 224c0-17.72-14.34-32.04-32-32.04L144 192c-35.34 0-64 28.66-64 64.08v47.79C80 339.3 108.7 368 144 368H160c17.66 0 32-14.36 32-32.06L191.1 224zM256 0C112.9 0 4.583 119.1 .0208 256L0 296C0 309.3 10.75 320 23.1 320S48 309.3 48 296V256c0-114.7 93.34-207.8 208-207.8C370.7 48.2 464 141.3 464 256v144c0 22.09-17.91 40-40 40h-110.7C305 425.7 289.7 416 272 416H241.8c-23.21 0-44.5 15.69-48.87 38.49C187 485.2 210.4 512 239.1 512H272c17.72 0 33.03-9.711 41.34-24H424c48.6 0 88-39.4 88-88V256C507.4 119.1 399.1 0 256 0zM368 368c35.34 0 64-28.7 64-64.13V256.1C432 220.7 403.3 192 368 192l-16 0c-17.66 0-32 14.34-32 32.04L320 335.9C320 353.7 334.3 368 352 368H368z"/>
              </svg>
            </a>
            <!-- http://www.email-obfuscator.com -->
            <a class="navbar-item" title="E-Mail" href="javascript:location='mailto:\u0069\u006e\u0066\u006f\u0040\u006e\u0066\u0064\u0069\u0034\u0070\u006c\u0061\u006e\u0074\u0073\u002e\u006f\u0072\u0067';void 0">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 512 512" >
                <path fill="currentColor" d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"/>
              </svg>
            </a>
            <p id="navbar-v-divide" class="navbar-item is-lightblue">
              |
            </p>
            <a class="navbar-item" href="https://twitter.com/nfdi4plants" title="Twitter">
              <!-- https://fontawesome.com/v6.0/docs/web/add-icons/svg-bare -->
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 512 512">
                <path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"/>
              </svg>
            </a>
            <a class="navbar-item" href="https://github.com/nfdi4plants" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 496 512">
                <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
              </svg>
            </a>
            <a class="navbar-item" href="https://www.youtube.com/channel/UCrTBwQWOa0-aWYkwoY104Wg" title="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 576 512">
                <path fill="currentColor" d="M549.7 124.1c-6.281-23.65-24.79-42.28-48.28-48.6C458.8 64 288 64 288 64S117.2 64 74.63 75.49c-23.5 6.322-42 24.95-48.28 48.6-11.41 42.87-11.41 132.3-11.41 132.3s0 89.44 11.41 132.3c6.281 23.65 24.79 41.5 48.28 47.82C117.2 448 288 448 288 448s170.8 0 213.4-11.49c23.5-6.321 42-24.17 48.28-47.82 11.41-42.87 11.41-132.3 11.41-132.3s0-89.44-11.41-132.3zm-317.5 213.5V175.2l142.7 81.21-142.7 81.2z"/>
              </svg>
            </a>
            <a class="navbar-item" href="https://zenodo.org/communities/nfdi4plants?page=1&amp;size=20" style="font-weight: bold;" title="Zenodo">
              Z
            </a>
          </div>
        </div>
      </nav>
      `
  }

  private _toggleNavbar() {
    this.navbarIsActive = !this.navbarIsActive
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nfdi-navbar': Navbar
  }
}