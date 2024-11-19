import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

import '@haxtheweb/hax-iconset/hax-iconset.js';
import '@haxtheweb/simple-icon/simple-icon.js';

export class HaxSiteDetails extends DDDSuper(LitElement) {
  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.created = '';
    this.updated = '';
    this.hexCode = '';
    this.theme = '';
    this.logo = '';
    this.url = '';
  }

  static get properties() {
    return {
        title: { type: String },
        description: { type: String },
        created: { type: String },
        updated: { type: String },
        hexCode: { type: String },
        theme: { type: String },
        logo: { type: String },
        url: { type: String }
    };
  }

  static get styles() {
    return [super.styles, css`
      .card {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 640px;
          height: 320px;
          padding: 16px;
          border: 2px solid black;
          text-decoration: none;
      }

      .image {
        display: flex;
        width: 100%;
        height: auto;
        object-fit:cover;
        border-radius: 8px;
        aspect-ratio: 1.618;
        overflow: hidden;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
      }

      .text-title {
        font-size: 24px;
        text-align: center;
      }

      .text-desc {
        font-size: 16px;
        margin-top: 8px;
        text-align: center;
      }
    `];
  }

  render() {
    return html`
    <a
      class="card"
      href="${this.url}"
      target="_blank"
    >
        <img class="image" src="${this.logo}" alt=""/>

        <div class="details">
            <div class="text-title">${this.title}</div>
            <div class="text-desc">Description: ${this.description}</div>
            
            <div class="text-desc">Created: ${this.created}</div>
            <div class="text-desc">Updated: ${this.updated}</div>
            
            <div class="text-desc">Theme: ${this.theme}</div>
            <div class="text-desc">HexCode: ${this.hexCode}</div>
        </div>
    </a>
    `;
  }

  static get tag() {
    return "haxsite-details";
  }
}

customElements.define(HaxSiteDetails.tag, HaxSiteDetails);