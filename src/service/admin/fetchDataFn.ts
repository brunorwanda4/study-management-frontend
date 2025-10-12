import {
  UserModel,
  UserModelDeleteMany,
  UserModelPut,
  UserModelUpdateMany,
  UserRoleModel,
  UserRoleModelNew,
  userSchemeType,
} from "@/lib/schema/user/user-schema";
import {
  ClassModelGet,
  ClassModelNew,
  ClassModelPut,
} from "@/lib/types/classModel";
import {
  ClassRoomModelGet,
  ClassRoomModelNew,
  ClassRoomModelPut,
} from "@/lib/types/classRoomModel";
import {
  ClassRoomTypeModelGet,
  ClassRoomTypeModelNew,
  ClassRoomTypeModelPut,
} from "@/lib/types/classRoomTypeModel";
import {
  ClassTypeModelGet,
  ClassTypeModelNew,
  ClassTypeModelPut,
} from "@/lib/types/classTypeModel";
import {
  EducationModelGet,
  EducationModelNew,
  EducationModelPut,
} from "@/lib/types/educationModel";
import { FetchError } from "@/lib/types/fetchErr";
import {
  SectorModelGet,
  SectorModelNew,
  SectorModelPut,
} from "@/lib/types/sectorModel";
import {
  TradeModelGet,
  TradeModelNew,
  TradeModelPut,
} from "@/lib/types/tradeModel";
import { ApiClient } from "@/service/admin/fetchingAPIClient";

const apiClient = new ApiClient();

/**
 * create user role
 * @param role
 * @returns UserRoleModel | FetchError
 */
export async function createUserRole(
  role: UserRoleModelNew,
): Promise<UserRoleModel | FetchError> {
  const endpoint = "users/role";
  return apiClient.postData(endpoint, role, "user role");
}
/**
 * update user role
 * @param role
 * @returns UserRoleModel | FetchError
 */
export async function updateUserRole(
  role: UserRoleModelNew,
  id: string,
): Promise<UserRoleModel | FetchError> {
  const endpoint = `users/role/${id}`;
  return apiClient.updateData(endpoint, role, "user role");
}

/**
 * get all users by role
 * @param role
 * @returns UserModel[] | FetchError
 */
export async function fetchUserRole(): Promise<UserRoleModel[] | FetchError> {
  const endpoint = `users/role`;
  return apiClient.allData<UserRoleModel[]>(endpoint, "users role");
}

/**
 * get all users by role
 * @param role
 * @returns UserModel[] | FetchError
 */
export async function fetchUsersByRole(
  role: string,
): Promise<UserModel[] | FetchError> {
  const endpoint = `users/rl/${role}`;
  return apiClient.allData<UserModel[]>(endpoint, "users role");
}

/**
 * delete user role
 * @param id
 * @returns UserRoleModel | FetchError
 */
export async function usersByRoleDelete(
  id: string,
): Promise<UserRoleModel | FetchError> {
  const endpoint = `users/role/${id}`;
  return apiClient.deleteData<UserRoleModel>(endpoint, "users role");
}

/**
 *  Create a new users
 * @param user
 * @returns UserModel | FetchError
 */
export async function createUserAPI(
  user: userSchemeType,
): Promise<UserModel | FetchError> {
  const endpoint = "users";
  return apiClient.postData(endpoint, user, "users");
}

/**
 * delete user
 * @param user
 * @returns UserModel | FetchError
 */
export async function deleteUserAPI(
  id: string,
): Promise<UserModel | FetchError> {
  const endpoint = `users/${id}`;
  return apiClient.deleteData(endpoint, "users");
}

/**
 * delete many user
 * @param user
 * @returns UserModel[] | FetchError
 */

export async function deleteManyUsersAPI(
  users: UserModelDeleteMany,
): Promise<UserModel[] | FetchError> {
  const endpoint = `users/delete-many`;
  return apiClient.postData(endpoint, users, "users");
}

/**
 * delete many user
 * @param user
 * @returns UserModel[] | FetchError
 */

