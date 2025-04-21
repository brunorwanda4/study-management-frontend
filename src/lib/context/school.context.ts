import { Option } from "@/components/ui/multiselect";

export const SchoolCurriculum: Option[] = [
    {
        value: "REB",
        label: "REB",
    },
    {
        value: "TVET",
        label: "TVET",
    },
]

export const SchoolStaffRoles: Option[] = [
  {
    value: "HeadTeacher",
    label: "Head Teacher",
  },
  {
    value: "DeputyHeadTeacher",
    label: "Deputy Head Teacher",
  },
  {
    value: "DirectorOfStudies",
    label: "Director of Studies", // Often responsible for academic affairs
  },
   {
    value: "HeadOfDepartment",
    label: "Head of Department", // For specific subjects or faculties
  },
  {
    value: "Librarian",
    label: "Librarian",
  },
  {
    value: "SchoolSecretary",
    label: "School Secretary", // Administrative support
  },
  {
    value: "Accountant",
    label: "Accountant", // School finances
  },
  {
    value: "SchoolCounselor",
    label: "School Counselor", // Guidance and counselling
  },
  {
    value: "Janitor",
    label: "Janitor", // Cleaning and maintenance
  },
  {
    value: "SecurityGuard",
    label: "Security Guard", // School security
  },
   {
    value: "Cook",
    label: "Cook", // For schools with feeding programs
  },
   {
    value: "Nurse",
    label: "Nurse", // School health services
  },
   {
    value: "LabTechnician",
    label: "Lab Technician", // For science labs
  },
];


export const schoolEducationLevel: Option[] = [
    {
        value: "Primary",
        label: "primary"
    },
    {
        value: "OLevel",
        label: "Ordinary Level"
    },
    {
        value: "ALevel",
        label: "Advanced Level "
    },
]

export const schoolLabs: Option[] = [
    {
        value: "ScienceLab", label: "Science Lab"
    },
    {
        value: "ComputerLab", label: "Computer Lab"
    },
    {
        value: "LanguageLab", label: "Language Lab"
    },
    {
        value: "MathLab", label: "Math Lab"
    },
    {
        value: "RoboticsLab", label: "Robotics Lab"
    },
    {
        value: "BiologyLab", label: "Biology Lab"
    },
    {
        value: "ChemistryLab", label: "Chemistry Lab"
    }
];

export const SchoolSportsExtracurricular: Option[] = [
    { value: "FootBall", label: "FootBall" },
    { value: "Debate", label: "Debate" },
    { value: "Basketball", label: "Basketball" },
    { value: "Volleyball", label: "Volleyball" },
    { value: "Baseball", label: "Baseball" },
    { value: "Soccer", label: "Soccer" },
    { value: "Tennis", label: "Tennis" },
    { value: "Swimming", label: "Swimming" },
    { value: "TrackAndField", label: "Track And Field" },
    { value: "TableTennis", label: "Table Tennis" },
    { value: "MartialArts", label: "Martial Arts" },
    { value: "Badminton", label: "Badminton" },
    { value: "Drama", label: "Drama" },
    { value: "Music", label: "Music" },
    { value: "Choir", label: "Choir" },
    { value: "Dance", label: "Dance" },
    { value: "ArtClub", label: "Art Club" },
    { value: "ScienceClub", label: "Science Club" },
    { value: "Chess", label: "Chess" },
    { value: "RoboticsClub", label: "Robotics Club" },
    { value: "PhotographyClub", label: "Photography Club" },
    { value: "MathClub", label: "Math Club" },
    { value: "CodingClub", label: "Coding Club" },
    { value: "EnvironmentalClub", label: "Environmental Club" },
    { value: "StudentCouncil", label: "Student Council" },
];

