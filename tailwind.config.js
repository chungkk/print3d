/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes: {
      scaleUp: {
        '0%': { transform: 'scaleX(0.9)' }, // Tăng kích thước từ 0.5 theo chiều ngang
        '100%': { transform: 'scaleX(1)' }, // Đạt kích thước hiện tại
      },
    },
    animation: {
      scaleUp: 'scaleUp 0.5s ease-out', // Bạn có thể điều chỉnh thời gian và hiệu ứng easing theo ý muốn
    },
  },
  plugins: [],
};
