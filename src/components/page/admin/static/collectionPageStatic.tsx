import PageTitle from "@/components/common/page-title";
import ErrorPage from "@/components/page/error-page";
import { FetchError } from "@/lib/types/fetchErr";
import { cn } from "@/lib/utils";
import { FaGreaterThan } from "react-icons/fa6";

type CollectionPageStaticProps = {
  children: React.ReactNode;
  collection: string;
  className?: string;
};
const CollectionPageStatic = ({
  children,
  collection,
  className,
}: CollectionPageStaticProps) => {
  return (
    <div className={cn("happy-page", className)}>
      <div className="happy-title-head flex items-center gap-2">
        <PageTitle title="Collections" link="/collections" />
        <FaGreaterThan size={16} />
        <span>{collection}</span>
      </div>
      <div className="happy-page">{children}</div>
      <div className="h-screen"></div>
    </div>
  );
};

export default CollectionPageStatic;

type CollectionPageErrorStaticProps = {
  error?: FetchError;
  collection: string;
};

export const CollectionPageErrorStatic = ({
  collection,
  error,
}: CollectionPageErrorStaticProps) => {
  return <ErrorPage message={error?.details || error?.message} />;
};
