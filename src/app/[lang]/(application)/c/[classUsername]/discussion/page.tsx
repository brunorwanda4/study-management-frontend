import { Separator } from "@/components/ui/separator";

const ClassDiscussionPage = async (
  props: PageProps<"/[lang]/c/[classUsername]/discussion">,
) => {
  const params = await props.params;
  return (
    <div className=" flex  flex-col">
      <div>
        <h3 className=" h3">discussion </h3>
        <p className=" text-base-content/50">
          Manage weekly schedule, lessons, and classroom structure.
        </p>
        <Separator />
      </div>
    </div>
  );
};

export default ClassDiscussionPage;
