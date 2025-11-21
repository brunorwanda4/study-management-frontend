import MyAvatar from "@/components/common/image/my-avatar";
import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";

const ClassHero = () => {
  return (
    <section className=" relative ">
      <MyImage
        src="/images/1.jpg"
        className=" h-52 w-full"
        classname=" card rounded-t-none"
      />
      <div className=" absolute z-20 -bottom-25 left-4">
        <div className=" flex items-center flex-row justify-between gap-4">
          <MyAvatar
            size="2xl"
            type="cycle"
            className=" border-2 border-base-200"
          />
          <div>
            <h1 className="h3">Class name</h1>
            <MyLink roleTag="c" href="/" >
              class_username
            </MyLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassHero;
