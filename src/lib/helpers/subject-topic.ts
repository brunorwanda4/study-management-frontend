import type { TemplateTopic } from "../schema/subject/template-schema";

export const transformTopic = (topic: TemplateTopic): any => {
  return {
    order: topic.order,
    title: topic.title,

    estimated_hours: topic.estimated_hours
      ? Number(topic.estimated_hours)
      : undefined,

    credits: topic.credits ? Number(topic.credits) : undefined,
    description: topic.description ? topic.description : "",

    subtopics: topic.subtopics?.length
      ? topic.subtopics.map(transformTopic)
      : undefined,
  };
};
