import { act, render, screen } from "@testing-library/react";
import LoadingScreen, { FADE_MS } from "../LoadingScreen";

beforeEach(() => jest.useFakeTimers());
afterEach(() => {
  jest.useRealTimers();
  document.documentElement.classList.remove("is-loading");
});

test("shows while loading and locks page scrolling", () => {
  render(<LoadingScreen isLoading />);

  const status = screen.getByRole("status");
  expect(status.className).not.toContain("is-hidden");
  expect(status.getAttribute("aria-busy")).toBe("true");
  expect(screen.getByText("Loading the portfolio")).toBeTruthy();
  expect(document.documentElement.classList.contains("is-loading")).toBe(true);
});

test("fades out, unlocks scrolling, then removes itself from the DOM", () => {
  const { rerender } = render(<LoadingScreen isLoading />);
  rerender(<LoadingScreen isLoading={false} />);

  expect(screen.getByRole("status").className).toContain("is-hidden");
  expect(document.documentElement.classList.contains("is-loading")).toBe(false);

  act(() => {
    jest.advanceTimersByTime(FADE_MS + 10);
  });
  expect(screen.queryByRole("status")).toBeNull();
});

test("renders nothing when the page is already ready", () => {
  render(<LoadingScreen isLoading={false} />);
  expect(screen.queryByRole("status")).toBeNull();
});
