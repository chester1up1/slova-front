import { Path, UseFormReturn } from "react-hook-form";

import { CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CardContentComponentInterface<T> {
  fields: {
    name: string;
    label: string;
    placeholder: string;
    type: React.HTMLInputTypeAttribute;
  }[];
  form: UseFormReturn<T, any, undefined>;
}

export const CardContentComponent = <T,>({
  fields,
  form,
}: CardContentComponentInterface<T>) => {
  return (
    <CardContent className="p-[32px] gap-[16px] flex flex-col">
      {fields.map((item) => (
        <FormField
          key={item.name}
          control={form.control}
          name={item.name as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{item.label}</FormLabel>
              <FormControl>
                {/*@ts-ignore*/}
                <Input
                  placeholder={item.placeholder}
                  type={item.type}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </CardContent>
  );
};

export default CardContentComponent;
