const { validateLogin } = require("./validators");

describe("Validator tests", () => {

    describe("validateLogin tests", () => {

        test("returns valid true and zero errors if email and password are not empty", () => {
            const user = {
                email: "user@user.com",
                password: "password"
            };
            const response = validateLogin(user)
            expect(response.valid).toBeTruthy();
            expect(Object.keys(response.error)).toHaveLength(0);
        })

        test("returns valid false and error when email is empty", () => {
            const user = {
                email: "",
                password: "password"
            };
            const response = validateLogin(user);
            expect(response.valid).toBeFalsy();
            expect(Object.keys(response.error)).toHaveLength(1);
            expect(response.error.email).toBe("Must not be empty.");
        })

        test("returns valid false and error when password is empty", () => {
            const user = {
                email: "user@user.com",
                password: ""
            };
            const response = validateLogin(user);
            expect(response.valid).toBeFalsy();
            expect(Object.keys(response.error)).toHaveLength(1);
            expect(response.error.password).toBe("Must not be empty");
        })

    });

    describe("validateSignup tests", () => {

        test("valid is true if signup details are valid", () => { });

        test("valid is false if email is empty", () => { });

        test("valid is false if email is invalid", () => { });

        test("valid is false if password is empty", () => { });

        test("valid is false if confirm password is empty", () => { });

        test("valid is false if confirm password and password don't match", () => { });

        test("valid is false if handle is empty", () => { });
    });

})
