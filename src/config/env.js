// The only file that reads import.meta.env. Everything else imports `config`,
// which keeps Vite syntax out of components and lets Jest mock this one module.
const env = import.meta.env;

export const config = Object.freeze({
  isDev: Boolean(env.DEV),
  maintenance: env.VITE_MAINTENANCE === "true",
  cloudinaryCloud: env.VITE_CLOUDINARY_CLOUD_NAME ?? "",
  gaId: env.VITE_GA_ID ?? "",
  emailjs: Object.freeze({
    serviceId: env.VITE_EMAILJS_SERVICE_ID ?? "",
    templateId: env.VITE_EMAILJS_TEMPLATE_ID ?? "",
    publicKey: env.VITE_EMAILJS_PUBLIC_KEY ?? "",
  }),
});
