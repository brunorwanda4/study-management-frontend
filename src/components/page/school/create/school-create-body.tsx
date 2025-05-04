// "use client";
// import React, { useState } from "react";
// import CreateSchoolBasics from "./create-school-forms/create-school-basics";
// const steps: { title: string; description: string }[] = [
//   {
//     title: "Basic Information",
//     description:
//       "Basic information that describes your school such as name, type, curriculum, and more.",
//   },
//   {
//     title: "Location",
//     description:
//       "Provide your school's location including country, province, district, and Google Maps address.",
//   },
//   {
//     title: "Admin & Staff",
//     description:
//       "Information about the headmaster, principal, and total number of teachers.",
//   },
//   {
//     title: "Students",
//     description:
//       "Student capacity, grading system, attendance method, and scholarship availability.",
//   },
//   {
//     title: "Facilities",
//     description:
//       "Details about classrooms, labs, library, online learning, and extracurricular offerings.",
//   },
//   {
//     title: "Legal",
//     description:
//       "Official registration, accreditation, vision statement, and school motto.",
//   },
//   {
//     title: "Review",
//     description:
//       "Final step to review all your input before submitting your school registration.",
//   },
// ];

// const SchoolCreateBody = () => {
//   const [step, setStep] = useState<number>(0);
//   const nextStep = (): void =>
//     setStep((prev) => Math.min(prev + 1, steps.length - 1));
//   const prevStep = (): void => setStep((prev) => Math.max(prev - 1, 0));

//   return (
//     <div className=" basic-card">
//       <div>
//         <h2 className=" basic-title">
//           Step {step + 1}: {steps[step].title}
//         </h2>
//         <p>{steps[step].description}</p>
//       </div>

//       {/* Step content */}
//       <div className="">
//         {step === 0 && <CreateSchoolBasics />}
//         {step === 1 && <div>Location</div>}
//         {step === 2 && <div>AdminStaff</div>}
//         {step === 3 && <div>Students</div>}
//         {step === 4 && <div>Facilities</div>}
//         {step === 5 && <div>Legal</div>}
//         {step === 6 && <div>Review</div>}

//         <div className="mt-6 flex justify-between">
//           <button
//             className="bg-gray-300 px-4 py-2 rounded-md"
//             onClick={prevStep}
//             disabled={step === 0}
//           >
//             Back
//           </button>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-md"
//             onClick={nextStep}
//           >
//             {step === steps.length - 1 ? "Submit" : "Next"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SchoolCreateBody;
