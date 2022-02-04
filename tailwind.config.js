module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    container: {
      center: true
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
