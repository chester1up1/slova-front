import { FC } from "react";

import { ModeToggle } from "@/components/theme/theme-switch";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InterfaceCardHeaderComponent {
  title: string;
  description: string;
}

export const CardHeaderComponent: FC<InterfaceCardHeaderComponent> = ({
  title,
  description,
}) => {
  return (
    <CardHeader>
      <div className="flex flex-row justify-between">
        <CardTitle>{title}</CardTitle>
        <ModeToggle />
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
};

export default CardHeaderComponent;
