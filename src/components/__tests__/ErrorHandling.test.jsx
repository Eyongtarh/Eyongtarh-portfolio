import { fireEvent, render, screen } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";
import SectionError from "../SectionError/SectionError";
import { isSafeHref } from "../../utils/urls";
import { isChunkError } from "../../utils/errors";

function Boom({ message }) {
  throw new Error(message);
}

let consoleSpy;
beforeEach(() => {
  // React logs caught errors; keep test output readable.
  consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => consoleSpy.mockRestore());

test("shows the section fallback with a retry for ordinary errors", () => {
  render(
    <ErrorBoundary fallback={SectionError}>
      <Boom message="render failed" />
    </ErrorBoundary>
  );
  expect(screen.getByRole("alert").textContent).toMatch(/could not be displayed/i);
  expect(screen.getByRole("button", { name: "Try again" })).toBeTruthy();
});

test("offers a reload when a lazy chunk fails to download", () => {
  render(
    <ErrorBoundary fallback={SectionError}>
      <Boom message="Failed to fetch dynamically imported module: /assets/Projects.js" />
    </ErrorBoundary>
  );
  expect(screen.getByRole("button", { name: "Reload page" })).toBeTruthy();
});

test("shows the full page error when no fallback is given", () => {
  render(
    <ErrorBoundary>
      <Boom message="render failed" />
    </ErrorBoundary>
  );
  expect(screen.getByRole("heading", { level: 1, name: "Something went wrong" })).toBeTruthy();
  expect(document.title).toMatch(/Something went wrong/);
  expect(document.querySelector('meta[name="robots"][content="noindex"]')).toBeTruthy();
});

test("Try again resets the boundary", () => {
  let fail = true;
  function Flaky() {
    if (fail) throw new Error("first render fails");
    return <p>Recovered</p>;
  }
  render(
    <ErrorBoundary fallback={SectionError}>
      <Flaky />
    </ErrorBoundary>
  );
  fail = false;
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(screen.getByText("Recovered")).toBeTruthy();
});

test.each([
  ["/", true],
  ["/#contact", true],
  ["https://www.linkedin.com/in/example", true],
  ["mailto:someone@example.com", true],
  ["javascript:alert(1)", false],
  ["//evil.example", false],
  ["data:text/html,hi", false],
  ["", false],
])("isSafeHref(%p) is %p", (href, expected) => {
  expect(isSafeHref(href)).toBe(expected);
});

test("recognises chunk errors from different browsers", () => {
  expect(isChunkError(new Error("Failed to fetch dynamically imported module: x"))).toBe(true);
  expect(isChunkError(new TypeError("Importing a module script failed."))).toBe(true);
  expect(isChunkError(new Error("Cannot read properties of undefined"))).toBe(false);
  expect(isChunkError(null)).toBe(false);
});
