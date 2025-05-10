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
  lang: Locale;
  role: UserRoleDto;
}


const DevelopingPage = ({lang , role} : props) => {
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
           src="/png/developing.png"
         />
         <div>
           <div className="text-center">
             <p className=" ">{ "Sorry this page we are developing it try again later 😔"}</p>
             <div className="flex space-x-2 mt-2 justify-center">
              <MyLink loading button={{ library :"daisy", variant :"default"}} type="button" href={redirectContents({lang, role})}>
               <MyImage role="ICON" src="/icons/3d-house.png"/> Go Home
              </MyLink>
              <Button library="daisy" variant="info" onClick={() =>handleGoBack()}>
               <BsArrowLeft /> Go back
             </Button>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
}

export default DevelopingPage
