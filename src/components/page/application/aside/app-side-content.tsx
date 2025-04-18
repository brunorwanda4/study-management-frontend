"use client";
import { AiFillDatabase } from "react-icons/ai";
import { TfiLayoutGrid3 } from "react-icons/tfi";

import { AiOutlineSetting } from "react-icons/ai";
import { LiaUsersSolid } from "react-icons/lia";
import { MdClass } from "react-icons/md";
import { CiGrid31 } from "react-icons/ci";
import { Locale } from "@/i18n";
import { ReactNode } from "react";

// Define type for sidebar items
export type SidebarItem = {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  image?: string;
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
        icon: CiGrid31,
        url: "/admin/",
      },
      {
        title: "Database",
        icon: AiFillDatabase,
        url: "/admin/database",
      },
      {
        title: "Collections",
        icon: TfiLayoutGrid3,
        url: "/admin/collections",
      },
    ],
  },
  {
    label: "Main collections",
    items: [
      {
        title: "Users",
        icon: LiaUsersSolid,
        url: "/collection/users",
        children: [
          { title: "Students", url: "/admin/users/students" },
          { title: "Teachers", url: "/admin/users/teachers" },
          { title: "Manage Users", url: "/admin/users/crud" },
        ],
      },
      {
        title: "Classes",
        icon: MdClass,
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
        icon: AiOutlineSetting,
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
        image: "/icons/school.png",
        url: "/school",
      },
      {
        title: "Class & school",
        image: "/icons/blackboard.png",
        url: "/class",
        otherData1: true,
      },
      {
        title: "Notes",
        image: "/icons/note.png",
        url: "/notes",
      },
    ],
  },
  {
    //   label: "Settings",
    items: [
      {
        title: "Messages",
        image: "/icons/chat.png",
        url: "/messages",
      },
      {
        title: "Settings",
        image: "/icons/cogwheel.png",
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
        image: "/icons/school.png",
        url: "/school",
      },
      {
        title: "Class & school",
        image: "/icons/blackboard.png",
        url: "/teacher",
      },
    ],
  },
  {
    //   label: "Settings",
    items: [
      {
        title: "Messages",
        image: "/icons/chat.png",
        url: "/messages",
      },
      {
        title: "Settings",
        image: "/icons/cogwheel.png",
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
        image: "/icons/dashboard.png",
        url: "/school-staff",
      },
      {
        title: "School",
        image: "/icons/school.png",
        url: "/school",
      },
      {
        title: "Calendar",
        image: "/icons/event.png",
        url: "/school-staff/calendars",
      },
    ],
  },
  {
    label : "School",
    items : [
      {
        title: "Students",
        image: "/icons/students.png",
        url: "/school-staff/students",
      },
      {
        title: "Teachers",
        image: "/icons/teacher.png",
        url: "/school-staff/teachers",
      },
      {
        title: "Classes",
        image: "/icons/blackboard.png",
        url: "/school-staff/classes",
      },
      {
        title: "Subjects & Curriculum",
        image: "/icons/book-stack.png",
        url: "/school-staff/subjects",
      },
      {
        title: "Academic & Performance",
        image: "/icons/academic.png",
        url: "/school-staff/academics",
      },
      {
        title: "School Announcements",
        image: "/icons/bell.png",
        url: "/school-staff/notifications",
      },
      {
        title: "Extracurricular Activities",
        image: "/icons/extracurricular.png",
        url: "/school-staff/extracurricular",
      },
      {
        title: "Parental & Guardian",
        image: "/icons/family.png",
        url: "/school-staff/parents",
      },
      {
        title: "Security & User Access",
        image: "/icons/shield.png",
        url: "/school-staff/Securities",
      },
    ]
  },
  {
      label: "For you",
    items: [
      {
        title: "Messages",
        image: "/icons/chat.png",
        url: "/messages",
      },
      {
        title: "Settings",
        image: "/icons/cogwheel.png",
        url: "/setting",
      },
    ],
  },
];
