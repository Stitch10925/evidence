import { config as evidenceTailwind } from '@evidence-dev/tailwind/config';

/** @type {import("tailwindcss").Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	presets: [evidenceTailwind],

	plugins: []
};

export default config;
