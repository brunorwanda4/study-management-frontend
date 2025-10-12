import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Option } from "@/components/ui/multiselect";
import { Locale } from "@/i18n";
import {
  AdvancedLevels,
  OptionalSubjects,
  TvetPrograms,
} from "@/lib/context/school.context";
import { SchoolDto } from "@/lib/schema/school/school.dto";
import { BookOpen, Dot } from "lucide-react"; // Added BookOpen for variety
import Link from "next/link";
import { FaSchool } from "react-icons/fa6";
import { MdOutlineSchool, MdSchool } from "react-icons/md";

interface SchoolHomeAboutProps {
  lang: Locale;
  isAboutSchool?: boolean;
  school: SchoolDto;
}

// Helper function to map subject values to labels
const getSubjectLabels = (
  subjectValues?: string[],
  subjectOptions?: Option[],
): string[] => {
  if (!subjectValues || subjectValues.length === 0) {
    return [];
  }
  // If no specific options list is provided, return the values themselves (or handle as error)
  if (!subjectOptions || subjectOptions.length === 0) {
    return subjectValues;
  }
  return subjectValues
    .map((value) => {
      const option = subjectOptions.find((opt) => opt.value === value);
      return option ? option.label : value; // Fallback to the value itself if not found
    })
    .filter((label) => label != null) as string[]; // Ensure all are strings
};