export async function updateManyUsersAPI(
  users: UserModelUpdateMany,
): Promise<UserModel[] | FetchError> {
  const endpoint = `users/update-many`;
  return apiClient.postData(endpoint, users, "users");
}

/**
 * update user
 * @param user
 * @returns UserModel | FetchError
 */
export async function updateUserAPI(
  user: UserModelPut,
  id: string,
): Promise<UserModel | FetchError> {
  const endpoint = `users/${id}`;
  return apiClient.updateData(endpoint, user, "users");
}

/**
 * get document by id
 * @returns T | FetchError
 */

export async function fetchDocumentById<T>(
  endpoint: string,
  name?: string,
): Promise<T | FetchError> {
  return apiClient.allData<T>(endpoint, name);
}

/**
 * get all user roles
 * @returns UserRoles[] | FetchError
 */

export async function fetchAllUserRoles(): Promise<
  UserRoleModel[] | FetchError
> {
  const endpoint = "users/role";
  return apiClient.allData<UserRoleModel[]>(endpoint, "user roles");
}

/////////////////////////////////////---EDUCATION---///////////////////////////////////////////

/**
 *  Create a education
 * @param education
 * @returns EducationModelGet | FetchError
 */
export async function createEducationAPI(
  education: EducationModelNew,
): Promise<EducationModelGet | FetchError> {
  const endpoint = "education";
  return apiClient.postData(endpoint, education, "educations");
}

/**
 *  update education
 * @param education
 * @returns EducationModelGet | FetchError
 */
export async function updateEducationAPI(
  education: EducationModelPut,
  id: string,
): Promise<EducationModelGet | FetchError> {
  const endpoint = `education/${id}`;
  return apiClient.updateData(endpoint, education, "educations");
}

/**
 * delete education
 * @param education
 * @returns EducationModelGet | FetchError
 */
export async function deleteEducationAPI(
  id: string,
): Promise<EducationModelGet | FetchError> {
  const endpoint = `education/${id}`;
  return apiClient.deleteData(endpoint, "education");
}

/**
 * get all education
 * @param education
 * @returns EducationModelGet[] | FetchError
 */

export async function fetchAllEducation(): Promise<
  EducationModelGet[] | FetchError
> {
  const endpoint = "education";
  return apiClient.allData<EducationModelGet[]>(endpoint, "Education");
}

/////////////////////////////////////---SECTOR---///////////////////////////////////////////

/**
 * get all sector
 * @param sector
 * @returns SectorModelGet[] | FetchError
 */

export async function fetchAllSector(): Promise<SectorModelGet[] | FetchError> {
  const endpoint = "school/sector";
  return apiClient.allData(endpoint, "sector");
}

/**
 * get all sector by education
 * @param sector
 * @returns SectorModelGet[] | FetchError
 */

export async function fetchAllSectorByEducation(
  id: string,
): Promise<SectorModelGet[] | FetchError> {
  const endpoint = `school/sector/education/${id}`;
  return apiClient.allData<SectorModelGet[]>(endpoint, "sector");
}

/**
 *  Create a sector
 * @param sector
 * @returns SectorModelGet | FetchError
 */
export async function createSectorAPI(
  sector: SectorModelNew,
): Promise<SectorModelGet | FetchError> {
  const endpoint = "school/sector";
  return apiClient.postData(endpoint, sector, "sector");
}

/**
 * delete sector
 * @param sector
 * @returns SectorModelGet | FetchError
 */
export async function deleteSectorAPI(
  id: string,
): Promise<SectorModelGet | FetchError> {
  const endpoint = `school/sector/${id}`;
  return apiClient.deleteData(endpoint, "sector");
}

/**
 *  update sector
 * @param sector
 * @returns SectorModelGet | FetchError
 */
export async function updateSectorAPI(
  education: SectorModelPut,
  id: string,
): Promise<SectorModelGet | FetchError> {
  const endpoint = `school/sector/${id}`;
  return apiClient.updateData(endpoint, education, "sector");
}

/////////////////////////////////////---TRADE---///////////////////////////////////////////

/**
 *  Create a trade
 * @param trade
 * @returns TradeModelGet | FetchError
 */
