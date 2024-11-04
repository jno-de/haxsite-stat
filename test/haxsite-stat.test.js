import { html, fixture, expect } from '@open-wc/testing';
import "../haxsite-stat.js";

describe("HaxsiteStat test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <haxsite-stat
        title="title"
      ></haxsite-stat>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
