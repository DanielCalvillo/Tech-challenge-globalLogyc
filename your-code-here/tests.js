// Test Runner: https://mochajs.org
// DOM helpers: https://testing-library.com/docs/intro
// Assertions: https://unexpected.js.org/assertions/any/to-be/

const { expect } = weknowhow;
const { getByText } = TestingLibraryDom;

beforeEach(function () {
  this.app = document.querySelector("#user-app");
});

it("Shows the first, middle and last movies on the app", function () {
  getByText(this.app, "2001: A Space Odyssey");
  getByText(this.app, "Inception");
  getByText(this.app, "The Martian");
});

