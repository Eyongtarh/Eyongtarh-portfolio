import { act, fireEvent, render, screen } from "@testing-library/react";
import ConsentBanner from "../ConsentBanner";
import { getConsent, reopenConsent } from "../../../utils/analytics";

const gaScripts = () => document.head.querySelectorAll('script[src*="googletagmanager.com"]');

beforeEach(() => {
  localStorage.clear();
  document.head.innerHTML = "";
});

test("asks first and loads nothing from Google before consent", () => {
  render(<ConsentBanner />);
  expect(screen.getByRole("region", { name: "Cookie consent" })).toBeTruthy();
  expect(gaScripts()).toHaveLength(0);
  expect(window.dataLayer).toBeUndefined();
});

test("Decline is offered with the same prominence as Accept", () => {
  render(<ConsentBanner />);
  const decline = screen.getByRole("button", { name: "Decline" });
  const accept = screen.getByRole("button", { name: "Accept" });
  expect(decline.classList.contains("btn")).toBe(true);
  expect(accept.classList.contains("btn")).toBe(true);
});

test("declining stores the choice and still loads nothing", () => {
  render(<ConsentBanner />);
  fireEvent.click(screen.getByRole("button", { name: "Decline" }));

  expect(getConsent()).toBe("denied");
  expect(gaScripts()).toHaveLength(0);
  expect(screen.queryByRole("region", { name: "Cookie consent" })).toBeNull();
});

test("accepting loads Google Analytics once and hides the banner", () => {
  render(<ConsentBanner />);
  fireEvent.click(screen.getByRole("button", { name: "Accept" }));

  expect(getConsent()).toBe("granted");
  expect(gaScripts()).toHaveLength(1);
  expect(gaScripts()[0].src).toContain("id=G-TEST12345");
  expect(screen.queryByRole("region", { name: "Cookie consent" })).toBeNull();
});

test("a returning visitor who declined is not asked again", () => {
  localStorage.setItem("analytics-consent", "denied");
  render(<ConsentBanner />);
  expect(screen.queryByRole("region", { name: "Cookie consent" })).toBeNull();
});

test("Cookie settings reopens the banner and clears the stored choice", () => {
  localStorage.setItem("analytics-consent", "denied");
  render(<ConsentBanner />);

  act(() => reopenConsent());

  expect(getConsent()).toBeNull();
  expect(screen.getByRole("region", { name: "Cookie consent" })).toBeTruthy();
});
