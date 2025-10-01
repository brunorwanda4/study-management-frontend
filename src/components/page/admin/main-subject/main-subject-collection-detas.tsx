"use client";
import DataDetailsCard, {
  dataDetailsCardProps,
} from "@/components/common/cards/data-details-card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { useEffect, useState } from "react";

interface Props {
  initialSubjects?: MainSubject[];
}

const SubjectCollectionDetails = ({ initialSubjects = [] }: Props) => {
  const { data: subjects } = useRealtimeData<MainSubject>();
  const [displaySubjects, setDisplaySubjects] =
    useState<MainSubject[]>(initialSubjects);

  // Sync with realtime data when available
  useEffect(() => {
    if (subjects && subjects.length > 0) {
      setDisplaySubjects(subjects);
    }
  }, [subjects]);

  // --- Aggregations ---
  const totalSubjects = displaySubjects.length;

  const categoryCount = displaySubjects.reduce<Record<string, number>>(
    (acc, subject) => {
      const category = subject.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {},
  );

  const levelCount = displaySubjects.reduce<Record<string, number>>(
    (acc, subject) => {
      const level = subject.level || "Not Specified";
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    },
    {},
  );

  const activeSubjects = displaySubjects.filter(
    (subject) => subject.is_active,
  ).length;

  const totalEstimatedHours = displaySubjects.reduce(
    (sum, subject) => sum + (subject.estimated_hours || 0),
    0,
  );

  const averageHoursPerSubject =
    totalSubjects > 0 ? Math.round(totalEstimatedHours / totalSubjects) : 0;

  // --- Cards configuration ---
  const cards: dataDetailsCardProps[] = [
    {
      title: "Total Subjects",
      size: totalSubjects,
      icon: "/icons/graduation-hat.png",
    },
    {
      title: "Active Subjects",
      size: activeSubjects,
      icon: "/icons/checked.png",
    },
    {
      title: "By Category",
      size: Object.keys(categoryCount).length,
      icon: "/icons/category.png",
      items: Object.entries(categoryCount).map(([key, value]) => ({
        key,
        value,
      })),
    },
    {
      title: "By Level",
      size: Object.keys(levelCount).length,
      icon: "/icons/levels.png",
      items: Object.entries(levelCount).map(([key, value]) => ({
        key,
        value,
      })),
    },
    {
      title: "Total Hours",
      size: totalEstimatedHours,
      icon: "/icons/clock.png",
    },
    {
      title: "Avg Hours/Subject",
      size: averageHoursPerSubject,
      icon: "/icons/average.png",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((card, index) => (
        <DataDetailsCard
          key={index}
          title={card.title}
          icon={card.icon}
          size={card.size}
          items={card.items}
        />
      ))}
    </section>
  );
};

export default SubjectCollectionDetails;