export const PrimarySubjects: Option[] = [
    { value: "math", label: "Mathematics" },
    { value: "english", label: "English Language" },
    { value: "kinyarwanda", label: "Kinyarwanda" },
    { value: "french", label: "French Language" },
    { value: "science", label: "General Science" },
    { value: "socialStudies", label: "Social Studies" },
    { value: "ict", label: "Information and Communication Technology (ICT)" },
    { value: "re", label: "Religious Education" },
    { value: "creativeArts", label: "Creative Arts" },
    { value: "pe", label: "Physical Education" },
    { value: "entrepreneurship", label: "Entrepreneurship" },
    { value: "specialNeeds", label: "Special Needs and Inclusive Education" },
];

export const PrimaryAssessment: Option[] = [
    { value: "classTest", label: "Class Test" },
    { value: "homework", label: "Homework" },
    { value: "project", label: "Project Work" },
    { value: "groupWork", label: "Group Work" },
    { value: "presentation", label: "Presentation" },
    { value: "quiz", label: "Quiz" },
    { value: "midtermExam", label: "Midterm Exam" },
    { value: "endTermExam", label: "End of Term Exam" },
    { value: "nationalInP6", label: "National Exam (P6)" },
    { value: "practical", label: "Practical Assessment" },
    { value: "oral", label: "Oral Assessment" },
];


export const OLevelSubjects: Option[] = [
    { value: "math", label: "Mathematics" },
    { value: "english", label: "English Language" },
    { value: "kinyarwanda", label: "Kinyarwanda" },
    { value: "french", label: "French" },
    { value: "biology", label: "Biology" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "geography", label: "Geography" },
    { value: "history", label: "History" },
    { value: "entrepreneurship", label: "Entrepreneurship" },
    { value: "kiswahili", label: "Kiswahili" },
    { value: "ict", label: "Information and Communication Technology (ICT)" },
    // { value: "re", label: "Religious Education" },
    { value: "literature", label: "Literature in English" },
    // { value: "music", label: "Music" },
    // { value: "fineArt", label: "Fine Art" },
    { value: "pe", label: "Physical Education" },
];

export const OptionalSubjects: Option[] = [
    { value: "computerScience", label: "Computer Science" },
    // { value: "agriculture", label: "Agriculture" },
    { value: "fineArts", label: "Fine Arts" },
    { value: "homeScience", label: "Home Science" },
    { value: "music", label: "Music" },
    { value: "drama", label: "Drama" },
    { value: "literature", label: "Literature in English" },
    // { value: "entrepreneurship", label: "Entrepreneurship" },
    // { value: "technicalDrawing", label: "Technical Drawing" },
    { value: "re", label: "Religious Education" },
];

export const OLevelAssessment: Option[] = [
    { value: "internalExams", label: "Internal Exams" },
    { value: "nationalExamS3", label: "National Exams in S3" },
];

export const AdvancedLevels: Option[] = [
    { value: "MPC", label: "Math Physics Computer" },
    { value: "PCM", label: "Physics Chemistry Mathematics" },
    { value: "PCB", label: "Physics Chemistry Biology" },
    { value: "MCB", label: "Math Chemistry Biology" },
    { value: "MPG", label: "Math Physics Geography" },
    { value: "MEG", label: "Math Economics Geography" },
    { value: "MCE", label: "Math Computer Science Economics" },
    { value: "HEG", label: "History Economics Geography" },
    { value: "HLG", label: "History Literature in English Geography" },
    { value: "HLP", label: "History Literature in English Psychology" },
    { value: "HGL", label: "History Geography Literature in English" },
    { value: "HEL", label: "History Economics Literature in English" },
    { value: "BCG", label: "Biology Chemistry Geography" },
    { value: "PEM", label: "Physics Economics Math" }, // Note: This seems less common but was listed in one source
    { value: "LEG", label: "Literature in English Economics Geography" }, // Note: This seems less common but was listed in one source
    { value: "EFK", label: "English French Kinyarwanda" },
    { value: "EKK", label: "English Kiswahili Kinyarwanda" },
    // The following language combinations might be being phased out according to one source,
    // but are included as they were listed.
    { value: "LFK", label: "English French Kinyarwanda (Phasing out)" },
    { value: "LKK", label: "English Kiswahili Kinyarwanda (Phasing out)" },
    // Business combinations
    { value: "MEB", label: "Math Economics Business" },
    { value: "BEG", label: "Business Economics Geography" },
    { value: "BEL", label: "Business Economics Literature in English" },
    { value: "BEF", label: "Business Economics French" },
    { value: "BES", label: "Business Economics Sociology" },
    { value: "BSL", label: "Business Sociology Literature in English" },
    { value: "BSF", label: "Business Sociology French" },

    // Other potential combinations found in sources:
    { value: "HSG", label: "History Sociology Geography" },
    { value: "HSL", label: "History Sociology Literature in English" },
    { value: "HES", label: "History Economics Sociology" },
];

