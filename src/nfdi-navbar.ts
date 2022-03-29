import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { bulmaStyles } from './bulma-css'
import {mainPageBaseUrl, gitlabBaseUrl} from './params'

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
        z-index: 30
      }

      .icon {
        width: 1em;
        height: 1em;
        vertical-align: -.125em;
    }`
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
      <nav class="navbar is-fixed-top has-bg-darkblue">
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
        <div id="navMenu" class=${this.navbarIsActive ? 'navbar-menu has-bg-darkblue is-active' : 'navbar-menu has-bg-darkblue'}>
          <div class="navbar-start is-justify-content-center is-flex-grow-1">
            <a class=${this.url == mainPageBaseUrl ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}">
              Home
            </a>
            <a class=${this.url == "${mainPageBaseUrl}/news.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}/news.html">
              News
            </a>
            <a class=${this.url == "${mainPageBaseUrl}/content/service.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}/content/service.html">
              Service
            </a>
            <a class=${this.url == "${mainPageBaseUrl}/content/about.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}/content/about.html">
              About
            </a>
            <a class=${this.url == "${mainPageBaseUrl}/content/jobs.html" ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${mainPageBaseUrl}/content/jobs.html">
              Jobs
            </a>
            <a class=${this.url == gitlabBaseUrl ? "navbar-item is-active smooth-hover" : "navbar-item"} href="${gitlabBaseUrl}">
              DataHUB
            </a>
          </div>
          <div class="navbar-end">
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
            <a class="navbar-item" href="mailto:dataplant@uni-kl.de" title="Email">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 512 512" >
                <path fill="currentColor" d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"/>
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
    // this.requestUpdate()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nfdi-navbar': Navbar
  }
}