import { EndpointCategoryModel } from "@/lib/types/databaseStatus";
import { FetchError } from "@/lib/types/fetchErr";
import axios from "axios";

export const fetchEndpoint = async (): Promise<
  EndpointCategoryModel | FetchError | null
> => {
  try {
    const res = await axios.get<EndpointCategoryModel>(
      `${process.env.ST_API}/endpoints`,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message:
          error.response?.data?.message || "Failed to fetch endpoints! 😔",
        status: error.response?.status,
        details: error.message,
      };
    }

    return {
      message: "An unexpected error occurred",
      details: (error as Error).message,
    };
  }
};
