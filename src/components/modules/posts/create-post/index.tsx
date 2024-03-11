import React, { FC } from "react";

import { CreatePostInterface } from "../../header/CreatePost.sheet";
import CreatePostFormComponent from "./form/index.component";

const CreatePostDialog: FC<Pick<CreatePostInterface, "setOpen">> = ({
  setOpen,
}) => {
  return <CreatePostFormComponent setOpen={setOpen} />;
};

export default CreatePostDialog;
