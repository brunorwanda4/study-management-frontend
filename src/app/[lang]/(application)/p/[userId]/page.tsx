import ProfileAside from "@/components/profile/profile-aside";
import UserFavoriteSubjects from "@/components/profile/user-favorite-subjects";

const ProfilePageById = () => {
  return (
    <div className=" px-4 py-2 space-x-4 md:space-y-4 flex">
      <ProfileAside />
      <div className=" w-2/3">
        <UserFavoriteSubjects />
      </div>
    </div>
  );
};

export default ProfilePageById;
