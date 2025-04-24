// import bcrypt from "bcryptjs";
import validator from "validator";

// Utility function for validating a name
export function isValidName(name: string): Promise<string> {
  const nameRegex = /^[a-zA-Z\s\-'\.,]*$/;

  if (nameRegex.test(name)) {
    const wordCount = name.trim().split(/\s+/).length;
    if (wordCount >= 2) {
      return Promise.resolve(name);
    } else {
      return Promise.reject(
        "Name is valid but not a full name. Please provide both first and last names."
      );
    }
  } else {
    const invalidChars = [...name].filter((char) => !nameRegex.test(char));
    const correctedName = [...name]
      .filter((char) => nameRegex.test(char))
      .join("");
    if (correctedName) {
      return Promise.reject(
        `Name contains disallowed characters [${invalidChars.join(
          ""
        )}]. Suggested name: '${correctedName}'.`
      );
    } else {
      return Promise.reject(
        `Name contains disallowed characters [${invalidChars.join(
          ""
        )}]. Please try another name.`
      );
    }
  }
}

// Generate a random username based on the name
export function generateUsername(name: string): string {
  const words = name.toLowerCase().split(/\s+/);
  const possibleUsernames: string[] = [];

  // Generate permutations of the name
  words.forEach((word, index) => {
    const others = [...words.slice(0, index), ...words.slice(index + 1)];
    possibleUsernames.push(word + "_" + others.join("_"));
  });

  const randomSuffix = Math.floor(Math.random() * 100);
  return `${
    possibleUsernames[Math.floor(Math.random() * possibleUsernames.length)]
  }_${randomSuffix}`;
}

// Validate a username
export function isValidUsername(username: string): Promise<string> {
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;

  if (usernameRegex.test(username)) {
    return Promise.resolve(username);
  } else {
    const invalidChars = [...username].filter(
      (char) => !usernameRegex.test(char)
    );
    const correctedUsername = [...username]
      .filter((char) => usernameRegex.test(char))
      .join("");
    if (correctedUsername) {
      return Promise.reject(
        `Invalid username: contains disallowed characters [${invalidChars.join(
          ""
        )}]. Suggested username: '${correctedUsername}'.`
      );
    } else {
      return Promise.reject(
        `Invalid username: contains disallowed characters [${invalidChars.join(
          ""
        )}]. Please try another name.`
      );
    }
  }
}

// Validate an ISO datetime string
export function validateDatetime(input: string): Promise<void> {
  const datetimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;

  if (datetimeRegex.test(input)) {
    return Promise.resolve();
  } else {
    let errorMessage = "";

    if (!/^\d{4}-\d{2}-\d{2}/.test(input)) {
      errorMessage +=
        "Invalid date format. Expected YYYY-MM-DD (e.g., 2024-11-15).\n";
    }

    if (!/T\d{2}:\d{2}:\d{2}/.test(input)) {
      errorMessage +=
        "Invalid time format. Expected HH:MM:SS (e.g., 12:08:14).\n";
    }

    if (!input.endsWith("Z")) {
      errorMessage +=
        "The string must end with 'Z' to indicate UTC timezone.\n";
    }

    errorMessage +=
      "Correct format: YYYY-MM-DDTHH:MM:SS.sssZ (e.g., 2024-11-15T12:08:14.128Z)";
    return Promise.reject(errorMessage);
  }
}

// Validate an email address
export function isValidEmail(email: string): Promise<string> {
  if (validator.isEmail(email)) {
    return Promise.resolve(email);
  } else {
    return Promise.reject(
      "Invalid email address. Please provide a valid email."
    );
  }
}

// Generate a random 5-character alphanumeric code
export function generateCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length: 5 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

// Check if a string matches an ISO datetime format
export function isDateString(date: string): boolean {
  const datetimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  return datetimeRegex.test(date);
}

export function toLowerCase(str : string) {
  return str.toLowerCase();
}
