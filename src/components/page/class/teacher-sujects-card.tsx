import MyLink from "@/components/common/myLink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { FaBook } from "react-icons/fa6";

const TeacherSubjectsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Subjects</CardTitle>
      </CardHeader>
      <CardContent className=" w-full gap-2 flex flex-col">
        {[...Array(3)].map((_, i) => {
          return (
            <Item
              variant={"muted"}
              className=" flex  flex-row w-full px-2"
              size="sm"
              key={i}
            >
              <ItemContent className=" flex flex-row  w-full justify-between items-center p-0">
                <ItemHeader>
                  <div className="flex flex-row items-center gap-2">
                    <FaBook />
                    <ItemTitle>Subject Name</ItemTitle>
                  </div>
                </ItemHeader>
                <ItemFooter className=" w-fit justify-end">
                  <MyLink
                    href=""
                    button={{
                      role: "create",
                      variant: "outline",
                      size: "sm",
                      library: "daisy",
                    }}
                  >
                    New notes
                  </MyLink>
                  <MyLink
                    href=""
                    button={{
                      role: "create",
                      variant: "outline",
                      size: "sm",
                      library: "daisy",
                    }}
                  >
                    New class work
                  </MyLink>
                </ItemFooter>
              </ItemContent>
            </Item>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TeacherSubjectsCard;
