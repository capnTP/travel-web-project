// @flow
interface RuleInterface {
  validate<T>(T): string;
}

export const requiredValidator = {
  validate<T>(value: T) {
    if (!value) {
      return 'Required';
    }
    return '';
  },
};

export const matchValidator = <T>(target: T) => ({
  validate(value: T) {
    if (value !== target) {
      return 'Password mismatch';
    }
    return '';
  },
});

export const emailValidator = {
  validate<T>(value: T) {
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(value),
    );

    if (!validEmail) {
      return 'Invalid email';
    }

    return '';
  },
};

export const validateField = <T>({
  rules,
  value,
}: {
  rules: RuleInterface[],
  value: T,
}): string[] =>
  rules.reduce((acc, rule) => {
    const error = rule.validate(value);
    if (error) {
      acc.push(error);
    }
    return acc;
  }, []);
