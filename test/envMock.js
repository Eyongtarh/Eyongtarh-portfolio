// Stand in for src/config/env.js, which uses Vite only syntax that Jest can't parse.
export const config = {
  isDev: false,
  maintenance: false,
  cloudinaryCloud: "",
  gaId: "G-TEST12345",
  emailjs: { serviceId: "test-service", templateId: "test-template", publicKey: "test-key" },
};
