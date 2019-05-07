export default {
  getValidator: () => ({
    test(formData = {}) {
      const result = Object.keys(formData).reduce((mainAcc, x) => {
        const field = formData[x];
        const { rules = [], value } = field;

        if (!rules) {
          return mainAcc;
        }

        const errors = rules.reduce((acc, rule) => {
          const error = rule.test(value);

          if (error) {
            acc.push(error);
          }

          return acc;
        }, []);

        if (errors.length > 0) {
          mainAcc.push({
            key: x,
            errors,
          });
        }

        return mainAcc;
      }, []);

      return result;
    },
  }),
};
