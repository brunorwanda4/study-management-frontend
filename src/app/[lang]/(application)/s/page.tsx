import NotFoundPage from '@/components/page/not-found'
import PermissionPage from '@/components/page/permission-page'
import React from 'react'

const StudentPage = () => {
  return (
    <div>
      hello student page class
      <NotFoundPage />
      <div className=' h-screen'/>
      <PermissionPage lang="en" role="ADMIN"/>
    </div>
  )
}

export default StudentPage
