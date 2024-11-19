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
    this.loading = false;
  }

  static get properties() {
    return {
      url: { type: String },
      data: { type : Object },
      items: { type: Array },
      loading: { type: Boolean, reflect: true }
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
      }

      #title {
        
      }

      #searchbar {
        display: flex;
        margin: 20px auto;
        padding: 5px 10px;
        width: 100%;
        max-width: 400px;
      }

      #searchbutton {
        
      }

      #input {
        font-size: 16px;
        width: 100%;
      }

      .results {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        padding: 16px;
        justify-items: center;
      }
    `];
  }

  search(e) {
    this.loading = true;
    this.url = this.shadowRoot.querySelector('#input').value;

    if (!this.url.startsWith("https://")) {
      this.url = "https://" + this.url + "/";
    }
    if (this.url.endsWith("site.json")) {
      this.url = this.url.replace("site.json", "");
    }

    fetch(`${this.url}site.json`) .then(d => d.ok ? d.json(): {}).then(data => {
      if (data.items) {
        this.items = [...data.items];
        this.data = null;
        this.data = data;
        this.loading = false;
      }})
      .catch(error =>{
        this.loading = false;
        this.items = [];
        this.data = null;
      });
  }

  enterKeyPress(e) {
    if (e.key === "Enter") {
      this.search();
    }
  }

  unixToUTC(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toUTCString();
  }

  render() {
    return html`
      <h2 class="title">Hax Site Search</h2>

      <div id="searchbar">
        <input id="input" placeholder="https://haxtheweb.org/site.json" @keyup="${this.enterKeyPress}"/>
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
            url="${this.url}"
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
                baseURL="${this.url}"
                pageSource="${this.url}${item.location}"
              ></haxsite-card>
            `;
          })}
        </div>
      `}
    `;
  }

  static get tag() {
    return 'haxsite-stat';
  }
}
customElements.define(HaxSiteStat.tag, HaxSiteStat);