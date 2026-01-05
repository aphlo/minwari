"use client";

import { Select, SelectItem } from "@heroui/select";
import { useTranslations } from "next-intl";
import type { CurrencyCode } from "@/shared/lib/currency";
import { supportedCurrencies } from "@/shared/lib/currency";

type Props = {
  value: CurrencyCode;
  onChange: (value: CurrencyCode) => void;
  isInvalid?: boolean;
  errorMessage?: string;
};

export function CurrencySelect({
  value,
  onChange,
  isInvalid,
  errorMessage,
}: Props) {
  const t = useTranslations("currency");

  return (
    <Select
      label={t("label")}
      labelPlacement="outside"
      selectedKeys={value ? [value] : []}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0] as CurrencyCode | undefined;
        if (selected) {
          onChange(selected);
        }
      }}
      isRequired
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      variant="bordered"
      radius="lg"
    >
      {supportedCurrencies.map((currency) => (
        <SelectItem key={currency.code}>
          {t(`options.${currency.code}`)}
        </SelectItem>
      ))}
    </Select>
  );
}
