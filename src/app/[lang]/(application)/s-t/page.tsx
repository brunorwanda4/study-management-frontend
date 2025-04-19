import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolStaffPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <div className=" flex justify-center items-center w-full h-full gap-2 flex-row-reverse">
      <MyLink
        loading
        href={`/${lang}/s-t/new`}
        button={{ library: "daisy", variant: "info" }}
        type="button"
      >
        <MyImage src="/icons/memo.png" role="ICON" />
        Register your school
      </MyLink>
      <Button library="daisy" variant={"outline"}>
        <MyImage src="/icons/school.png" role="ICON" />
        Join your school
      </Button>
    </div>
  );
};

export default SchoolStaffPage;
