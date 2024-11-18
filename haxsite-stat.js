import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./haxsite-card.js";
import "./haxsite-details.js";

export class HaxSiteStat extends DDDSuper(LitElement) {
  constructor() {
    super();
    this.url = '';
    this.data = null;
    this.items = [];
  }

  static get properties() {
    return {
      url: { type: String },
      data: { type : Object },
      items: { type: Array },
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

  unixToUTC(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toUTCString();
  }

  search(e) {
    this.url = this.shadowRoot.querySelector('#input').value;
  }

  enter(e) {
    if (e.key === "Enter") {
      this.search();
    }
  }

  render() {
    return html`
      <div id="searchbar">
        <input id="input" placeholder="https://haxtheweb.org/site.json" @keyup="${this.enter}"/>
        <div id="searchbutton"><button @click="${this.search}">Analyze</button></div>
      </div>

      ${this.data === null ? html`` : html `
        <div class="results">
          <haxsite-details
            title=${this.data.title}
            created=${this.unixToUTC(parseInt(this.data.metadata.site.created))}
            updated=${this.unixToUTC(parseInt(this.data.metadata.site.updated))}
            description=${this.data.description}
            logo='${this.url}${this.data.metadata.site.logo}'
            hexCode=${this.data.metadata.theme.variables.hexCode}
            theme=${this.data.metadata.theme.name}
            icon=${this.data.metadata.theme.variables.icon}
            url=${this.url}
          ></haxsite-details>
        </div>

        <div class="results">
          ${this.items.map((item) => {
            return html`
              <haxsite-card
                title="${item.title}"
                created=${this.unixToUTC(parseInt(item.metadata.created))}
                updated=${this.unixToUTC(parseInt(item.metadata.updated))}
                description="${item.description}"
                logo="${item.metadata && item.metadata.files && item.metadata.files[0] ? item.metadata.files[0].url : ''}"
                slug="${item.slug}"
                baseURL="${this.url.replace("/site.json", '')}"
              ></haxsite-card>
            `;
          })}
        </div>
      `}
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('url')) {
      fetch(this.url).then(d => d.ok ? d.json(): {}).then(data => {
        if (data.items) {
          this.data = null;
          this.data = data;
          this.items = [];
          this.items = data.items;
        }
      });
    }
  }

  static get tag() {
    return 'haxsite-stat';
  }
}
customElements.define(HaxSiteStat.tag, HaxSiteStat);