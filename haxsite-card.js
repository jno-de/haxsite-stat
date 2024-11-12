import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class HaxSiteCard extends DDDSuper(LitElement) {
  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.created = '';
    this.lastUpdated = '';
    this.logo = '';
    this.slug = '';
    this.baseURL = '';
  }

  static get properties() {
    return {
        title: { type: String },
        description: { type: String },
        created: { type: String },
        lastUpdated: { type: String },
        logo: { type: String },
        slug: { type: String },
        baseURL: { type: String }
    };
  }

  static get styles() {
    return [super.styles, css`
      .card {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 320px;
          height: 512px;
          padding: 16px;
          border: 2px solid black;
          text-decoration: none;
      }

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
      }

      .image {
        display: flex;
        width: 100%;
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
      tabindex="0"
      href="${this.baseURL+'/'+this.slug}"
      target="_blank"
    >
      <div class="image">
        <img src="${this.baseURL}/${this.logo}" alt="${this.title}" />
      </div>
      <div class="text-title">${this.title}</div>
      <div class="text-desc">${this.created}</div>
      <div class="text-desc">${this.lastUpdated}</div>
      <div class="text-desc">${this.description}</div>
    </a>
    `;
  }

  static get tag() {
    return "haxsite-card";
  }
}

customElements.define(HaxSiteCard.tag, HaxSiteCard);