const { validateLogin, validateSignup } = require("./validators");

describe("Validator tests", () => {
  describe("validateLogin tests", () => {
    test("returns valid true and zero errors if email and password are not empty", () => {
      const user = {
        email: "user@user.com",
        password: "password"
      };
      const response = validateLogin(user);
      expect(response.valid).toBeTruthy();
      expect(Object.keys(response.error)).toHaveLength(0);
    });

    test("returns valid false and error when email is empty", () => {
      const user = {
        email: "",
        password: "password"
      };
      const response = validateLogin(user);
      expect(response.valid).toBeFalsy();
      expect(Object.keys(response.error)).toHaveLength(1);
      expect(response.error.email).toBe("Must not be empty.");
    });

    test("returns valid false and error when password is empty", () => {
      const user = {
        email: "user@user.com",
        password: ""
      };
      const response = validateLogin(user);
      expect(response.valid).toBeFalsy();
      expect(Object.keys(response.error)).toHaveLength(1);
      expect(response.error.password).toBe("Must not be empty");
    });
  });

  describe("validateSignup tests", () => {
    test("valid is true if signup details are valid", () => {
      let user = {
        email: "p@gmail.com",
        password: "12345678",
        confirmPassword: "12345678",
        handle: "12345678"
      };

      const response = validateSignup(user);
      const expected = {
        error: {},
        valid: true
      };
      expect(response.valid).toBeTruthy();
      expect(Object.keys(response.error).length).toBe(0);
      expect(response).toMatchObject(expected);
    });

    test("valid is false if email is empty", () => {
      let user = {
        email: "",
        password: "12345678",
        confirmPassword: "12345678",
        handle: "12345678"
      };

      const response = validateSignup(user);
      const expected = {
        error: { email: "Must not be empty" },
        valid: false
      };
      expect(response.valid).toBeFalsy();
      expect(response.error.email).toBe("Must not be empty");
      expect(Object.keys(response.error).length).toBe(1);
      expect(response).toMatchObject(expected);
    });

    test("valid is false if email is invalid", () => {
      let user = {
        email: "pallav",
        password: "12345678",
        confirmPassword: "12345678",
        handle: "12345678"
      };

      const response = validateSignup(user);
      const expected = {
        error: { email: "Email must be a valid string" },
        valid: false
      };
      expect(response.valid).toBeFalsy();
      expect(response.error.email).toBe("Email must be a valid string");
      expect(Object.keys(response.error).length).toBe(1);
      expect(response).toMatchObject(expected);
    });

    test("valid is false if password is empty", () => {
      let user = {
        email: "pallav@gmail.com",
        password: "",
        confirmPassword: "",
        handle: "12345678"
      };

      const response = validateSignup(user);
      const expected = {
        error: { password: "Must not be empty" },
        valid: false
      };
      expect(response.valid).toBeFalsy();
      expect(response.error.password).toBe("Must not be empty");
      expect(Object.keys(response.error).length).toBe(1);
      expect(response).toMatchObject(expected);
    });

    test("valid is false if confirm password is empty", () => {
      let user = {
        email: "pallav@gmail.com",
        password: "12345678",
        confirmPassword: "",
        handle: "12345678"
      };

      const response = validateSignup(user);
      const expected = {
        error: { confirmPassword: "Password must match" },
        valid: false
      };
      expect(response.valid).toBeFalsy();
      expect(response.error.confirmPassword).toBe("Password must match");
      expect(Object.keys(response.error).length).toBe(1);
      expect(response).toMatchObject(expected);
    });

    test("valid is false if confirm password and password don't match", () => {
      let user = {
        email: "pallav@gmail.com",
        password: "12345678",
        confirmPassword: "11111",
        handle: "12345678"
      };

      const response = validateSignup(user);
      const expected = {
        error: { confirmPassword: "Password must match" },
        valid: false
      };
      expect(response.valid).toBeFalsy();
      expect(response.error.confirmPassword).toBe("Password must match");
      expect(Object.keys(response.error).length).toBe(1);
      expect(response).toMatchObject(expected);
    });

    test("valid is false if handle is empty", () => {
      let user = {
        email: "p@gmail.com",
        password: "12345678",
        confirmPassword: "12345678",
        handle: ""
      };

      const response = validateSignup(user);
      const expected = {
        error: { handle: "Must not be empty" },
        valid: false
      };
      expect(response.valid).toBeFalsy();
      expect(response.error.handle).toBe("Must not be empty");
      expect(Object.keys(response.error).length).toBe(1);
      expect(response).toMatchObject(expected);
    });
  });
});
