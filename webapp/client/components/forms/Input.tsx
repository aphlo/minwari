"use client";

import { Input as HeroInput, type InputProps } from "@heroui/input";
import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { classNames, ...rest } = props;

  return (
    <HeroInput
      ref={ref}
      {...rest}
      classNames={{
        ...classNames,
        inputWrapper: `border-border hover:border-muted group-data-[focus=true]:border-primary ${
          classNames?.inputWrapper || ""
        }`,
        input: `!outline-none !ring-0 !shadow-none bg-transparent ${
          classNames?.input || ""
        }`,
        innerWrapper: `!outline-none !ring-0 !shadow-none ${
          classNames?.innerWrapper || ""
        }`,
      }}
    />
  );
});

Input.displayName = "Input";
