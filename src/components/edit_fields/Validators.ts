export type ValidatorType = (input: string) => string | undefined;

export function emptyValidator(input: string): string | undefined {
  if (!input) {
    return "Input cannot be empty";
  }
}

export function passwordValidator(input: string): string | undefined {
  if (input.length < 8) {
    return "Password must be 8 symbols or more";
  }
}

export function emailValidator(input: string): string | undefined {
  const email = String(input);
  if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
    return "Plese enter valid email";
  }
}

export function nameValidator(input: string): string | undefined {
  if (input.length < 4) {
    return "Name must be 4 sign or more";
  }
}

export function createSamePasswordValidator(first_password: string) {
  return (password: string): string | undefined => {
    if (password != first_password) return "Passwords are different";
  };
}

export function createMaxLengthValidator(length: number) {
  return (input: string): string | undefined => {
    if (input.length > length)
      return `Text must be no more than ${length} characters`;
  };
}

export function positiveNumberValidator(input: string): string | undefined {
  if (!input.length) return;
  const num = Number(input);
  if (!num) {
    return "only numbers";
  }
  if (num < 0) {
    return "positive numbers";
  }
}
