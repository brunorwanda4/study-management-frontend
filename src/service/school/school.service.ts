import { CreateSchoolDto, CreateSchoolDtoBackend, SchoolAcademicCreationDto, schoolAcademicDto, SchoolAcademicDtoBackend, SchoolAdministrationDto, SchoolAndOthers, sendAdministrationJoinRequestsDto } from "@/lib/schema/school.dto";
import { SchoolDto } from "@/lib/schema/school.dto";
import apiRequest from "../api-client";

export const createSchoolService = async (input: CreateSchoolDto) => {
    const data: CreateSchoolDtoBackend = {
        creatorId: input.creatorId,
        username: input.username,
        name: input.name,
        logo: input.logo,
        description: input.description,
        schoolType: input.schoolType,
        curriculum: input.curriculum.map(c => c.value),
        educationLevel: input.educationLevel.map(e => e.value),
        schoolMembers: input.schoolMembers,
        accreditationNumber: input.accreditationNumber,
        affiliation: input.affiliation as "Government" | "Religious" | "NGO" | "independent" | undefined,
        address: input.address,
        contact: input.contact,
        website: input.website,
        socialMedia: input.socialMedia,
        studentCapacity: input.studentCapacity,
        uniformRequired: input.uniformRequired,
        attendanceSystem: input.attendanceSystem,
        scholarshipAvailable: input.scholarshipAvailable,
        classrooms: input.classrooms,
        library: input.library,
        labs: input.labs?.map(lab => lab.value),
        sportsExtracurricular: input.sportsExtracurricular?.map(sport => sport.value),
        onlineClasses: input.onlineClasses,
    };

    return await apiRequest<CreateSchoolDtoBackend, SchoolDto>('post', '/school', data);
};

export const getSchoolByIdService = async (id: string) => {
    return await apiRequest<void, SchoolAndOthers>("get", `/school/${id}`);
}

export const academicSchoolService = async (input: schoolAcademicDto) => {
    const data: SchoolAcademicDtoBackend = {
        schoolId: input.schoolId,
        // assessmentTypes: input.assessmentTypes,
        primarySubjectsOffered: input.primarySubjectsOffered,
        primaryPassMark: input.primaryPassMark,

        oLevelCoreSubjects: input.oLevelCoreSubjects,
        oLevelOptionSubjects: input.oLevelOptionSubjects,
        oLevelExaminationTypes: input.oLevelExaminationTypes,
        oLevelAssessment: input.oLevelAssessment,

        aLevelSubjectCombination: input.aLevelSubjectCombination?.map(item => item.value),
        aLevelOptionSubjects: input.aLevelOptionSubjects,
        aLevelPassMark: input.aLevelPassMark,

        tvetSpecialization: input.tvetSpecialization?.map(item => item.value),
        tvetOptionSubjects: input.tvetOptionSubjects,
    }

    return await apiRequest<SchoolAcademicDtoBackend, SchoolAcademicCreationDto>("post", "/school/academic", data);
}


export const administrationSchoolRequestToJoinSchool = async (input : SchoolAdministrationDto) => {
    return await apiRequest<SchoolAdministrationDto, sendAdministrationJoinRequestsDto>("post", `/school/administration`, input);
}


