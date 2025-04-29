import ProfileAside from "@/components/profile/profile-aside";
import ProfileStudentClassesCard from "@/components/profile/student/profile-student-classes-card";
import StudentPerformanceCard from "@/components/profile/student/student-perfomance-card";
import UserFavoriteSubjects from "@/components/profile/user-favorite-subjects";

const ProfilePageById = () => {
  return (
    <div className=" px-4 py-2 space-x-4 md:space-y-4 flex">
      <ProfileAside />
      <div className=" w-2/3 space-y-4">
        <UserFavoriteSubjects />
        <StudentPerformanceCard />
        {/* TODO: add locale language */}
        <ProfileStudentClassesCard lang="en"/>
      </div>
    </div>
  );
};

export default ProfilePageById;
