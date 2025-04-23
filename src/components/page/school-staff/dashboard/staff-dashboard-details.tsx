import { Locale } from '@/i18n'
import React from 'react'
import StaffPeople from './staff-people'
import StaffClasses from './staff-classes'

interface props {
  lang : Locale
}

const StaffDashboardDetails = ({lang} : props) => {
  return (
    <div className=' flex space-x-4'>
      <StaffPeople lang={lang} total={762} title='Students' Ftotal={60} Mtotal={37} role='Total students'/>
      <StaffPeople lang={lang} total={345} title='Teachers' Ftotal={100} Mtotal={233} role='Total teachers' />
      <StaffClasses lang={lang}/>
      <StaffPeople lang={lang} total={345} title='School Staffs' Ftotal={100} Mtotal={233} role='Total school staffs' />
    </div>
  )
}

export default StaffDashboardDetails
