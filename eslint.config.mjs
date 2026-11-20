import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Default ignores of eslint-config-next, plus local-only folders.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "originals/**"]),
]);

export default eslintConfig;
