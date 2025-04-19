import { CreateSchoolDto, CreateSchoolDtoBackend } from "@/lib/schema/school.dto";
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

    const res = await apiRequest<CreateSchoolDtoBackend, SchoolDto>('post', '/school', data);

    return res
};