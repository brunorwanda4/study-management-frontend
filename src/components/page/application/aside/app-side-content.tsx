"use client";

import type { Locale } from "@/i18n";
import { mainCollections } from "@/lib/const/main-collections";
import type { ReactNode } from "react";

export type SidebarItem = {
  title: string;
  icon?: string;
  url?: string;
  children?: SidebarItem[];
  otherData1?: boolean;
};

export type sidebarGroupsProps = {
  label?: string;
  items: SidebarItem[];
  index?: number;
  lang?: Locale;
  otherData1?: ReactNode[];
};

// Sidebar configurations
export const adminSidebarGroups: sidebarGroupsProps[] = [
  {
    label: "Dashboard",
    items: [
      {
        title: "Dashboard",
        icon: "/icons/dashboard.png",
        url: "/a/",
      },
      {
        title: "Database",
        url: "/a/database",
        icon: "/icons/database.png",
      },
      {
        title: "Collections",
        icon: "/icons/data-collection.png",
        url: "/a/collections",
        children: mainCollections.map((col) => ({
          title: col.label,
          url: col.href,
          icon: col.icon,
        })),
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        title: "Settings",
        icon: "/icons/cogwheel.png",
        url: "/setting",
      },
    ],
  },
];

export const studentSidebarGroups: sidebarGroupsProps[] = [
  {
    //   label: "Dashboard",
    items: [
      {
        title: "School",
        icon: "/icons/school.png",
        url: "/school",
      },
      {
        title: "Class & school",
        icon: "/icons/blackboard.png",
        url: "/class",
        otherData1: true,
      },
      {
        title: "Notes",
        icon: "/icons/note.png",
        url: "/notes",
      },
    ],
  },
  {
    //   label: "Settings",
    items: [
      {
        title: "Messages",
        icon: "/icons/chat.png",
        url: "/messages",
      },
      {
        title: "Settings",
        icon: "/icons/cogwheel.png",
        url: "/setting",
      },
    ],
  },
];

export const teacherSidebarGroups: sidebarGroupsProps[] = [
  {
    //   label: "Dashboard",
    items: [
      {
        title: "School",
        icon: "/icons/school.png",
        url: "/school",
      },
      {
        title: "Class & school",
        icon: "/icons/blackboard.png",
        url: "/teacher",
      },
    ],
  },
  {
    //   label: "Settings",
    items: [
      {
        title: "Messages",
        icon: "/icons/chat.png",
        url: "/messages",
      },
      {
        title: "Settings",
        icon: "/icons/cogwheel.png",
        url: "/setting",
      },
    ],
  },
];

export const schoolStaffSidebarGroups: sidebarGroupsProps[] = [
  {
    label: "School Space",
    items: [
      {
        title: "Dashboard",
        icon: "/icons/dashboard.png",
        url: "/s-t",
      },
      {
        title: "School Overview",
        icon: "/icons/school.png",
        url: "/s-t/school",
      },
      {
        title: "Calendar",
        icon: "/icons/attendance/online.png",
        url: "/s-t/calendar",
      },
    ],
  },

  {
    label: "Members",
    items: [
      {
        title: "Students",
        icon: "/icons/student.png",
        url: "/s-t/students",
      },
      {
        title: "Teachers",
        icon: "/icons/teacher.png",
        url: "/s-t/teachers",
      },
      {
        title: "Staff",
        icon: "/icons/staff.png",
        url: "/s-t/staffs",
      },
    ],
  },

  {
    label: "Academics",
    items: [
      {
        title: "Classes",
        icon: "/icons/classroom.png",
        url: "/s-t/classes",
      },
      {
        title: "Timetable & Schedule",
        icon: "/icons/timetable.png",
        url: "/s-t/timetable",
      },
      {
        title: "Performance & Exams",
        icon: "/icons/performance.png",
        url: "/s-t/performance",
      },
      {
        title: "Attendance",
        icon: "/icons/attendance/manual.png",
        url: "/s-t/attendance",
      },
    ],
  },

  {
    label: "Communication",
    items: [
      {
        title: "Announcements",
        icon: "/icons/announcement.png",
        url: "/s-t/announcements",
      },
      {
        title: "Join School Requests",
        icon: "/icons/request.png",
        url: "/s-t/join-school-requests",
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        title: "School Settings",
        icon: "/icons/settings.png",
        url: "/s-t/settings",
      },
    ],
  },

  // 👇 USER-LEVEL SECTION
  {
    label: "For You",
    items: [
      {
        title: "Messages",
        icon: "/icons/chat.png",
        url: "/messages",
      },
      {
        title: "Settings",
        icon: "/icons/cogwheel.png",
        url: "/setting",
      },
    ],
  },
];
