"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import CreateSchoolForm from "./create-school-form";
const steps: { title: string; description: string }[] = [
  {
    title: "Basic Information",
    description:
      "Enter key details about your school, such as its name, type, curriculum, and other identifiers.",
  },
  {
    title: "Location",
    description:
      "Specify the school's location, including country, province, district, and Google Maps link.",
  },
  {
    title: "Admin & Staff",
    description:
      "Provide information about school leadership, including the headmaster, principal, and total teaching staff.",
  },
  {
    title: "Students",
    description:
      "Outline student capacity, grading system, attendance tracking method, and scholarship options.",
  },
  {
    title: "Facilities",
    description:
      "Share details about your school's infrastructure—classrooms, laboratories, library, online learning tools, and extracurricular programs.",
  },
  {
    title: "Legal",
    description:
      "Include official registration documents, accreditation details, school vision, and motto.",
  },
  {
    title: "Review",
    description:
      "Review all submitted information before finalizing and submitting your school's registration.",
  },
];

const CreateSchoolBody = () => {
  const [step, setStep] = useState<number>(0);
  const nextStep = (): void =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = (): void => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className=" basic-card">
      <div>
        <h2 className=" basic-title">
          Step {step + 1}: {steps[step].title}
        </h2>
        <p>{steps[step].description}</p>
      </div>

      {/* Step content */}
      <div className="">
        {step === 0 && <div>basic info</div>}
        {step === 1 && <div>Location</div>}
        {step === 2 && <div>AdminStaff</div>}
        {step === 3 && <div>Students</div>}
        {step === 4 && <div>Facilities</div>}
        {step === 5 && <div>Legal</div>}
        {step === 6 && <div>Review</div>}
        <CreateSchoolForm lang={"en"}/>
        <div
          className={cn(
            "mt-6 flex justify-between",
            step === 0 && "justify-end"
          )}
        >
          {step !== 0 && (
            <Button library="shadcn" variant={"outline"} onClick={prevStep}>
              <BsArrowLeft /> Back
            </Button>
          )}
          <Button onClick={nextStep}>
            {step === steps.length - 1 ? "Submit" : "Next"}{" "}
            {step !== steps.length - 1 && <BsArrowRight />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateSchoolBody;
