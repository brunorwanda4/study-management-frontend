import React from "react";
import UpdateUserEmailForm from "./form/update-user-email";
import UpdateAccountPrivacyForm from "./form/update-accout-privacy-form";
import UpdateUserPasswordForm from "./form/update-user-password-form";

const SettingPrivacyBody = () => {
  return (
    <div className=" flex flex-col space-y-4">
      <UpdateUserEmailForm />
      <UpdateUserPasswordForm />
      <UpdateAccountPrivacyForm />
    </div>
  );
};

export default SettingPrivacyBody;
