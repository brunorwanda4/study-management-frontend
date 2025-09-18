import CardError from "@/components/common/card-error";
import PageTitle from "@/components/common/page-title";
import { FetchError } from "@/lib/types/fetchErr";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaGreaterThan } from "react-icons/fa6";

interface props {
  children: React.ReactNode;
  className?: string;
  classname?: string;
  collectionName: string;
  documentName: string;
}
const DocumentPageStatic = ({
  children,
  className,
  classname,
  documentName,
  collectionName,
}: props) => {
  return (
    <div className={cn("happy-page", className)}>
      <div className="happy-title-head flex items-center gap-2">
        <PageTitle title="Collections" link="/collections" />
        <FaGreaterThan size={16} />
        <Link className="link-hover" href={`/collection/${collectionName}`}>
          {collectionName}
        </Link>
        <FaGreaterThan size={16} /> <span>{documentName}</span>
      </div>
      <div className={cn("min-h-40", classname)}>{children}</div>
    </div>
  );
};

export default DocumentPageStatic;

interface DocumentPageStaticProps {
  error?: FetchError;
  collectionName: string;
  documentName: string;
}

export const DocumentPageStaticError = ({
  collectionName,
  documentName,
  error,
}: DocumentPageStaticProps) => {
  return (
    <DocumentPageStatic
      collectionName={collectionName}
      documentName={documentName}
    >
      {error ? <CardError error={error} /> : <CardError />}
    </DocumentPageStatic>
  );
};
