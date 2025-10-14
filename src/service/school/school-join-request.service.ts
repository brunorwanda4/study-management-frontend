import { JoinSchoolDto } from "@/lib/schema/school/join-school-schema";
import { CreateJoinSchoolRequestDto } from "@/lib/schema/school/school-join-school/create-school-join-request";
import {
  SchoolJoinRequestAndOther,
  SchoolJoinRequestAndSchool,
  SchoolJoinRequestAndToken,
  SchoolJoinRequestDto,
} from "@/lib/schema/school/school-join-school/school-join-request.schema";
import { SendJoinSchoolRequestDto } from "@/lib/schema/school/school-join-school/send-join-school-request.schema";
import { getUserToken, setSchoolCookies } from "@/lib/utils/auth-cookies";
import apiRequest from "../api-client";

export const GetAllJoinSchoolRequestByCurrentUserEmail = async (
  email: string,
) => {
  return await apiRequest<void, SchoolJoinRequestAndSchool[]>(
    "get",
    `/school-join-requests/by-email/${email}`,
  );
};

export const approvedSchoolJoinRequestByCurrentUser = async (id: string) => {
  const [token, currentUser] = await Promise.all([
    await getUserToken(),
    await authContext(),
  ]);
  if (!token) {
    return { error: "User token not found, it look like you not login 😔" };
  }
  const request = await apiRequest<void, SchoolJoinRequestAndToken>(
    "patch",
    `/school-join-requests/${id}/accept`,
    undefined,
    token.token,
  );
  if (!request.data) return request;
  if (currentUser?.role) {
    await setSchoolCookies(request.data.token, currentUser.role);
  }
  return request;
};

export const RejectSchoolJoinRequestByCurrentUser = async (id: string) => {
  return await apiRequest<void, SchoolJoinRequestDto>(
    "patch",
    `/school-join-requests/${id}/reject`,
  );
};

export const JoinSchoolByUsernameAndCode = async (
  joinSchoolDto: JoinSchoolDto,
) => {
  const [token, currentUser] = await Promise.all([
    await getUserToken(),
    await authContext(),
  ]);
  if (!token) {
    return { error: "User token not found, it look like you not login 😔" };
  }
  const request = await apiRequest<JoinSchoolDto, SchoolJoinRequestAndToken>(
    "post",
    `/school-join-requests/join`,
    joinSchoolDto,
    token.token,
  );
  if (!request.data) return request;
  if (currentUser?.role) {
    await setSchoolCookies(request.data.token, currentUser.role);
  }
  return request;
};

export const CreateSchoolJoinRequest = async (
  schoolJoinRequestDto: SendJoinSchoolRequestDto,
) => {
  const data = {
    ...schoolJoinRequestDto,
    schoolId: schoolJoinRequestDto.schoolId,
    role: schoolJoinRequestDto.staffRole || schoolJoinRequestDto.role,
    classId: schoolJoinRequestDto.classId,
  };
  return await apiRequest<
    CreateJoinSchoolRequestDto,
    SchoolJoinRequestAndSchool
  >("post", `/school-join-requests`, data);
};

export const GetAllSchoolJoinRequestBySchoolId = async (schoolId: string) => {
  return await apiRequest<void, SchoolJoinRequestAndOther[]>(
    "get",
    `/school-join-requests?schoolId=${schoolId}`,
  );
};

export const deleteSchoolJoinRequestById = async (id: string) => {
  return await apiRequest<void, SchoolJoinRequestDto>(
    "delete",
    `/school-join-requests/${id}`,
  );
};
