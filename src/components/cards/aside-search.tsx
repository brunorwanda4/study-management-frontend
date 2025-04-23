import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";

const MessageSearch = () => {
  return (
    <div className="space-y-2 relative border-b  border-b-base-300 h-14 p-2">
      <div className="relative">
        <Input className="peer pe-9 ps-9" placeholder="Search..." />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3  /80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg  /80 outline-offset-2 transition-colors hover:  focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default MessageSearch;
