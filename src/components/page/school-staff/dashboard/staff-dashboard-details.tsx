import { Locale } from '@/i18n'
import React from 'react'
import StaffPeople from './staff-people'
import { StudentDto } from '@/lib/schema/school/student.dto'
import { TeacherDto } from '@/lib/schema/school/teacher.dto'
import { SchoolStaffDto } from '@/lib/schema/school/school-staff.schema'

interface props {
  lang : Locale,
  students : StudentDto[],
  teachers : TeacherDto[],
  schoolStaffs : SchoolStaffDto[],
}

const StaffDashboardDetails = ({lang , students , teachers , schoolStaffs} : props) => {
  return (
    <div className=' flex space-x-4 w-full'>
      <StaffPeople icon='/icons/student.png' lang={lang} total={students.length} title='Students' Ftotal={60} Mtotal={37} role='Total students'/>
      <StaffPeople icon='/icons/teacher.png' lang={lang} total={teachers.length} title='Teachers' Ftotal={100} Mtotal={233} role='Total teachers' />
      {/* <StaffClasses lang={lang}/> */}
      <StaffPeople icon='/icons/staff.png' lang={lang} total={schoolStaffs.length} title='School Staffs' Ftotal={100} Mtotal={233} role='Total school staffs' />
    </div>
  )
}

export default StaffDashboardDetails
