jest.mock("../../../utils/emailjs", () => {
  const actual = jest.requireActual("../../../utils/emailjs");
  return { ...actual, sendEmail: jest.fn() };
});

import { act, fireEvent, render, screen } from "@testing-library/react";
import ContactForm from "../ContactForm";
import { validate, clean } from "../validation";
import { sendEmail, EmailError } from "../../../utils/emailjs";

const fill = (values) =>
  Object.entries(values).forEach(([id, value]) =>
    fireEvent.change(document.getElementById(id), { target: { value } })
  );

const valid = {
  name: "Jane Smith",
  email: "jane@example.com",
  subject: "Project enquiry",
  message: "I would like to discuss a Django project with you.",
};

beforeEach(() => {
  jest.useFakeTimers();
  sendEmail.mockReset();
});
afterEach(() => jest.useRealTimers());

describe("validate", () => {
  test("requires every field", () => {
    expect(Object.keys(validate(clean({ name: "", email: "", subject: "", message: "" })))).toEqual([
      "name",
      "email",
      "subject",
      "message",
    ]);
  });

  test("rejects malformed email and short messages", () => {
    const errors = validate(clean({ ...valid, email: "a@b.c", message: "Too short" }));
    expect(errors.email).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });

  test("strips control characters before validating", () => {
    expect(clean({ name: " Jane\u0000 " }).name).toBe("Jane");
  });
});

describe("ContactForm", () => {
  test("marks invalid fields and focuses the first one", () => {
    render(<ContactForm />);
    act(() => jest.advanceTimersByTime(3000));
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    const name = document.getElementById("name");
    expect(name.getAttribute("aria-invalid")).toBe("true");
    expect(name.getAttribute("aria-describedby")).toBe("name-error");
    expect(document.activeElement).toBe(name);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  test("sends cleaned values and shows a success message", async () => {
    sendEmail.mockResolvedValue({ status: 200 });
    render(<ContactForm />);
    act(() => jest.advanceTimersByTime(3000));
    fill({ ...valid, name: "  Jane Smith  " });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    });

    expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({ name: "Jane Smith" }));
    expect(screen.getByText(/your message has been sent/i)).toBeTruthy();
  });

  test("silently drops submissions that fill the honeypot", async () => {
    render(<ContactForm />);
    act(() => jest.advanceTimersByTime(3000));
    fill({ ...valid, website: "https://spam.example" });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    });

    expect(sendEmail).not.toHaveBeenCalled();
    expect(screen.getByText(/your message has been sent/i)).toBeTruthy();
  });

  test("explains rate limiting in plain words", async () => {
    sendEmail.mockRejectedValue(new EmailError("rate_limited", "429"));
    render(<ContactForm />);
    act(() => jest.advanceTimersByTime(3000));
    fill(valid);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    });

    expect(screen.getByText(/wait a moment/i)).toBeTruthy();
  });
});
