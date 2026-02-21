/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: false }],
  },
};

module.exports = config;
