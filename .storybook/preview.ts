import '!style-loader!css-loader!../src/assets/styles/theme.css';
import '!style-loader!css-loader!../src/assets/styles/main.css';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}