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
        background-color: #003f8c;
        border-radius: 8px;
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
        margin-bottom: 16px;
        text-align: center;
        color: white;
      }

      .text-desc {
        font-size: 16px;
        margin-top: 8px;
        text-align: center;
        color: white;
      }

      .text-dates {
        font-size: 16px;
        margin-top: 8px;
        text-align: left;
        color: white;
      }

      .buttons {
        display: flex;
        gap: 20px; /* Horizontal space between items */
      }

      a.button {
        display: inline-block;       /* Make it behave like a block-level element for padding */
        padding: 5px 10px;          /* Add padding for button-like size */
        background-color: #007bff;   /* Button background color */
        color: white;                /* Text color */
        text-align: center;          /* Center the text inside the button */
        text-decoration: none;       /* Remove the default underline */
        border-radius: 5px;          /* Rounded corners */
        font-size: 16px;             /* Font size for the button */
      }

      a.button:hover {
        background-color: #0056b3;  /* Darken the background on hover */
      }

      a.button:active {
        background-color: #003f8c;  /* Darker background when the button is clicked */
      }
    `];
  }

  render() {
    return html`
    <div class = "card">
      <div class="text-title">${this.title}</div>
      <img class="image" src="${this.baseURL}/${this.logo}" alt=""/>

      <div class="buttons">
        <a class="button" href="${this.baseURL+this.slug}" target="_blank">Content</a>
        <a class="button" href="${this.pageSource}" target="_blank">Source</a>
      </div>

      <div class="text-desc">${this.description}</div>

      <div class="text-dates">
        <div>Created: ${this.created}</div>
        <div>Updated: ${this.updated}</div>
      </div>
    </div>
    `;
  }

  static get tag() {
    return "haxsite-card";
  }
}

customElements.define(HaxSiteCard.tag, HaxSiteCard);