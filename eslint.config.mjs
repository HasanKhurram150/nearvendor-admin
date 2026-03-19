import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		rules: {
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-expressions": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"react-hooks/set-state-in-effect": "off",
<<<<<<< HEAD
			"react-hooks/exhaustive-deps": "off",
			"react-hooks/preserve-manual-memoization": "off",
			"react-hooks/purity": "off",
=======
			"react-hooks/preserve-manual-memoization": "off",
			"react-hooks/purity": "off",
			"react-hooks/incompatible-library": "off",
>>>>>>> cd6db6d201663ba441afe964ace0d40db4c9275f
		},
	},
];

export default eslintConfig;
