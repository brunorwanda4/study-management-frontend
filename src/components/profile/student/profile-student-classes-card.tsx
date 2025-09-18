import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { Locale } from "@/i18n";
import { schoolImage } from "@/lib/context/images";

const items = [
  {
    id: 1,
    date: "Mar 15, 2024",
    title: "L3 SOD ExecellaSchool 20202",
    description:
      "Initial team meeting and project scope definition. Established key milestones and resource allocation.",
  },
  {
    id: 2,
    date: "Mar 22, 2024",
    title: "Design Phase",
    description:
      "Completed wireframes and user interface mockups. Stakeholder review and feedback incorporated.",
  },
  {
    id: 3,
    date: "Apr 5, 2024",
    title: "Development Sprint",
    description:
      "Backend API implementation and frontend component development in progress.",
  },
  {
    id: 4,
    date: "Apr 19, 2024",
    title: "Testing & Deployment",
    description:
      "Quality assurance testing, performance optimization, and production deployment preparation.",
  },
];

interface props {
  lang: Locale;
}

const ProfileStudentClassesCard = ({ lang }: props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Students classes</CardTitle>
      </CardHeader>
      <CardContent>
        <Timeline defaultValue={3}>
          {items.map((item) => (
            <TimelineItem
              key={item.id}
              step={item.id}
              className="group-data-[orientation=vertical]/timeline:sm:ms-32"
            >
              <TimelineHeader>
                <TimelineSeparator />
                <TimelineDate className="group-data-[orientation=vertical]/timeline:sm:absolute group-data-[orientation=vertical]/timeline:sm:-left-32 group-data-[orientation=vertical]/timeline:sm:w-20 group-data-[orientation=vertical]/timeline:sm:text-right">
                  {item.date}
                </TimelineDate>
                <TimelineTitle className="flex items-center space-x-2 sm:-mt-0.5">
                  <MyLink
                    loading
                    className="flex items-center space-x-2 sm:-mt-0.5"
                    href={`/${lang}/school`}
                  >
                    <MyImage
                      className="size-10"
                      alt="school name"
                      src={schoolImage}
                    />
                    <h4>School name</h4>
                  </MyLink>
                </TimelineTitle>
                <TimelineIndicator />
              </TimelineHeader>
              <TimelineContent>
                <div className="space-x-2">
                  <span>Team 1:</span>
                  <span>Class name</span>
                </div>
                <div className="space-x-2">
                  <span>Team 2:</span>
                  <span>Class name</span>
                </div>
                <div className="space-x-2">
                  <span>Team 3:</span>
                  <span>Class name</span>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default ProfileStudentClassesCard;
