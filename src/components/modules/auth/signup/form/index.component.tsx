"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import RoutePath from "@/routes";

import CardContentComponent from "../../components/CardContent.component";
import CardFooterComponent from "../../components/CardFooter.component";
import CardHeaderComponent from "../../components/CardHeader.component";
import { signupAction } from "./api/api.actions";
import SignupFormSchema from "./helpers/signup.schema";

export default function SignInFormComponent() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: signupAction,
    onError: (error) => {
      toast({
        title: "Sign Up Issue",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: ({ userId }) => {
      // queryClient.setQueryData(["userId"], userId);
      router.push(`${RoutePath.Verification}?userId=${userId}`);
    },
  });

  const form = useForm<FormType>({
    resolver: zodResolver(SignupFormSchema),
  });

  function onSubmit(data: FormType) {
    mutate({
      email: data.email,
      username: data.username,
      password: data.password.password,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-[456px] relative">
          <CardHeaderComponent
            {...{
              title: "👾 Get Your Account Now!",
              description: "Enter your email below to create your account.",
            }}
          />
          <Separator />
          <CardContentComponent<FormType> {...{ fields, form }} />
          <Separator />
          <CardFooterComponent
            {...{
              loading: isPending,
              buttonTitle: "Sign Up",
              subText: "Already a Member? Sign In 💜",
              pushTo: RoutePath.Signin,
            }}
          />
        </Card>
      </form>
    </Form>
  );
}

type FormType = zod.infer<typeof SignupFormSchema>;

const fields = [
  {
    name: "email",
    label: "Email",
    placeholder: "email@",
    type: "email",
  },
  {
    name: "username",
    label: "User Name",
    placeholder: "player",
    type: "text",
  },
  {
    name: "password.password",
    label: "Password",
    placeholder: "qwe123",
    type: "password",
  },
  {
    name: "password.confirm",
    label: "Confirm Password",
    placeholder: "qwe123",
    type: "password",
  },
];
