/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = { 
  images: {
    domains: ["via.placeholder.com", "i.scdn.co"], // Add i.scdn.co here
  },
};

export default config;
