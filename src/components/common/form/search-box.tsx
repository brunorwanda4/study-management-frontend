"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchBoxProps {
  /** Called when the user searches (presses Enter or clicks search button) */
  onSearch: (query: string) => void | Promise<void>;
  /** Optional placeholder text */
  placeholder?: string;
  /** Optional debounce time for live search (in ms) */
  debounceMs?: number;
  /** Whether to auto-search as user types */
  live?: boolean;
  /** Whether search is loading */
  loading?: boolean;
  className?: string;
}

/**
 * 🔍 Reusable SearchBox component
 * Can be used across pages like Teacher, Student, Class etc.
 *
 * Example:
 * <SearchBox onSearch={(q) => fetchTeachers(q)} placeholder="Search teacher..." />
 */
const SearchBox = ({
  onSearch,
  placeholder = "Search...",
  debounceMs = 400,
  live = false,
  loading = false,
  className,
}: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  // 🧠 Trigger search manually
  const handleSearch = async () => {
    await onSearch(query.trim());
  };

  // 🧩 Auto search as user types (optional)
  useEffect(() => {
    if (!live) return;
    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      onSearch(query.trim());
    }, debounceMs);

    setTypingTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (query.trim() === "") {
      onSearch("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className={cn("flex flex-row gap-0", className)}>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="rounded-r-none"
      />
      <Button
        onClick={handleSearch}
        disabled={loading}
        className="rounded-l-none h-9 border border-base-content/50"
        variant="outline"
        library="daisy"
        size="sm"
        role={loading ? "loading" : undefined}
      >
        {!loading && <BsSearch />}
        <span className="sr-only">search</span>
      </Button>
    </div>
  );
};

export default SearchBox;
