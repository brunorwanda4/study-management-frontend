"use client";

import { Locale } from "@/i18n";
import { ReactNode } from "react";

// Define type for sidebar items
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
        url: "/school-staff",
      },
      {
        title: "School",
        icon: "/icons/school.png",
        url: "/school",
      },
      {
        title: "Calendar",
        icon: "/icons/event.png",
        url: "/school-staff/calendars",
      },
    ],
  },
  {
    label : "School",
    items : [
      {
        title: "Students",
        icon: "/icons/students.png",
        url: "/school-staff/students",
      },
      {
        title: "Teachers",
        icon: "/icons/teacher.png",
        url: "/school-staff/teachers",
      },
      {
        title: "Classes",
        icon: "/icons/blackboard.png",
        url: "/school-staff/classes",
      },
      // {
      //   title: "Subjects & Curriculum",
      //   icon: "/icons/book-stack.png",
      //   url: "/school-staff/subjects",
      // },
      // {
      //   title: "Academic & Performance",
      //   icon: "/icons/academic.png",
      //   url: "/school-staff/academics",
      // },
      // {
      //   title: "School Announcements",
      //   icon: "/icons/bell.png",
      //   url: "/school-staff/notifications",
      // },
      // {
      //   title: "Extracurricular Activities",
      //   icon: "/icons/extracurricular.png",
      //   url: "/school-staff/extracurricular",
      // },
      // {
      //   title: "Parental & Guardian",
      //   icon: "/icons/family.png",
      //   url: "/school-staff/parents",
      // },
      // {
      //   title: "Security & User Access",
      //   icon: "/icons/shield.png",
      //   url: "/school-staff/Securities",
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
