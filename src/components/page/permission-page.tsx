"use client";
import { Button } from "../ui/button";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n";
import MyImage from "../myComponents/myImage";
import MyLink from "../myComponents/myLink";
import { redirectContents } from "@/lib/hooks/redirect";
import { UserRoleDto } from "@/lib/schema/user/user.dto";

interface props {
  description?: string;
  lang: Locale;
  role: UserRoleDto;
}


const PermissionPage = ({description , lang , role} : props) => {
 const router = useRouter();          
       const handleGoBack = () => {
         router.back();
       };
   return (
     <div className="flex w-full justify-center items-center">
       <div className=" flex flex-col items-center">
         <MyImage
           className=" h-80 w-96"
           classname=" object-contain"
           src="/png/permission.png"
         />
         <div>
           <div className="text-center">
             <p className=" ">{!!description ? description : "Your permission not allowed on this page"}</p>
             <div className="flex space-x-2 mt-2 justify-center">
              <MyLink button={{ library :"daisy",variant :"default",  size : "sm"}} type="button" href={redirectContents({lang, role})}>
               <MyImage role="ICON" src="/icons/3d-house.png"/> Go Home
              </MyLink>
              <Button library="daisy" size="sm" variant="primary" onClick={() =>handleGoBack()}>
               <BsArrowLeft /> Go back
             </Button>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
}

export default PermissionPage
