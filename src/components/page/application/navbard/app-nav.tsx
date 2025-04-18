import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppLogo from './app-logo'
import MyImage from '@/components/myComponents/myImage'
import NavMessageDropDown from './nav-message-drop-down'
import { Locale } from '@/i18n'
import NavProfileDropDown from './nav-profile-drop-down'

interface props {
  lang : Locale
}

const AppNav = ({lang} : props) => {
  return (
    <nav className=" w-full h-14 max-h-14 fixed border-b border-border p-2 flex justify-between z-50 bg-base-100">
      <div className=" flex space-x-2  items-center">
        <SidebarTrigger className=" size-12"/>
        <AppLogo />
      </div>
      <div className=" flex gap-2 items-center mr-4">
        {/* <NavMessageDropDown lang={lang}/> */}
        <div role="button" className=" btn btn-circle btn-ghost">
          <MyImage className=" size-8" src="https://cdn-icons-png.flaticon.com/512/1827/1827312.png" />
        </div>
        <NavMessageDropDown lang={lang}/>
        <NavProfileDropDown lang={lang} />
      </div>
    </nav>
  )
}

export default AppNav
