import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class HaxSiteCard extends DDDSuper(LitElement) {
  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.created = '';
    this.updated = '';
    this.logo = '';
    this.readTime = '';
    this.slug = '';
    this.baseURL = '';
    this.pageSource = '';
  }

  static get properties() {
    return {
        title: { type: String },
        description: { type: String },
        created: { type: String },
        updated: { type: String },
        logo: { type: String },
        readTime: { type: String},
        slug: { type: String },
        baseURL: { type: String },
        pageSource: { type: String }
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
        border: var(--ddd-border-sm);
        border-radius: 12px;
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
        font-family: var(--ddd-font-primary);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-primary);
        margin-bottom: 16px;
        text-align: center;
      }

      .text-desc {
        font-size: 16px;
        font-family: var(--ddd-font-primary);
        color: var(--ddd-theme-primary);
        margin-top: 8px;
        text-align: center;
      }

      .text-dates {
        font-size: 16px;
        font-family: var(--ddd-font-primary);
        color: var(--ddd-theme-primary);
        margin-top: 8px;
        text-align: left;
      }

      .buttons {
        display: flex;
        gap: 20px;
      }

      a.button {
        display: inline-block;
        padding: 5px 10px;
        background-image: var(--ddd-theme-default-gradient-buttons);
        color: var(--ddd-theme-default-slateMaxLight);
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px; 
      }
    `];
  }

  render() {
    return html`
    <div class = "card">
      <div class="text-title">${this.title}</div>

      <a href=${this.baseURL}${this.logo} ?hidden="${this.logo === ''}">
        <img class="image" src="${this.baseURL}${this.logo}" alt=""/>
      </a>

      <div class="buttons">
        <a class="button" href="${this.baseURL+this.slug}" target="_blank">Content</a>
        <a class="button" href="${this.pageSource}" target="_blank">Source</a>
      </div>

      <div class="text-desc">${this.description}</div>

      <div class="text-dates">
        <div>Created: ${this.created}</div>
        <div>Updated: ${this.updated}</div>
        <div>Read Time: ${this.readTime} minutes</div>
      </div>
    </div>
    `;
  }

  static get tag() {
    return "haxsite-card";
  }
}

customElements.define(HaxSiteCard.tag, HaxSiteCard);