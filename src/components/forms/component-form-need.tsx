"use client"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import * as RPNInput from "react-phone-number-input";
import { Phone } from "lucide-react";
import flags from "react-phone-number-input/flags";
import { forwardRef } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    onChange: (value: RPNInput.Country) => void;
    options: { label: string; value: RPNInput.Country | undefined }[];
  };
  
  export const CountrySelect = ({ value, onChange, options }: CountrySelectProps) => {
    const {theme} = useTheme()
    return (
      <Select
        value={value}
        onValueChange={(v) => onChange(v as RPNInput.Country)}
      >
        <SelectTrigger
          data-tip={
            value
              ? options.find((o) => o.value === value)?.label
              : "Select a country"
          }
          className="flex items-center gap-2 w-20 ring-0 focus:ring-0 tooltip border-0"
        >
          <FlagComponent country={value} countryName={value} />
          <span className=" sr-only">
            {value
              ? options.find((o) => o.value === value)?.label
              : "Select a country"}
          </span>
        </SelectTrigger>
        <SelectContent data-theme={theme}>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value || "default"}>
              {option.label}{" "}
              {option.value && `+${RPNInput.getCountryCallingCode(option.value)}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };
  
export  const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];
  
    return (
      <span className="w-5 overflow-hidden rounded-sm">
        {Flag ? (
          <Flag title={countryName} />
        ) : (
          <Phone size={16} aria-hidden="true" />
        )}
      </span>
    );
  };
  

 export const PhoneInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, ...props }, ref) => {
      return (
        <Input
          className={cn(
            "-ms-px rounded-s-none shadow-none focus-visible:z-10",
            className
          )}
          ref={ref}
          {...props}
        />
      );
    }
  );
  
  PhoneInput.displayName = "PhoneInput";
  