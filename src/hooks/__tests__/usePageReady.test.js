import { act, renderHook } from "@testing-library/react";
import usePageReady from "../usePageReady";

const setReadyState = (value) =>
  Object.defineProperty(document, "readyState", { value, configurable: true });

beforeEach(() => jest.useFakeTimers());
afterEach(() => {
  jest.useRealTimers();
  setReadyState("complete");
});

test("waits for the minimum duration before reporting ready", async () => {
  setReadyState("complete");
  const { result } = renderHook(() => usePageReady({ minDuration: 600, maxDuration: 4000 }));

  expect(result.current).toBe(false);
  await act(async () => {
    jest.advanceTimersByTime(599);
  });
  expect(result.current).toBe(false);

  await act(async () => {
    jest.advanceTimersByTime(1);
  });
  expect(result.current).toBe(true);
});

test("gives up at the maximum duration if the page never finishes loading", async () => {
  setReadyState("loading");
  const { result } = renderHook(() => usePageReady({ minDuration: 600, maxDuration: 4000 }));

  await act(async () => {
    jest.advanceTimersByTime(3999);
  });
  expect(result.current).toBe(false);

  await act(async () => {
    jest.advanceTimersByTime(1);
  });
  expect(result.current).toBe(true);
});

test("becomes ready as soon as the load event fires after the minimum", async () => {
  setReadyState("loading");
  const { result } = renderHook(() => usePageReady({ minDuration: 600, maxDuration: 4000 }));

  await act(async () => {
    jest.advanceTimersByTime(1000);
  });
  expect(result.current).toBe(false);

  await act(async () => {
    window.dispatchEvent(new Event("load"));
  });
  expect(result.current).toBe(true);
});
