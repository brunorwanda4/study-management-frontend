"use client";
import React, { useState } from 'react'
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from 'next-themes';

const StaffEvents = () => {
    const {theme} = useTheme();
    const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  return (
    <div className={cn("  duration-200 p-2 happy-card ", theme === "dark" ? "hover:bg-white/10" : "hover:bg-black/10")}>
    <div className='space-y-4'>
    <div className=" flex space-x-4">
     <Avatar className=" size-10">
       <AvatarImage src="/images/17.jpg" />
        <AvatarFallback>PR</AvatarFallback>
     </Avatar>
         <div className=" flex space-x-4 items-center">
           <h4 className='happy-title-base text-base'>UserName</h4> 
         </div>
   </div>
   
  <div>
    <div className=" flex justify-between items-center">
      <h4 className=" line-clamp-1 happy-title-base text-base"> Event title</h4>
      <div className='space-x-4'>
      <span className=" text-xs text-black font-medium bg-myGray rounded-sm px-2 ">2min ago</span>
      <span className=" text-xs text-myGray font-medium">hostedOn: 12/12/2025, 15:30</span>
      </div>
      
    </div>
    <div className="flex items-start justify-between">
            <p className={cn("text-sm text-gray-300", isExpanded ? "" : "line-clamp-1")}>
              Voting school prifects Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, voluptatum.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
            </p>
            <button
              className="ml-2 flex-shrink-0 text-primary mt-1"
              onClick={(e) => {
                e.stopPropagation()
                toggleExpand()
              }}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
  </div>
    </div>
</div>
  )
}

export default StaffEvents