import { Option } from '@/components/ui/multiselect';

export const stringsToOptions = (items: string[] | null | undefined): Option[] => {
  if (!items) return [];
  return items.map((item) => ({ label: item, value: item }));
};

export const optionsToStrings = (options: Option[] | null | undefined): string[] => {
  if (!options) return [];
  return options.map((option) => option.value);
};
