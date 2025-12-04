import MyImage from "@/components/common/myImage";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { AuthContext } from "@/lib/utils/auth-context";
import { ChildrenWrapper } from "./children-wrapper";

interface Props {
  children?: React.ReactNode,
  title ?: string,
  description?: string
  icon ?: string
  auth?: AuthContext
}

const CommonEmpty = ({ title, description, children, icon , auth}: Props) => {
  return (
    <Empty className="text-center py-8">
      <EmptyHeader>
        <EmptyMedia variant="default">
          <MyImage src={icon ?? "/icons/not-found.png"} sizes="24" alt="student icon" />
        </EmptyMedia>
        <EmptyTitle>{title ?? "Items are empty"}</EmptyTitle>
        <EmptyDescription>
            {description ?? "They are currently no empty you can create new "}
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </EmptyContent>
    </Empty>
  );
};


export default CommonEmpty;
