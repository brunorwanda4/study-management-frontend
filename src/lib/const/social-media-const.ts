export interface SocialMediaPlatform {
  name: string;
  urlRegex: RegExp;
  urlTemplate: string;
  icon: string;
}

export const SocialMediaPlatformsList: SocialMediaPlatform[] = [
  {
    name: "Facebook",
    urlRegex: /facebook\.com/i,
    urlTemplate: "https://www.facebook.com/{username}",
    icon: "/icons/facebook.png",
  },
  {
    name: "Twitter",
    urlRegex: /twitter\.com|x\.com/i,
    urlTemplate: "https://www.twitter.com/{username}",
    icon: "/icons/twitter.png",
  },
  {
    name: "Instagram",
    urlRegex: /instagram\.com/i,
    urlTemplate: "https://www.instagram.com/{username}",
    icon: "/icons/instagram.png",
  },
  {
    name: "LinkedIn",
    urlRegex: /linkedin\.com/i,
    urlTemplate: "https://www.linkedin.com/in/{username}",
    icon: "/icons/linkedin.png",
  },
  {
    name: "YouTube",
    urlRegex: /youtube\.com|youtu\.be/i,
    urlTemplate: "https://www.youtube.com/@{username}", // Corrected YouTube template
    icon: "/icons/youtube.png",
  },
  {
    name: "Threads",
    urlRegex: /threads\.com|threads\.be/i,
    urlTemplate: "https://www.threads.com/@{username}", // Corrected YouTube template
    icon: "/icons/threads.png",
  },
  {
    name: "Other",
    urlRegex: /.*/i, // Catch-all, should be last
    urlTemplate: "{username}", // Or just the direct link
    icon: "/icons/chain.png",
  },
];

export const DefaultPlatform = "Other";
export const OtherPlatformIcon =
  SocialMediaPlatformsList.find((p) => p.name === DefaultPlatform)?.icon ||
  "/icons/linkedin.png";
