import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const DatabaseData = () => {
  return (
    <Card className="gap-0">
      <CardHeader className="border-base-100 border-b-0">
        <div className="flex w-full items-center justify-between">
          <CardTitle className="text-lg font-medium">Databases data</CardTitle>
          <Button
            href="/a/database"
            role="href"
            variant={"primary"}
            library="daisy"
            size={"sm"}
          >
            View
          </Button>
        </div>
      </CardHeader>
      <CardContent className="border-base-300 mx-4 grid gap-4 border p-0 max-lg:grid-cols-2 lg:flex lg:justify-between">
        {/* education data */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col p-4">
            <h4 className="text-lg font-medium">Education Data</h4>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-4xl font-semibold">9 GB</span>
                <span className="text-secondary">89 docs</span>
              </div>
              <MyImage
                src="/icons/graduation-hat.png"
                className="size-16"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <Separator orientation="vertical" className="flex h-32" />
        {/* users data */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col p-4">
            <h4 className="text-lg font-medium">Users data</h4>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-4xl font-semibold">9 GB</span>
                <span className="text-secondary">89 docs</span>
              </div>
              <MyImage
                src="/icons/family.png"
                className="size-16"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <Separator orientation="vertical" className="h-32" />
        {/* others data */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col p-4">
            <h4 className="text-lg font-medium">Others</h4>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-4xl font-semibold">9 GB</span>
                <span className="text-secondary">89 docs</span>
              </div>
              <MyImage
                src="/icons/data-collection.png"
                className="size-16"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <Separator orientation="vertical" className="h-32" />
        {/* schools data */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col p-4">
            <h4 className="text-lg font-medium">Schools</h4>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-4xl font-semibold">9 GB</span>
                <span className="text-secondary">89 docs</span>
              </div>
              <MyImage
                src="/icons/school.png"
                className="size-16"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseData;
