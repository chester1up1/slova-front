import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomeComponent = () => {
  return (
    <div className="p-6  pt-[128px] flex flex-row justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Fast game</CardTitle>
          <CardDescription>Start your new game in one-click.</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-between">
          <Button>{`Let's go!`}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HomeComponent;
