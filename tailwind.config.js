/** @type {import('tailwindcss').Config} */
const {addDynamicIconSelectors} = require('@iconify/tailwind')
export default {
    // 标记并写入模板路径
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [addDynamicIconSelectors()],
}

