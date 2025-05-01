"use client";

import { Locale } from "@/i18n";
import { ReactNode } from "react";

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
        url: "/admin/",
      },
      {
        title: "Database",
        url: "/admin/database",
      },
      {
        title: "Collections",
        url: "/admin/collections",
      },
    ],
  },
  {
    label: "Main collections",
    items: [
      {
        title: "Users",
        url: "/collection/users",
        children: [
          { title: "Students", url: "/admin/users/students" },
          { title: "Teachers", url: "/admin/users/teachers" },
          { title: "Manage Users", url: "/admin/users/crud" },
        ],
      },
      {
        title: "Classes",
        children: [
          { title: "All Classes", url: "/admin/classes/all" },
          { title: "Create Class", url: "/admin/classes/create" },
          { title: "Manage Classes", url: "/admin/classes/manage" },
        ],
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        title: "Settings",
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
      label: "Dashboard",
    items: [
      {
        title: "Dashboard",
        icon: "/icons/dashboard.png",
        url: "/s-t",
      },
      {
        title: "School",
        icon: "/icons/school.png",
        url: "/school",
      },
      {
        title: "Calendar",
        icon: "/icons/event.png",
        url: "/s-t/calendar",
      },
      {
        title: "Join school requests",
        icon: "/icons/request.png",
        url: "/s-t/join-school-requests",
      },
    ],
  },
  {
    label : "Your school",
    items : [
      {
        title: "Students",
        icon: "/icons/students.png",
        url: "/s-t/students",
      },
      {
        title: "Teachers",
        icon: "/icons/teacher.png",
        url: "/s-t/teachers",
      },
      {
        title: "Classes",
        icon: "/icons/classroom.png",
        url: "/s-t/classes",
      },
      {
        title: "Staff",
        icon: "/icons/staff.png",
        url: "/s-t/staffs",
      },
      {
        title: "School Setting",
        icon: "/icons/settings.png",
        url: "/s-t/settings",
      },
      // {
      //   title: "Subjects & Curriculum",
      //   icon: "/icons/book-stack.png",
      //   url: "/s-t/subjects",
      // },
      // {
      //   title: "Academic & Performance",
      //   icon: "/icons/academic.png",
      //   url: "/s-t/academics",
      // },
      // {
      //   title: "School Announcements",
      //   icon: "/icons/bell.png",
      //   url: "/s-t/notifications",
      // },
      // {
      //   title: "Extracurricular Activities",
      //   icon: "/icons/extracurricular.png",
      //   url: "/s-t/extracurricular",
      // },
      // {
      //   title: "Parental & Guardian",
      //   icon: "/icons/family.png",
      //   url: "/s-t/parents",
      // },
      // {
      //   title: "Security & User Access",
      //   icon: "/icons/shield.png",
      //   url: "/s-t/Securities",
      // },
    ]
  },
  {
      label: "For you",
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
