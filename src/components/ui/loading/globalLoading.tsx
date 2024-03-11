import { Loader2 } from "lucide-react";
import { FC } from "react";

interface GlobalLoadingInterface {
  loading: boolean;
}

const GlobalLoading: FC<GlobalLoadingInterface> = ({ loading }) => {
  if (!loading) return <></>;

  return (
    <div className="w-[100vw] h-[100vh] bg-background fixed top-0 left-0 z-[1]">
      <h1>W8 a minute + w8 a second</h1>
      <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
    </div>
  );
};

export default GlobalLoading;
