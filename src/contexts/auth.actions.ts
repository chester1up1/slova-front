import { useMutation } from "@tanstack/react-query";

import { signoutRequset } from "./auth.api";

const useApiActions = () => {
  const signoutAction = useMutation({
    mutationFn: signoutRequset,
  });

  return { signoutAction };
};

export default useApiActions;
