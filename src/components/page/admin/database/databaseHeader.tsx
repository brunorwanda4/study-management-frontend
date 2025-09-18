import { Separator } from "@/components/ui/separator";
import { DbProps } from "@/lib/types/databaseStatus";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FcFilingCabinet, FcPackage, FcRules } from "react-icons/fc";
const DatabaseHeader = ({ data, error }: DbProps) => {
  const className = {
    parentDiv: "h-32 happy-card p-0 w-full flex flex-row",
    childDiv: "p-6 w-1/4 h-full",
  };

  if (error) {
    return (
      <div className="bg-error/20 border-error rounded-md border p-6 text-red-500">
        Error: {error.message} <br />
        Details: {error.details}
      </div>
    );
  }
  return (
    <div className={cn(className.parentDiv)}>
      <div className={cn(className.childDiv)}>
        <div>
          <div className="flex justify-between">
            <h3 className="font-medium">Total Size</h3>
            <div className="">
              <FcFilingCabinet size={32} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold">{data?.total_size_bytes}</span>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className={cn(className.childDiv)}>
        <div>
          <div className="flex justify-between">
            <h3 className="font-medium">Total Collections</h3>
            <Link href={`/collections`}>
              <FcPackage size={32} />
            </Link>
          </div>
          <div className="mt-3 flex items-center justify-center">
            <Link href={`/collections`} className="text-3xl font-bold">
              {data?.total_collection}
            </Link>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className={cn(className.childDiv)}>
        <div>
          <div className="flex justify-between">
            <h3 className="font-medium">Total Documents</h3>
            <div>
              <FcRules size={32} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold">{data?.total_documents}</span>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className={cn(className.childDiv)}>
        <div>
          <h3 className="font-medium">Date </h3>
          <div className="mt-3">
            <span className="text-3xl font-bold">{data?.total_size_bytes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseHeader;
