module.exports = {
  extends: "stylelint-config-standard",
  plugins: ["stylelint-order"],
  rules: {
    indentation: 2,
    "no-descending-specificity": null,
    "order/order": ["custom-properties", "declarations"],
    "order/properties-alphabetical-order": true,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["local", "global"]
      }
    ]
  }
};
