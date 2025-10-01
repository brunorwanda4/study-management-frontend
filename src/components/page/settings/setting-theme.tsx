"use client";
import { useTheme } from "next-themes";
import { BsCheck2Circle, BsPalette } from "react-icons/bs";
const SettingTheme = () => {
  const { setTheme, theme } = useTheme();
  const themes = [
    "light",
    "cupcake",
    "acid",
    "winter",
    "valentine",
    "dim",
    "business",
    "dark",
    "forest",
    "night",
    "synthwave",
    "black",
  ];
  return (
    <div className="basic-card">
      <div className="space-y-2">
        <div className="flex w-full justify-between">
          <h2 className="basic-title">Application Theme</h2>
          <div className="flex items-center space-x-2">
            <BsPalette className="text-primary" />
            <span className="text-primary"> {theme}</span>
          </div>
        </div>
        <p>
          Application theme we provide change theme by click them and all
          application will change theme
        </p>
      </div>
      <div className="max-w-auto mt-4 grid w-full max-w-max grid-cols-4 gap-2 overflow-x-auto">
        {/* dark */}
        {themes.map((items) => {
          return (
            <div
              key={items}
              onClick={() => setTheme(items)}
              data-theme={items}
              className="grid max-w-28 cursor-pointer grid-cols-5 grid-rows-3 overflow-hidden rounded-md"
            >
              <div className="bg-base-200 col-start-1 row-span-2 row-start-1"></div>{" "}
              <div className="bg-base-300 bottom-0 col-start-1 row-start-3"></div>{" "}
              <div className="bg-base-100 relative col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
                <div className="line-clamp-1 font-bold capitalize">{items}</div>{" "}
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
