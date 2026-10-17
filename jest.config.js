export default {
  testEnvironment: "jsdom",
  transform: { "^.+\\.[jt]sx?$": "babel-jest" },
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.js"],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "\\.(png|jpe?g|webp|avif|gif|svg|mp4|webm)$": "<rootDir>/test/fileMock.js",
    "^(.*)/config/env$": "<rootDir>/test/envMock.js",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
