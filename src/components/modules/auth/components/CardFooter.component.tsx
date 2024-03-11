import { useRouter } from "next/navigation";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import RoutePath from "@/routes";

interface InterfaceCardFooterComponent {
  loading: boolean;
  buttonTitle: string;
  subText: string;
  pushTo: RoutePath;
}

export const CardFooterComponent: FC<InterfaceCardFooterComponent> = ({
  loading,
  buttonTitle,
  subText,
  pushTo,
}) => {
  const router = useRouter();
  return (
    <CardFooter className="p-3 flex flex-col">
      <Button
        size="lg"
        width="bold"
        className="w-full"
        type="submit"
        loading={`${loading}`}
      >
        {buttonTitle}
      </Button>
      <Button
        variant="outline"
        className="mt-[16px]"
        onClick={() => router.push(pushTo)}
        type="button"
      >
        {subText}
      </Button>
    </CardFooter>
  );
};

export default CardFooterComponent;
