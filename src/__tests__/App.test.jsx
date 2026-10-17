// Smoke test: the whole page renders, the loading screen hands over to the
// content, and the lazy sections arrive.
import { act, render, screen } from "@testing-library/react";
import App from "../App";
import { FADE_MS } from "../components/LoadingScreen/LoadingScreen";

let consoleSpy;
beforeEach(() => {
  jest.useFakeTimers();
  consoleSpy = jest.spyOn(console, "error");
});
afterEach(() => {
  jest.useRealTimers();
  expect(consoleSpy).not.toHaveBeenCalled();
  consoleSpy.mockRestore();
});

test("shows the loader first, then reveals the page and lazy sections", async () => {
  render(<App />);

  // Loader is visible and the page cannot scroll underneath it.
  expect(screen.getByText("Loading the portfolio")).toBeTruthy();
  expect(document.documentElement.classList.contains("is-loading")).toBe(true);

  // Page becomes ready after the minimum display time, then the loader fades and unmounts.
  await act(async () => {
    jest.advanceTimersByTime(600);
  });
  await act(async () => {
    jest.advanceTimersByTime(FADE_MS + 10);
  });
  expect(screen.queryByText("Loading the portfolio")).toBeNull();
  expect(document.documentElement.classList.contains("is-loading")).toBe(false);

  // One main landmark, one top heading, with a readable name.
  expect(screen.getAllByRole("main")).toHaveLength(1);
  const h1s = screen.getAllByRole("heading", { level: 1 });
  expect(h1s).toHaveLength(1);
  expect(h1s[0].textContent).toBe("Eyongtarh Besong");

  // Eager sections.
  for (const name of ["About Me", "Skills and Technologies", "Professional Experience", "Education", "Interests"]) {
    expect(screen.getByRole("heading", { level: 2, name })).toBeTruthy();
  }

  // Lazy sections arrive.
  expect(await screen.findByRole("heading", { level: 2, name: "Featured Projects" })).toBeTruthy();
  expect(await screen.findByRole("heading", { level: 2, name: "Let's Work Together" })).toBeTruthy();
  expect(screen.getByRole("form", { name: "Contact form" })).toBeTruthy();
});
