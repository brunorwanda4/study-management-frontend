"use client";
import { useTheme } from "next-themes";
import { BsCheck2Circle, BsPalette } from "react-icons/bs";
const SettingTheme = () => {
  const { setTheme, theme } = useTheme();
  const themes = [
    "light",
    "cupcake",
    "cmyk",
    "acid",
    "winter",
    "valentine",
    "synthwave",
    "business",
    "dark",
    "night",
    "forest",
    "black",
  ];
  return (
    <div className=" basic-card">
      <div className=" space-y-2">
        <div className="  flex  justify-between w-full">
          <h2 className=" basic-title">Application Theme</h2>
          <div className=" space-x-2 flex items-center">
            <BsPalette className=" text-primary"/>
            <span className=" text-gray-500"> {theme}</span>
          </div>
        </div>
        <p>
          Application theme we provide change theme by click them and all
          application will change theme
        </p>
      </div>
      <div className=" mt-4 overflow-x-auto grid grid-cols-4 gap-2 w-full max-w-auto max-w-max ">
        {/* dark */}
        {themes.map((items) => {
          return (
            <div
              key={items}
              onClick={() => setTheme(items)}
              data-theme={items}
              className="grid grid-cols-5 grid-rows-3 rounded-md max-w-28 cursor-pointer overflow-hidden"
            >
              <div className="bg-base-200 col-start-1 row-span-2 row-start-1"></div>{" "}
              <div className="bg-base-300 bottom-0 col-start-1 row-start-3"></div>{" "}
              <div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2 relative">
                <div className="font-bold capitalize line-clamp-1">{items}</div>{" "}
                <div className="flex flex-wrap gap-1">
                  <div className="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                    <div className="text-primary-content text-sm font-bold">
                      A
                    </div>
                  </div>{" "}
                  <div className="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                    <div className="text-secondary-content text-sm font-bold">
                      B
                    </div>
                  </div>{" "}
                  <div className="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                    <div className="text-accent-content text-sm font-bold">
                      C
                    </div>
                  </div>{" "}
                  <div className="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                    <div className="text-neutral-content text-sm font-bold">
                      {items === `${theme}` ? (
                        <BsCheck2Circle size={20} />
                      ) : (
                        "D"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingTheme;
