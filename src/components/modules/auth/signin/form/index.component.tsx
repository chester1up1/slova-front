"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth.context";
import RoutePath from "@/routes";

import CardContentComponent from "../../components/CardContent.component";
import CardFooterComponent from "../../components/CardFooter.component";
import CardHeaderComponent from "../../components/CardHeader.component";
import { signinAction } from "./api/api.actions";
import SigninFormSchema from "./helpers/signup.schema";

export default function SignInFormComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { login } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: signinAction,
    onError: (error) => {
      toast({
        title: "Sign In Issue",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: ({ access_token }) => {
      setIsLoading(true);
      login(access_token)
        .then(() => router.push(RoutePath.Home))
        .catch(() => setIsLoading(false));
    },
  });

  const form = useForm<FormType>({
    resolver: zodResolver(SigninFormSchema),
  });

  function onSubmit(data: FormType) {
    const { email, password } = data;
    if (email && password) {
      mutate({ email, password });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-[456px] relative">
          <CardHeaderComponent
            {...{
              title: "👾 Log In to Your Account!",
              description:
                "Welcome back! Log in to continue your journey with us.",
            }}
          />
          <Separator />
          <CardContentComponent<FormType> {...{ fields, form }} />
          <Separator />
          <CardFooterComponent
            {...{
              loading: isPending || isLoading,
              buttonTitle: "Sign In",
              subText: "New here? Create an account to get started 💜",
              pushTo: RoutePath.Signup,
            }}
          />
        </Card>
      </form>
    </Form>
  );
}

type FormType = zod.infer<typeof SigninFormSchema>;

const fields = [
  {
    name: "email",
    label: "Email",
    placeholder: "email@",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "qwe123",
    type: "password",
  },
];
