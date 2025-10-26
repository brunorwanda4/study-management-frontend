import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import type { School } from "@/lib/schema/school/school-schema";
import { BookOpen, Dot } from "lucide-react";
import Link from "next/link";
import { FaSchool } from "react-icons/fa6";
import { MdOutlineSchool, MdSchool } from "react-icons/md";

interface SchoolHomeAboutProps {
  lang: Locale;
  isAboutSchool?: boolean;
  school: School;
  trades?: TradeModule[];
  sectors?: SectorModel[];
}

const SchoolHomeAbout = ({
  lang,
  isAboutSchool,
  school,
  trades,
  sectors,
}: SchoolHomeAboutProps) => {
  return (
    <Card className="w-full space-y-4 p-4 md:p-6">
      {/* ------------------------- */}
      {/* 🏫 School Description */}
      {/* ------------------------- */}
      <CardHeader className="space-y-1 border-0">
        <div className="flex items-center space-x-2">
          <FaSchool className="text-xl" />
          <h3 className="text-lg font-semibold">About School</h3>
        </div>
        {school.description && (
          <p className="text-muted-foreground text-sm">{school.description}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ------------------------- */}
        {/* 📚 School Curriculum */}
        {/* ------------------------- */}
        <div className="space-y-2">
          <div className="text-myGray flex items-center space-x-2">
            <MdSchool className="text-xl" />
            <h4 className="text-md font-semibold">School Curriculum</h4>
          </div>

          <div className="space-y-2 pl-2">
            {sectors &&
              sectors.map((sector) => (
                <div
                  key={sector._id || sector.id}
                  className="flex items-center space-x-2"
                >
                  <Dot size={28} className="-ml-1" />
                  <h6 className="text-sm font-medium">{sector.name}</h6>
                </div>
              ))}
          </div>
        </div>

        {/* ------------------------- */}
        {/* 🏘️ Schooling Type */}
        {/* ------------------------- */}
        <div className="space-y-2">
          <div className="text-myGray flex items-center space-x-2">
            <MdOutlineSchool className="text-xl" />
            <h4 className="text-md font-semibold">Schooling Type</h4>
          </div>

          <div className="space-y-1 pl-2">
            {["Boarding", "Day Scholars"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Dot size={28} className="-ml-1" />
                <h6 className="text-sm font-medium">{type}</h6>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------- */}
        {/* 🎓 Education Levels (optional) */}
        {/* ------------------------- */}
        {isAboutSchool && trades && trades.length > 0 && (
          <div className="space-y-2">
            <div className="text-myGray flex items-center space-x-2">
              <BookOpen className="text-xl" />
              <h4 className="text-md font-semibold">
                Education Levels Offered
              </h4>
            </div>

            <div className="space-y-1 pl-2">
              {trades &&
                trades.map((trade) => (
                  <div
                    key={trade.id || trade._id}
                    className="flex items-center space-x-2"
                  >
                    <Dot size={28} className="-ml-1" />
                    <h6 className="text-sm font-medium">{trade.name}</h6>
                    <span className="text-muted-foreground text-xs">
                      {trade.type}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ------------------------- */}
        {/* 🔗 See More Button */}
        {/* ------------------------- */}
        {!isAboutSchool && (
          <Link href={`/${lang}/school/about`} className="mt-6 block">
            <Button variant="ghost" size="sm" className="w-full">
              See more about school
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default SchoolHomeAbout;
