const assert = require("chai").assert;
const giphy = require("../../../src/extra/giphy");

xdescribe("GIPHY API", function () {
  describe("GIF Welcome URL", function () {
    it("Check if URL is string", async function () {
      let gif_url = await giphy.gifMessage("welcome", "pg-13");
      assert.typeOf(gif_url, "string", "URL is string");
    });
  });
});
