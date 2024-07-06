import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"tier-100": "#ac0",
				"tier-200": "#0ba",
				"tier-300": "#0891b2",
				"tier-400": "#16d",
				"tier-500": "#c05",
			},
		},
	},
};

export default config;
