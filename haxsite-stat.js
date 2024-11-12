import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./haxsite-card.js";

export class HaxSiteStat extends DDDSuper(LitElement) {
  constructor() {
    super();
    this.url = '';
    this.items = [];
  }

  static get properties() {
    return {
      url: { type: String },
      items: { type: Array, },
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
      }

      #searchbar {
        display: flex;
        margin: 20px auto;
        padding: 5px 10px;
        width: 100%;
        max-width: 400px;
      }

      #input {
        font-size: 16px;
        width: 100%;
      }

      .results {
        height: 100%;
      }
    `];
  }

  search(e) {
    this.url = this.shadowRoot.querySelector('#input').value;
  }

  render() {
    return html`
      <div id="searchbar">
        <input id="input" placeholder="https://haxtheweb.org/site.json" />
        <div id="searchbutton"><button @click="${this.search}">Analyze</button></div>
      </div>
      <div class="results">
        ${this.items.map((item) => {
          return html`
            <haxsite-card
              title="${item.title}"
              created="${item.created}"
              updated="${item.updated}"
              description="${item.description}"
              logo="${item.metadata && item.metadata.files && item.metadata.files[0] ? item.metadata.files[0].url : ''}"
              slug="${item.slug}"
              baseURL="${this.url.replace("/site.json", '')}"
            ></haxsite-card>
          `;
        })}
      </div>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('url')) {
      if (!this.url) { // If search bar is empty, clear the results
        this.items = [];
      } else {
        fetch(this.url).then(d => d.ok ? d.json(): {}).then(data => {
          this.items = data.items;
        });
      }
    }
  }

  static get tag() {
    return 'haxsite-stat';
  }
}
customElements.define(HaxSiteStat.tag, HaxSiteStat);