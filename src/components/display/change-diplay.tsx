"use client";

import { Button } from "@/components/ui/button";
import { useDisplayMode } from "@/lib/hooks/use-display-mode";
import { BsGrid, BsTable } from "react-icons/bs";

const ChangeDisplay = () => {
  const { displayMode, changeDisplayMode } = useDisplayMode();

  return (
    <div className="flex">
      <Button
        library="daisy"
        variant={displayMode === "card" ? "primary" : "outline"}
        size="sm"
        className="rounded-r-none border-r-0 border border-base-content/50"
        onClick={() => changeDisplayMode("card")}
        type="button"
      >
        <BsGrid className="mr-1" /> Card
      </Button>

      <Button
        type="button"
        library="daisy"
        variant={displayMode === "table" ? "primary" : "outline"}
        size="sm"
        className="rounded-l-none border border-base-content/50"
        onClick={() => changeDisplayMode("table")}
      >
        <BsTable className="mr-1" /> Table
      </Button>
    </div>
  );
};

export default ChangeDisplay;