export async function createTradeAPI(
  trade: TradeModelNew,
): Promise<TradeModelGet | FetchError> {
  const endpoint = "school/trade";
  return apiClient.postData(endpoint, trade, "trade");
}

/**
 * get all trade
 * @param trade
 * @returns TradeModelGet[] | FetchError
 */

export async function fetchAllTrade(): Promise<TradeModelGet[] | FetchError> {
  const endpoint = "school/trade";
  return apiClient.allData(endpoint, "trade");
}

/**
 * delete trade
 * @param id
 * @returns TradeModelGet | FetchError
 */
export async function deleteTradeAPI(
  id: string,
): Promise<TradeModelGet | FetchError> {
  const endpoint = `school/trade/${id}`;
  return apiClient.deleteData(endpoint, "sector");
}

/**
 * update trade
 * @param TradeModelPut
 * @returns TradeModelGet | FetchError
 */
export async function updateTradeAPI(
  trade: TradeModelPut,
  id: string,
): Promise<TradeModelGet | FetchError> {
  const endpoint = `school/trade/${id}`;
  return apiClient.updateData(endpoint, trade, "sector");
}
/**
 * update trade
 * @param trade
 * @returns TradeModelGet | FetchError
 */
export async function getAllTradeABySectorPI(
  id: string,
): Promise<TradeModelGet[] | FetchError> {
  const endpoint = `school/trade/sector/${id}`;
  return apiClient.allData(endpoint, "sector");
}

/////////////////////////////////////---Class--ROOM--TYPE---///////////////////////////////////////////

/**
 *  Create a class room type
 * @param ClassRoomTypeModelGet
 * @returns ClassRoomTypeModelGet | FetchError
 */
export async function createClassRoomTypeAPI(
  classRoomType: ClassRoomTypeModelNew,
): Promise<ClassRoomTypeModelGet | FetchError> {
  const endpoint = "classes/room/type";
  return apiClient.postData(endpoint, classRoomType, "class room type");
}
/**
 *  update a class room type
 * @param ClassRoomTypeModelGet
 * @returns ClassRoomTypeModelGet | FetchError
 */
export async function updateClassRoomTypeAPI(
  classRoomType: ClassRoomTypeModelPut,
  id: string,
): Promise<ClassRoomTypeModelGet | FetchError> {
  const endpoint = `classes/room/type/${id}`;
  return apiClient.postData(endpoint, classRoomType, "class room type");
}

/**
 * get all class room type
 * @returns ClassRoomTypeModelGet[] | FetchError
 */

export async function fetchAllClassRoomType(): Promise<
  ClassRoomTypeModelGet[] | FetchError
> {
  const endpoint = "classes/room/type";
  return apiClient.allData(endpoint, "class room type");
}

/**
 * delete class room type
 * @param id
 * @returns ClassRoomTypeModelGet | FetchError
 */
export async function deleteClassRoomTypeAPI(
  id: string,
): Promise<ClassRoomTypeModelGet | FetchError> {
  const endpoint = `classes/room/type/${id}`;
  return apiClient.deleteData(endpoint, "class room type");
}

/////////////////////////////////////---Class--ROOM---///////////////////////////////////////////

/**
 *  Create a class room
 * @param ClassRoomModelNew
 * @returns ClassRoomModelGet | FetchError
 */
export async function createClassRoomAPI(
  classRoom: ClassRoomModelNew,
): Promise<ClassRoomModelGet | FetchError> {
  const endpoint = "classes/room";
  return apiClient.postData(endpoint, classRoom, "class room");
}

/**
 * get all  class room
 * @returns ClassTypeModelGet[] | FetchError
 */

export async function fetchAllClassesRoom(): Promise<
  ClassTypeModelGet[] | FetchError
> {
  const endpoint = "classes/room";
  return apiClient.allData(endpoint, "class room");
}

/**
 * delete class room
 * @param id
 * @returns ClassTypeModelGet | FetchError
 */
