
import StaffPeople from '@/components/page/school-staff/dashboard/staff-people';
import { StudentProgressChart } from '@/components/page/school-staff/students-components/student-progress-chart';
import StudentStatus from '@/components/page/school-staff/students-components/student-status';
import StudentsList from '@/components/page/school-staff/students-components/students-list';
import SchoolHeader from '@/components/page/school/school-header';
import { Locale } from '@/i18n';

interface props {
  lang: Locale
}
const SchoolStaffTeacherPage = ({lang}: props) => {
   
  return (
    <div className="p-4 space-y-2 max-w-full">
      <SchoolHeader onThePage lang={lang} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 space-x-4">
        <div className="space-y-4">
          <div className="overflow-hidden">
            <StaffPeople lang={lang} total={100} Ftotal={50} Mtotal={50} title="Teachers" role="Teachers" />
          </div>

          <div className=" overflow-hidden">
            <StudentsList title="All teachers" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden">
            <StudentStatus lang={lang} status='Teachers Status' role='Teacher' />
          </div>

          <div className="  overflow-hidden">
            <StudentsList title="Attendance" />
          </div>
        </div>
      </div>
      <div>
        <StudentProgressChart title='Teaching Progress'/>
      </div>
    </div>
  )
}

export default SchoolStaffTeacherPage
