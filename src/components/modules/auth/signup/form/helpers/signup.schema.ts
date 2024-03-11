import * as zod from "zod";

const SignupFormSchema = zod.object({
  email: zod.string().email({
    message: "Email issue",
  }),
  username: zod.string().min(4, {
    message: "Username issue",
  }),
  password: zod
    .object({
      password: zod
        .string()
        .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
        .regex(new RegExp(".*[a-z].*"), "One lowercase character")
        .regex(new RegExp(".*\\d.*"), "One number")
        .min(6, {
          message: "Password min 6 length",
        }),
      confirm: zod.string().min(6, {
        message: "Password min 6 length",
      }),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirm"], // path of error
    }),
});

export default SignupFormSchema;
