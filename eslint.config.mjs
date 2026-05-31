import next from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...next,
  ...nextTs,
  {
    ignores: [".next/**", "node_modules/**", "scripts/**"],
  },
];

export default eslintConfig;
