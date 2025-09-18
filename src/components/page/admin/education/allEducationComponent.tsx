import { Button } from "@/components/ui/button";
import UpdateEducationDialog from "./updateEducationDialog";

import MyImage from "@/components/common/myImage";
import { CollectionPageErrorStatic } from "@/components/page/admin/static/collectionPageStatic";
import {
  fetchAllEducation,
  fetchAllSectorByEducation,
} from "@/service/admin/fetchDataFn";
import { BsDot } from "react-icons/bs";
import DeleteEducationDialog from "./deleteEducationDialog";

const AllEducationComponent = async () => {
  const getEducations = await fetchAllEducation();

  if ("message" in getEducations) {
    return (
      <CollectionPageErrorStatic collection="education" error={getEducations} />
    );
  }
  return (
    <div className="">
      <div className="space-y-2">
        {getEducations.map(async (item) => {
          const getSector = await fetchAllSectorByEducation(item.id);

          if ("message" in getSector)
            return (
              <CollectionPageErrorStatic
                key={item.id}
                collection="education"
                error={getSector}
              />
            );
          return (
            <div key={item.id} className="happy-card w-full">
              <div className=" ">
                <div className="p-0 hover:no-underline">
                  <div className="mr-4 flex w-full items-center justify-between">
                    <div className="flex space-x-3 text-start">
                      <MyImage
                        src={item.symbol ? item.symbol : "/icons/education.png"}
                        className="size-14"
                      />
                      <div>
                        <h4 className="text-lg font-medium">{item.name}</h4>
                        <div>
                          <span className="link-hover">@ {item.username} </span>
                          {item.updated_on ? (
                            <span className="text-myGray text-sm">
                              {item.updated_on &&
                                `Update: ${new Date(
                                  item.updated_on,
                                ).toDateString()}`}
                            </span>
                          ) : (
                            <span className="text-myGray text-sm">
                              {new Date(item.created_on).toDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-x-3">
                      <Button type="button" variant="outline" size="sm">
                        Sectors {getSector.length}
                      </Button>
                      <UpdateEducationDialog education={item} />
                      {getSector.length == 0 && (
                        <DeleteEducationDialog education={item} />
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mt-2 space-y-2">
                    <p className="flex space-x-2">{item.description}</p>
                    {/* sector */}
                    <div>
                      <h3 className="text-lg font-medium">
                        {" "}
                        Sectors {getSector.length}
                      </h3>
                      {getSector.map((sector) => (
                        <div key={sector.id} className="flex">
                          <BsDot />
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium">{sector.name}</h5>
                              <span className="link-hover text-sm">
                                @ {sector.username}
                              </span>
                              {item.updated_on ? (
                                <span className="text-myGray text-sm">
                                  {item.updated_on &&
                                    `Update: ${new Date(
                                      item.updated_on,
                                    ).toDateString()}`}
                                </span>
                              ) : (
                                <span className="text-myGray text-sm">
                                  {new Date(item.created_on).toDateString()}
                                </span>
                              )}
                            </div>
                            <p className="text-sm">{sector.description}</p>
                          </div>
                        </div>
                      ))}
                      {/* <Link href={`/collection/sector`} className=" link text-info justify-center flex">All Sectors</Link> */}
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

export default AllEducationComponent;