export const TvetPrograms: Option[] = [
    // TVET Advanced Level programs (equivalent to levels 4 & 5)
    { value: "AUTOMOBILE_TECHNOLOGY", label: "Automobile Technology" },
    { value: "AUTO_ELECTRICITY_ELECTRONICS", label: "Auto Electricity and Electronics" },
    { value: "WELDING", label: "Welding" },
    { value: "ROAD_CONSTRUCTION", label: "Road Construction" },
    { value: "PLUMBING", label: "Plumbing Technology" },
    { value: "LAND_SURVEYING", label: "Land Surveying" },
    { value: "GRAPHIC_ART", label: "Graphic Art" },
    { value: "MASONRY", label: "Masonry" },
    { value: "FOOD_AND_BEVERAGE", label: "Food and Beverage Operations" },
    { value: "PAINTING_DECORATION", label: "Painting and Decoration" },
    { value: "FORESTRY", label: "Forestry" },
    { value: "FOOD_PROCESSING", label: "Food Processing" },
    { value: "ELECTRONIC_SERVICES", label: "Electronic Services" },
    { value: "CULINARY_ARTS", label: "Culinary Arts" },
    { value: "CROP_PRODUCTION", label: "Crop Production" },
    { value: "COMPUTER_SYSTEMS_TECHNOLOGY", label: "Computer Systems Technology" },
    { value: "COMPUTER_APPLICATIONS", label: "Computer Applications" },
    { value: "ANIMAL_HEALTH", label: "Animal Health" },
    { value: "CARPENTRY", label: "Carpentry" },
    { value: "CERAMICS_SCULPTURE", label: "Ceramics and Sculpture" },
    { value: "TELECOMMUNICATION", label: "Telecommunication" },
    { value: "TAILORING", label: "Tailoring" },
    { value: "SOLAR_ENERGY", label: "Solar Energy" },
    { value: "SOFTWARE_DEVELOPMENT", label: "Software Development" },
    { value: "PRODUCT_TECHNOLOGY", label: "Product Technology" },
    { value: "NETWORKING", label: "Networking" },
    { value: "MULTIMEDIA", label: "Multimedia Production" },
    { value: "INTERIOR_DESIGN", label: "Interior Design" },
    { value: "INDUSTRIAL_ELECTRICITY", label: "Industrial Electricity" },
    { value: "HYDROPOWER", label: "Hydropower" },
    { value: "FOOTBALL", label: "Football" }, // This was listed, might be a specific sports-related TVET.
    { value: "BUILDING_CONSTRUCTION", label: "Building Construction" },
    { value: "ELECTRICAL_TECHNOLOGY", label: "Electrical Technology" },
    { value: "MANUFACTURING_TECHNOLOGY", label: "Manufacturing Technology" },
    { value: "NETWORKING_INTERNET_TECHNOLOGIES", label: "Networking and Internet Technologies" },
    { value: "PUBLIC_WORKS", label: "Public Works" },
    { value: "AUTO_TRANSMISSION", label: "Autotransmission" }, // Listed as Level 4
    { value: "FASHION_DESIGN", label: "Fashion Design" },
    { value: "FINE_PLASTIC_ARTS", label: "Fine and Plastic Arts" },
    { value: "MUSIC_PERFORMING_ARTS", label: "Music and Performing Arts" },
    { value: "COMPUTER_SYSTEM_ARCHITECTURE", label: "Computer System and Architecture" }, // Listed as Level 3, but relevant for advanced study
    { value: "SOFTWARE_PROGRAMMING_EMBEDDED_SYSTEMS", label: "Software Programming and Embedded Systems" }, // Listed as Level 3, but relevant for advanced study
    { value: "WOOD_TECHNOLOGY", label: "Wood Technology" },
    { value: "WATER_IRRIGATION", label: "Water and Irrigation" },
    { value: "LEATHER_TECHNOLOGY", label: "Leather Technology" },
    { value: "BEE_KEEPING_PROCESSING", label: "Bee-keeping and Processing" },
    { value: "CASH_CROP_PRODUCTION_PROCESSING", label: "Cash Crop Production and Processing" },
    { value: "PIG_PRODUCTION_PROCESSING", label: "Pig Production and Processing" },
    { value: "FISH_FARMING_PROCESSING", label: "Fish Farming and Processing" },
    { value: "FOOD_CROP_PRODUCTION_PROCESSING", label: "Food Crop Production and Processing" },
    { value: "POULTRY_FARMING_PROCESSING", label: "Poultry Farming and Processing" },
    { value: "FRUITS_VEGETABLES_PRODUCTION_PROCESSING", label: "Fruits and Vegetables Production and Processing" },
    { value: "RUMINANT_FARMING_PROCESSING", label: "Ruminant Farming and Processing" },
    { value: "BAKING", label: "Baking" },
    { value: "AGRICULTURE_MECHANIZATION_TECHNOLOGY", label: "Agriculture Mechanization Technology" }, // Bachelor of Technology
    { value: "APPLIED_FORESTRY", label: "Applied Forestry" }, // Bachelor of Technology
    { value: "WILDLIFE_LANDSCAPE_MANAGEMENT", label: "Wildlife and Landscape Management" }, // Bachelor of Technology
    { value: "TOURISM", label: "Tourism (Advanced Diploma/Bachelor of Technology)" }, // Listed in multiple contexts
    { value: "GEOMATICS_LAND_SURVEYING", label: "Geomatics (Land Surveying) (Bachelor of Technology)" }, // Bachelor of Technology
    { value: "HIGHWAY_TECHNOLOGY", label: "Highway Technology (Bachelor of Technology)" }, // Bachelor of Technology
    { value: "IRRIGATION_DRAINAGE_TECHNOLOGY", label: "Irrigation and Drainage Technology (Bachelor of Technology)" }, // Bachelor of Technology
    { value: "WATER_SANITATION_TECHNOLOGY", label: "Water and Sanitation Technology (Bachelor of Technology)" }, // Bachelor of Technology
    { value: "QUANTITY_SURVEYING", label: "Quantity Surveying (Bachelor of Technology)" }, // Bachelor of Technology
    // Advanced Diploma programs listed as main programs at IPRC Kigali, potentially leading to BTech
    { value: "MECHANICAL_ENGINEERING", label: "Mechanical Engineering (Advanced Diploma)" },
    { value: "CIVIL_ENGINEERING", label: "Civil Engineering (Advanced Diploma)" },
    { value: "INFORMATION_COMMUNICATION_TECHNOLOGY", label: "Information and Communication Technology (Advanced Diploma)" },
    { value: "ELECTRICAL_ELECTRONICS_ENGINEERING", label: "Electrical and Electronics Engineering (Advanced Diploma)" },
    { value: "MINING_ENGINEERING", label: "Mining Engineering (Advanced Diploma)" },
    { value: "TRANSPORT_LOGISTICS", label: "Transport and Logistics (Advanced Diploma)" },
    { value: "CREATIVE_ARTS", label: "Creative Arts (Advanced Diploma)" },
];

export const TevetLevels : Option[] = [
    {value : "L3", label : "Level 3 (Certificate of Vocation Training)"},
    {value : "L4", label : "Level 4 (Advance Certificate)"},
    {value : "L5", label : "Level 5 (Diploma)"},
]