const SchoolHomeAbout = ({
  lang,
  isAboutSchool,
  school,
}: SchoolHomeAboutProps) => {
  const { academicProfile } = school;

  return (
    <Card className="w-full space-y-4 p-4 md:p-6">
      {/* School Description Section */}
      <CardHeader className="space-y-1 border-0">
        <div className="flex items-center space-x-2">
          <FaSchool className="text-xl" />
          <h3 className="text-lg font-semibold">About School</h3>
        </div>
        {school.description && <p className="text-sm">{school.description}</p>}
      </CardHeader>

      <CardContent className="space-y-6">
        {" "}
        {/* Increased spacing for better separation */}
        {/* School Curriculum Section */}
        <div className="space-y-2">
          <div className="text-myGray flex items-center space-x-2">
            {" "}
            {/* Assuming myGray is a custom color */}
            <MdSchool className="text-xl" />
            <h4 className="text-md font-semibold">School Curriculum</h4>
          </div>
          <div className="space-y-2 pl-2">
            {school.curriculum.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Dot size={28} className="-ml-1" /> {/* Adjusted dot styling */}
                {/* <Avatar className="size-8 border border-gray-200">
                  <AvatarImage
                    src={
                      item === "TVET"
                        ? "/images/logortb.jpg" // Ensure this path is correct relative to your `public` folder
                        : item === "REB"
                        ? "/images/REB_Logo.png" // Ensure this path is correct
                        : "/images/default_curriculum_logo.png" // Fallback logo
                    }
                    alt={`${item} curriculum logo`}
                    // onError={(e) =>
                    //   (e.currentTarget.src =
                    //     "https://placehold.co/32x32/E0E0E0/B0B0B0?text=Logo")
                    // }
                  />
                  <AvatarFallback>LOGO</AvatarFallback>
                </Avatar> */}
                <h6 className="text-sm font-medium">{item}</h6>
              </div>
            ))}
          </div>
        </div>
        {/* Schooling Type Section (Boarding/Days) - Static as per original */}
        <div className="space-y-2">
          <div className="text-myGray flex items-center space-x-2">
            <MdOutlineSchool className="text-xl" />
            <h4 className="text-md font-semibold">Schooling Type</h4>
          </div>
          <div className="space-y-1 pl-2">
            <div className="flex items-center space-x-2">
              <Dot size={28} className="-ml-1" />
              <h6 className="text-sm font-medium">Boarding</h6>
            </div>
            <div className="flex items-center space-x-2">
              <Dot size={28} className="-ml-1" />
              <h6 className="text-sm font-medium">Day Scholars</h6>
            </div>
          </div>
        </div>
        {/* Detailed Academic Information (conditionally rendered) */}
        {isAboutSchool && (
          <div className="space-y-6">
            {" "}
            {/* Increased spacing for better separation */}
            {/* Education Levels Offered Section */}
            {school.educationLevel && school.educationLevel.length > 0 && (
              <div className="space-y-2">
                <div className="text-myGray flex items-center space-x-2">
                  <BookOpen className="text-xl" />{" "}
                  {/* Using a different icon */}
                  <h4 className="text-md font-semibold">
                    Education Levels Offered
                  </h4>
                </div>
                <div className="space-y-1 pl-2">
                  {school.educationLevel.map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Dot size={28} className="-ml-1" />
                      <h6 className="text-sm font-medium">{level}</h6>
                      <span className="text-xs">
                        {level === "Primary"
                          ? "(P1 - P6)"
                          : level === "OLevel"
                            ? "(S1 - S3)"
                            : level === "ALevel"
                              ? "(S4 - S6)"
                              : null}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Academic Programs Section */}
            {academicProfile && (
              <>
                {/* Primary School Subjects */}
                {/* {academicProfile.primarySubjectsOffered &&
                  academicProfile.primarySubjectsOffered.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex space-x-2 items-center text-myGray">
                        <MdSchool className="text-xl " />
                        <h4 className="font-semibold text-md   ">
                          Primary School Subjects
                        </h4>
                      </div>
                      <div className="space-y-1 pl-2">
                        {getSubjectLabels(
                          academicProfile.primarySubjectsOffered,
                          PrimarySubjects
                        ).map((label) => (
                          <div
                            key={`primary-${label}`}
                            className="flex items-center space-x-2"
                          >
                            <Dot size={28} className=" -ml-1" />
                            <h6 className="font-medium    text-sm">
                              {label}
                            </h6>
                          </div>
                        ))}
                      </div>
                    </div>
                  )} */}

                {/* O-Level Subjects */}
                {/* {(academicProfile.oLevelOptionSubjects?.length || 0) > 0 && (
                  <div className="space-y-2">
                    <div className="flex space-x-2 items-center text-myGray">
                      <MdOutlineSchool className="text-xl" />
                      <h4 className="font-semibold text-md   ">
                        O-Level Subjects
                      </h4>
                    </div>
                    {academicProfile.oLevelCoreSubjects &&
                      academicProfile.oLevelCoreSubjects.length > 0 && (
                        <div className="ml-4 space-y-1 mt-1">
                          <p className="text-xs font-semibold   ">
                            Core Subjects:
                          </p>
                          {getSubjectLabels(
                            academicProfile.oLevelCoreSubjects,
                            OLevelSubjects
                          ).map((label) => (
                            <div
                              key={`olevel-core-${label}`}
                              className="flex items-center space-x-2"
                            >
                              <Dot
                                size={24}
                                className="   -ml-1"
                              />
                              <h6 className="font-medium    text-sm">
                                {label}
                              </h6>
                            </div>
                          ))}
                        </div>
                      )}
                    {academicProfile.oLevelOptionSubjects &&
                      academicProfile.oLevelOptionSubjects.length > 0 && (
                        <div className="ml-4 space-y-1 mt-2">
                          <p className="text-xs font-semibold   ">
                            Optional Subjects:
                          </p>
                          {getSubjectLabels(
                            academicProfile.oLevelOptionSubjects,
                            OptionalSubjects
                          ).map((label) => (
                            <div
                              key={`olevel-opt-${label}`}
                              className="flex items-center space-x-2"
                            >
                              <Dot
                                size={24}
                                className="   -ml-1"
                              />
                              <h6 className="font-medium    text-sm">
                                {label}
                              </h6>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                )} */}

                {/* A-Level Combinations & Optional Subjects */}
                {(academicProfile.aLevelOptionSubjects?.length || 0) > 0 && (
                  <div className="space-y-2">
                    <div className="text-myGray flex items-center space-x-2">
                      <BookOpen className="text-xl" />
                      <h4 className="text-md font-semibold">
                        A-Level Programs
                      </h4>
                    </div>
                    {academicProfile.aLevelSubjectCombination &&
                      academicProfile.aLevelSubjectCombination.length > 0 && (
                        <div className="mt-1 ml-4 space-y-1">
                          <p className="text-xs font-semibold">
                            Subject Combinations:
                          </p>
                          {getSubjectLabels(
                            academicProfile.aLevelSubjectCombination,
                            AdvancedLevels,
                          ).map((label) => (
                            <div
                              key={`alevel-combo-${label}`}
                              className="flex items-center space-x-2"
                            >
                              <Dot size={24} className="-ml-1" />
                              <h6 className="text-sm font-medium">{label}</h6>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                )}

                {/* TVET Programs */}
                {(academicProfile.tvetSpecialization?.length || 0) > 0 ||
                  ((academicProfile.tvetOptionSubjects?.length || 0) > 0 && (
                    <div className="space-y-2">
                      <div className="text-myGray flex items-center space-x-2">
                        <FaSchool className="text-xl" />{" "}
                        {/* Changed icon for TVET */}
                        <h4 className="text-md font-semibold">TVET Programs</h4>
                      </div>
                      {academicProfile.tvetSpecialization &&
                        academicProfile.tvetSpecialization.length > 0 && (
                          <div className="mt-1 ml-4 space-y-1">
                            <p className="text-xs font-semibold">
                              Specializations:
                            </p>
                            {getSubjectLabels(
                              academicProfile.tvetSpecialization,
                              TvetPrograms,
                            ).map((label) => (
                              <div
                                key={`tvet-spec-${label}`}
                                className="flex items-center space-x-2"
                              >
                                <Dot size={24} className="-ml-1" />
                                <h6 className="text-sm font-medium">{label}</h6>
                              </div>
                            ))}
                          </div>
                        )}
                      {academicProfile.tvetOptionSubjects &&
                        academicProfile.tvetOptionSubjects.length > 0 && (
                          <div className="mt-2 ml-4 space-y-1">
                            <p className="text-xs font-semibold">
                              Optional Subjects (TVET):
                            </p>
                            {/* Ensure you have a relevant list for TVET optional subjects, using OptionalSubjects as a placeholder */}
                            {getSubjectLabels(
                              academicProfile.tvetOptionSubjects,
                              OptionalSubjects,
                            ).map((label) => (
                              <div
                                key={`tvet-opt-${label}`}
                                className="flex items-center space-x-2"
                              >
                                <Dot size={24} className="-ml-1" />
                                <h6 className="text-sm font-medium">{label}</h6>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
              </>
            )}
          </div>
        )}
      </CardContent>

      {/* "See more" Button Section */}
      {!isAboutSchool && (
        <Link href={`/${lang}/school/about`} className="mt-6 block">
          {" "}
          {/* Added margin top */}
          <Button variant="ghost" size="sm" className="w-full">
            See more about school
          </Button>
        </Link>
      )}
    </Card>
  );
};

export default SchoolHomeAbout;
