// utils/profileImage.ts

import { Gender } from "@/lib/types/Gender";

/**
 * Get a random profile image URL based on gender.
 * @param gender - "MALE" | "FEMALE" | "OTHER" (optional)
 * @returns A string URL like "/profiles/g/17.png"
 */
export function generateImageProfile(gender?: Gender): string {
  // default to random gender if none provided
  const selectedGender = gender || getRandomGender();

  let folder = "";
  let max = 0;

  switch (selectedGender) {
    case "MALE":
      folder = "b"; // profiles/b/
      max = 31;
      break;
    case "FEMALE":
      folder = "g"; // profiles/g/
      max = 36;
      break;
    case "OTHER":
      folder = "o"; // profiles/o/
      max = 9;
      break;
    default:
      throw new Error("Invalid gender provided");
  }

  const number = Math.floor(Math.random() * max) + 1;
  return `/profiles/${folder}/${number}.png`;
}

// helper function to randomly pick a gender
function getRandomGender(): Gender {
  const genders: Gender[] = ["MALE", "FEMALE", "OTHER"];
  const index = Math.floor(Math.random() * genders.length);
  return genders[index];
}

export const generateEducationIcon = () => {
  const images = ["education", "graduation-hat"];
  const index = Math.floor(Math.random() * images.length);
  return `/icons/${index}.png`;
};
