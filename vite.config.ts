import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const getBasePath = () => {
  const repository = process.env.GITHUB_REPOSITORY;
  if (!repository) {
    return "/";
  }

  const [, repoName] = repository.split("/");
  if (!repoName) {
    return "/";
  }

  // User/organization pages deploy from the domain root.
  if (repoName.endsWith(".github.io")) {
    return "/";
  }

  return `/${repoName}/`;
};

export default defineConfig({
  base: getBasePath(),
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
