"use client";

import { useDisplayMode } from "@/lib/hooks/use-display-mode";

interface Props {
  table?: React.ReactNode;
  cards?: React.ReactNode;
}

const DisplaySwitcher = ({ table, cards }: Props) => {
  const { displayMode } = useDisplayMode();
  return <div>{displayMode === "card" ? cards : table}</div>;
};

export default DisplaySwitcher;
