/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},


		borderColor: {
			'gray-500': '#718096',
		},
		borderStyle: {
			dotted: 'dotted',
			dashed: 'dashed',
		},
		screens: {
			sm: '500px',
		}
	},
	variants: {},
	plugins: [],
};
