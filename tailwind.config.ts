const config: import('tailwindcss').Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // Next.js 13+
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;
