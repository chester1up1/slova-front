import * as zod from "zod";

const PostFormSchema = zod.object({
  link: zod.string(),
  description: zod.string().optional(),
});

export default PostFormSchema;
