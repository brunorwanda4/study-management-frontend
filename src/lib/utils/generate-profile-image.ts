import { Gender } from "@/lib/schema/common-details-schema";

/**
 * Generate a deterministic profile image URL based on name and gender.
 * @param name - Full name or username.
 * @param gender - "MALE" | "FEMALE" | "OTHER" (optional)
 * @returns A string URL like "/profiles/g/17.png"
 */
export function generateImageProfile(
  name: string,
  gender?: Gender | null,
): string {
  const selectedGender = gender || getRandomGender();

  // Folder and max number per gender
  const genderConfig = {
    MALE: { folder: "b", max: 31 },
    FEMALE: { folder: "g", max: 36 },
    OTHER: { folder: "o", max: 9 },
  } as const;

  const { folder, max } = genderConfig[selectedGender];

  // Determine image number based on name’s first letter
  const firstChar = name.trim().charAt(0).toLowerCase();
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const position = alphabet.indexOf(firstChar);

  // If not a letter, pick a random number
  const base =
    position >= 0 ? position + 1 : Math.floor(Math.random() * max) + 1;

  // Create a pseudo-random but deterministic number within available range
  const number = ((base * 7 + name.length) % max) + 1;

  return `/profiles/${folder}/${number}.png`;
}

/**
 * Helper: Random gender if none provided
 */
function getRandomGender(): Gender {
  const genders: Gender[] = ["MALE", "FEMALE", "OTHER"];
  return genders[Math.floor(Math.random() * genders.length)];
}

/**
 * Optional: Generate random education icon
 */
export const generateEducationIcon = (): string => {
  const images = ["education", "graduation-hat"];
  const index = Math.floor(Math.random() * images.length);
  return `/icons/${images[index]}.png`;
};