export async function deleteClassRoomAPI(
  id: string,
): Promise<ClassTypeModelGet | FetchError> {
  const endpoint = `classes/room/${id}`;
  return apiClient.deleteData(endpoint, "class room");
}
/**
 * get all class room by sector
 * @param id
 * @returns ClassTypeModelGet | FetchError
 */

export async function fetchAllClassRoomBySectorAPI(
  id: string,
): Promise<ClassTypeModelGet[] | FetchError> {
  const endpoint = `classes/room/sector/${id}`;
  return apiClient.allData(endpoint, "class room");
}

/**
 * get all class room by trade
 * @param id
 * @returns ClassTypeModelGet[] | FetchError
 */
export async function fetchAllClassRoomByTradeAPI(
  id: string,
): Promise<ClassTypeModelGet[] | FetchError> {
  const endpoint = `classes/room/trade/${id}`;
  return apiClient.allData(endpoint, "class room");
}

/**
 * update class room
 * @param ClassRoomModelPut
 * @returns Class | FetchError
 */
export async function updateClassRoomAPI(
  class_room: ClassRoomModelPut,
  id: string,
): Promise<ClassRoomModelGet | FetchError> {
  const endpoint = `classes/room/${id}`;
  return apiClient.updateData(endpoint, class_room, "class room");
}

/////////////////////////////////////---CLASS---///////////////////////////////////////////

/**
 *  Create a class
 * @param class
 * @returns ClassModelGet | FetchError
 */
export async function createClassAPI(
  classModel: ClassModelNew,
): Promise<ClassModelGet | FetchError> {
  const endpoint = "classes";
  return apiClient.postData(endpoint, classModel, "classes");
}

/**
 * get all class
 * @param class
 * @returns classModelGet[] | FetchError
 */

export async function fetchAllClasses(): Promise<ClassModelGet[] | FetchError> {
  const endpoint = "classes";
  return apiClient.allData(endpoint, "classes");
}

/**
 * delete class
 * @param id
 * @returns ClassModelGet | FetchError
 */
export async function deleteClassAPI(
  id: string,
): Promise<ClassModelGet | FetchError> {
  const endpoint = `classes/${id}`;
  return apiClient.deleteData(endpoint, "class");
}

/**
 * update class
 * @param id
 * @returns ClassModelGet | FetchError
 */
export async function updateClassAPI(
  classModel: ClassModelPut,
  id: string,
): Promise<ClassModelGet | FetchError> {
  const endpoint = `classes/${id}`;
  return apiClient.updateData(endpoint, classModel, "class");
}

/**
 * update class
 * @param id
 * @returns ClassModelGet | FetchError
 */
export async function getClassAPI(
  id: string,
): Promise<ClassModelGet | FetchError> {
  const endpoint = `classes/${id}`;
  return apiClient.allData(endpoint, "class");
}

/////////////////////////////////////---TYPE--CLASS---///////////////////////////////////////////

/**
 *  Create a class type
 * @param TradeModelNew
 * @returns ClassTypeModelGet | FetchError
 */
export async function createClassTypeAPI(
  classType: ClassTypeModelNew,
): Promise<ClassTypeModelGet | FetchError> {
  const endpoint = "classes/type";
  return apiClient.postData(endpoint, classType, "class type");
}

/**
 * get all class type
 * @returns ClassTypeModelGet[] | FetchError
 */

export async function fetchAllClassesType(): Promise<
  ClassTypeModelGet[] | FetchError
> {
  const endpoint = "classes/type";
  return apiClient.allData(endpoint, "class type");
}

/**
 * delete class type
 * @param id
 * @returns ClassTypeModelGet | FetchError
 */
export async function deleteClassTypeAPI(
  id: string,
): Promise<ClassTypeModelGet | FetchError> {
  const endpoint = `classes/type/${id}`;
  return apiClient.deleteData(endpoint, "class type");
}
/**
 * update class type
 * @param id
 * @returns ClassTypeModelGet | FetchError
 */
export async function updateClassTypeAPI(
  classType: ClassTypeModelPut,
  id: string,
): Promise<ClassTypeModelGet | FetchError> {
  const endpoint = `classes/type/${id}`;
  return apiClient.updateData(endpoint, classType, "class type");
}
