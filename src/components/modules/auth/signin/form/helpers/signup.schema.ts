import * as zod from "zod";

const SigninFormSchema = zod.object({
  email: zod.string().email({
    message: "Email issue",
  }),
  password: zod.string().min(6, {
    message: "Password min 6 length",
  }),
});

export default SigninFormSchema;
