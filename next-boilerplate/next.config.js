/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "next-boilerplate";
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? `/${repoName}` : "",
  images: {
    loader: "custom",
    loaderFile: "./src/containers/imgLoaderContainer.js",
  },
  env: {
    IS_GITHUB_PAGE: isGithubPages ? "true" : "false",
    THEME_FOLDER: repoName,
  },
};

module.exports = nextConfig;
