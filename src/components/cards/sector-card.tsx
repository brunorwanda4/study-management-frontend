// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Separator } from "../ui/separator";
// import { Dot } from "lucide-react";
// import { Locale } from "@/i18n";
// import { Education, Sector } from "../../../prisma/prisma/generated";
// import SectorDialogDetails from "../site/collection/sector/sector-dialog-details";
// import { TextTooltip } from "@/context/tooltip/text-tooltip";

// interface props {
//   lang: Locale;
//   sector?: Sector | null;
//   educations?: Education[] | undefined
// }

// const SectorCard = ({ sector , educations}: props) => {
//   return (
//     <div className=" basic-card p-0 relative h-auto">
//       <div className=" relative">
//         <div className=" p-4 flex items-center gap-2">
//           <Avatar className=" size-20">
//             <AvatarImage
//               src={sector?.symbol ? sector.symbol : "/images/REB_Logo.png"}
//             />
//             <AvatarFallback>LOGO</AvatarFallback>
//           </Avatar>
//           <div className=" space-x-1">
//             <h3 className=" font-medium leading-5 line-clamp-3">
//               {sector?.name ?? "Primary"}
//             </h3>
//             <span className=" text-sm line-clamp-1 flex space-x-1">
//               @ {sector?.username ?? "REB"}
//             </span>
//             <TextTooltip
//               trigger={
//                 <span className=" cursor-pointer">
//                   <span className=" font-medium">Educ:</span>{" "}
//                   {sector?.education_id}
//                 </span>
//               }
//               content={<span>Education</span>}
//             />
//           </div>
//         </div>
//       </div>
//       {/* description of main class */}
//       <div className="  text-sm line-clamp-2 px-4">
//         <p>
//           {sector?.description
//             ? sector.description
//             : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur  error itaque neque esse delectus ad dolorum dolores facere, asperiores quaerat dolor maxime ex fugiat suscipit distinctio ut obcaecati sequi"}{" "}
//         </p>
//       </div>
//       <div className=" px-4">
//         <div className=" flex justify-between">
//           <h5 className=" capitalize font-medium text-myGray">Trades</h5>
//         </div>
//         <div className=" grid grid-cols-3 w-full">
//           <div className=" flex items-center -space-x-2">
//             <Dot size={32} />
//             <span className=" text-sm line">Primary</span>
//           </div>
//           <div className=" flex items-center -space-x-2">
//             <Dot size={32} />
//             <span className=" text-sm line">O-Level</span>
//           </div>
//           <div className=" flex items-center -space-x-2">
//             <Dot size={32} />
//             <span className=" text-sm line">A-Level</span>
//           </div>
//         </div>
//       </div>
//       <Separator />
//       <div className=" p-4">
//         <SectorDialogDetails educations={educations} sector={sector} />
//       </div>
//     </div>
//   );
// };

// export default SectorCard;
