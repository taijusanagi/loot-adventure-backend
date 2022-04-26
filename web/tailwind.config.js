module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        move: {
          '15%': {
            transform: 'translateY(0.15rem)',
          },
          '50%': {
            transform: 'translateY(-0.35rem)',
          },
          '100%': {
            transform: 'translateY(0rem)',
          },
        },
      },
      animation: {
        move: 'move 1s forwards',
      },
    },
  },
  plugins: [],
};
