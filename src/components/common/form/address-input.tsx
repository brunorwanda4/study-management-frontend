"use client";

import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountriesContext } from "@/lib/data/locations";
import type { address } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface AddressInputProps {
  value?: address | null;
  onChange?: (value: address | undefined) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  className?: string;
}

/**
 * AddressInput (Rwanda-only)
 * - Country locked to Rwanda
 * - Province/District from CountriesContext
 * - Basic address fields below
 */
export default function AddressInput({
  value,
  onChange,
  disabled,
  error,
  label = "Address",
  className,
}: AddressInputProps) {
  const { theme } = useTheme();

  const handleChange = (key: keyof address, val: string) => {
    onChange?.({
      ...value,
      [key]: val,
      country: "Rwanda", // always Rwanda
    });
  };

  // Rwanda data
  const rwanda = CountriesContext.find((c) => c.country === "Rwanda");
  const provinces = rwanda?.provinces ?? [];
  const selectedProvince = provinces.find((p) => p.name === value?.province);
  const districts = selectedProvince?.districts ?? [];

  return (
    <div className={cn("space-y-3 w-full", className)}>
      {/* Country (locked) */}
      <div className={cn("flex flex-col space-y-2 ", rwanda && "hidden")}>
        <Label>Country</Label>
        <Select disabled value="Rwanda" onValueChange={() => {}}>
          <SelectTrigger>
            <SelectValue placeholder="Rwanda" />
          </SelectTrigger>
          <SelectContent data-theme={theme}>
            <SelectItem value="Rwanda">Rwanda</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Province / District */}
      <div className="flex gap-2">
        <div className="flex flex-col space-y-2 w-full">
          <Label>Province</Label>
          <Select
            disabled={disabled}
            value={value?.province || ""}
            onValueChange={(val) => handleChange("province", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Province" />
            </SelectTrigger>
            <SelectContent data-theme={theme}>
              {provinces.map((p) => (
                <SelectItem key={p.name} value={p.name}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <Label>District</Label>
          <Select
            disabled={!value?.province || disabled}
            value={value?.district || ""}
            onValueChange={(val) => handleChange("district", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent data-theme={theme}>
              {districts.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Optional lower fields */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col space-y-2">
          <Label>Sector</Label>
          <Input
            disabled={disabled}
            placeholder="Enter sector"
            value={value?.sector ?? ""}
            onChange={(e) => handleChange("sector", e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Cell</Label>
          <Input
            disabled={disabled}
            placeholder="Enter cell"
            value={value?.cell ?? ""}
            onChange={(e) => handleChange("cell", e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Village</Label>
          <Input
            disabled={disabled}
            placeholder="Enter village"
            value={value?.village ?? ""}
            onChange={(e) => handleChange("village", e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Street</Label>
          <Input
            disabled={disabled}
            placeholder="Enter street"
            value={value?.street ?? ""}
            onChange={(e) => handleChange("street", e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label>City</Label>
          <Input
            disabled={disabled}
            placeholder="Enter city"
            value={value?.city ?? ""}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Postal Code</Label>
          <Input
            disabled={disabled}
            placeholder="Postal code"
            value={value?.postal_code ?? ""}
            onChange={(e) => handleChange("postal_code", e.target.value)}
          />
        </div>
      </div>

      {/* Google Map URL */}
      <div className="flex flex-col space-y-2">
        <Label>Google Maps URL</Label>
        <Input
          disabled={disabled}
          placeholder="https://www.google.com/maps/..."
          value={value?.google_map_url ?? ""}
          onChange={(e) => handleChange("google_map_url", e.target.value)}
        />
      </div>

      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
}
