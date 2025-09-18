import CardError from "@/components/common/card-error";
import MyImage from "@/components/common/myImage";
import { DatabaseStats } from "@/lib/types/databaseStatus";
import { FetchError } from "@/lib/types/fetchErr";
import { fetchDatabaseStatus } from "@/service/admin/databaseStatusService";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

interface RoleType {
  name: string;
  items: number;
}

interface MainCollectionsTypes {
  name: string;
  color?: string;
  size: string;
  description?: string;
  icon?: string;
  role?: RoleType;
}

const predefinedMainCollections: MainCollectionsTypes[] = [
  {
    name: "schools",
    color: "info",
    size: "",
    description: "All Class in class collection",
    icon: "/icons/school.png",
  },
  {
    name: "classes",
    color: "info",
    size: "",
    description: "All Class in class collection",
    icon: "/icons/teacher.png",
    role: {
      name: "Teacher Role",
      items: 0,
    },
  },
  {
    name: "Class_room",
    color: "info",
    size: "",
    description: "Class room for sectors",
    icon: "/icons/classroom.png",
    role: {
      name: "class room type",
      items: 0,
    },
  },
  {
    name: "users",
    color: "success",
    size: "",
    description: "Client users",
    icon: "/icons/ancestors.png",
    role: {
      name: "User Role",
      items: 0,
    },
  },
  {
    name: "subjects",
    color: "success",
    size: "",
    description: "Subjects for reasons",
    icon: "/icons/math-book.png",
    role: {
      name: "Subject Role",
      items: 0,
    },
  },
  {
    name: "educations",
    color: "success",
    size: "",
    description: "Education we support",
    icon: "/icons/education.png",
  },
  {
    name: "sector",
    color: "success",
    size: "",
    description: "sector for education",
    icon: "/icons/video-conference.png",
  },
  {
    name: "trades",
    color: "success",
    size: "",
    description: "Trades for education",
    icon: "/icons/video-conference.png",
  },
];
const AllCollectionInCollection = async () => {
  let data: DatabaseStats | null = null;
  let error: FetchError | null = null;

  try {
    const result = await fetchDatabaseStatus();

    if (result && "message" in result) {
      error = result;
    } else if (result) {
      data = result;
    }
  } catch (err) {
    error = {
      message: "An unexpected error occurred",
      details: (err as Error).message,
    };
  }

  if (error) {
    return <CardError error={error} />;
  }

  if (!data) {
    return <p>Loading database status...</p>;
  }

  // Step 1: Process Main Collections
  const mainCollections = predefinedMainCollections.map((main) => {
    const collectionData = data.collections.find(
      (col) => col.name.toLowerCase() === main.name.toLowerCase(),
    );

    const roleCollectionName = `${main.name.toLowerCase()}.role`;
    const roleCollectionData = data.collections.find(
      (col) => col.name.toLowerCase() === roleCollectionName,
    );

    return {
      ...main,
      items: collectionData?.document_count || 0,
      size: collectionData?.size_bytes || 0,
      role: main.role
        ? {
            ...main.role,
            items: roleCollectionData?.document_count || 0,
          }
        : undefined,
    };
  });

  // Step 2: Process Other Collections
  const mainCollectionNames = predefinedMainCollections.map((main) =>
    main.name.toLowerCase(),
  );

  const otherCollections = data.collections.filter((collection) => {
    const isMainCollection = mainCollectionNames.includes(
      collection.name.toLowerCase(),
    );

    const isRoleOfMain = mainCollectionNames.some((mainName) =>
      collection.name.toLowerCase().startsWith(`${mainName}.role`),
    );

    const isStandaloneRole =
      collection.name.endsWith(".role") &&
      !mainCollectionNames.includes(
        collection.name.replace(".role", "").toLowerCase(),
      );

    return !isMainCollection && (isStandaloneRole || !isRoleOfMain);
  });

  return (
    <div className="space-y-2">
      <h2 className="happy-title-base">
        Main collects ({mainCollections.length})
      </h2>
      <div className="grid w-full grid-cols-4 gap-2">
        {mainCollections.map((collection, index) => (
          <div
            key={index}
            className="happy-card flex h-full w-full flex-col justify-between"
          >
            <div>
              <Link
                href={`/collection/${collection.name}`}
                className="flex flex-col items-center justify-center gap-2"
              >
                <MyImage
                  className="size-10"
                  src={collection.icon || "/icons/data-collection.png"}
                />
                <div className="flex w-full flex-col items-center justify-center">
                  <h4 className="text-lg font-semibold capitalize">
                    {collection.name}
                  </h4>
                  <p>{collection.description}</p>
                </div>
              </Link>
              <div>
                <div className="flex flex-col gap-2">
                  <span className="font-medium">Items: {collection.items}</span>
                  <span className="font-medium">size: {collection.size}</span>
                  {collection.role && (
                    <span>
                      {collection.role.name} :{collection.role.items}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Link
              href={`/collection/${collection.name}`}
              className="btn btn-outline btn-sm group mt-3 flex items-center justify-center"
            >
              See data
              <FaArrowRight className="duration-200 group-hover:scale-x-105" />
            </Link>
          </div>
        ))}
      </div>

      {/* other collections */}
      <div>
        <h3 className="happy-title-base">
          Other Collections ({otherCollections.length})
        </h3>
        <div className="mt-2 grid w-full grid-cols-4 gap-2">
          {otherCollections.map((collection, index) => (
            <div key={index} className="happy-card h-full w-full">
              <div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <MyImage
                    className="size-10"
                    src={"/icons/data-collection.png"}
                  />
                  <div className="flex w-full flex-col items-center justify-center">
                    <h4 className="text-lg font-semibold">{collection.name}</h4>
                    <p>Items: {collection.document_count}</p>
                  </div>
                </div>
              </div>
              <Link
                href={`/collection/${collection.name}`}
                className="btn btn-outline btn-sm group mt-3 flex items-center justify-center"
              >
                See data
                <FaArrowRight className="duration-200 group-hover:scale-x-105" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        {data.collections.map((item) => (
          <div key={item.name}>
            {item.name} <div>{item.document_count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCollectionInCollection;
