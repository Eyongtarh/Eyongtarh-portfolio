jest.mock("@emailjs/browser", () => {
  class EmailJSResponseStatus {
    constructor(status, text) {
      this.status = status;
      this.text = text;
    }
  }
  return {
    __esModule: true,
    default: { init: jest.fn(), send: jest.fn() },
    EmailJSResponseStatus,
  };
});

import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { sendEmail, EmailError } from "../emailjs";

const valid = {
  name: "  Jane Smith ",
  email: "jane@example.com",
  subject: "Project enquiry",
  message: "I would like to discuss a Django project.",
};

beforeEach(() => emailjs.send.mockReset());

test("sends trimmed fields with reply_to set to the sender", async () => {
  emailjs.send.mockResolvedValue({ status: 200 });
  await sendEmail(valid);

  expect(emailjs.send).toHaveBeenCalledWith(
    "test-service",
    "test-template",
    expect.objectContaining({
      name: "Jane Smith",
      email: "jane@example.com",
      reply_to: "jane@example.com",
      title: "Project enquiry",
    })
  );
});

test("initialises EmailJS once with bot and rate protection", async () => {
  emailjs.send.mockResolvedValue({ status: 200 });
  await sendEmail(valid);
  await sendEmail(valid);

  expect(emailjs.init).toHaveBeenCalledTimes(1);
  expect(emailjs.init).toHaveBeenCalledWith(
    expect.objectContaining({
      publicKey: "test-key",
      blockHeadless: true,
      limitRate: expect.objectContaining({ id: "contact-form" }),
    })
  );
});

test("rejects oversized input without contacting EmailJS", async () => {
  await expect(sendEmail({ ...valid, message: "x".repeat(5001) })).rejects.toMatchObject({
    code: "invalid",
  });
  expect(emailjs.send).not.toHaveBeenCalled();
});

test("rejects blank fields", async () => {
  await expect(sendEmail({ ...valid, email: "   " })).rejects.toBeInstanceOf(EmailError);
});

test("maps a 429 response to rate_limited", async () => {
  emailjs.send.mockRejectedValue(new EmailJSResponseStatus(429, "Too Many Requests"));
  await expect(sendEmail(valid)).rejects.toMatchObject({ code: "rate_limited" });
});

test("maps other EmailJS responses to service", async () => {
  emailjs.send.mockRejectedValue(new EmailJSResponseStatus(451, "Unavailable For Headless Browser"));
  await expect(sendEmail(valid)).rejects.toMatchObject({ code: "service" });
});

test("maps unknown failures to network", async () => {
  emailjs.send.mockRejectedValue(new TypeError("Failed to fetch"));
  await expect(sendEmail(valid)).rejects.toMatchObject({ code: "network" });
});

test("times out a hung request", async () => {
  jest.useFakeTimers();
  emailjs.send.mockReturnValue(new Promise(() => {}));
  const pending = sendEmail(valid);
  jest.advanceTimersByTime(15_000);
  await expect(pending).rejects.toMatchObject({ code: "timeout" });
  jest.useRealTimers();
});
