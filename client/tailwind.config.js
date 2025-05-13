/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', 'sans-serif'], // 기본 sans 대체
        noto: ['"Noto Sans KR"', 'sans-serif'],
        pretendard: ['"Pretendard"', 'sans-serif'], // Pretendard 예시
      },
    },
  },
  plugins: [],
};
