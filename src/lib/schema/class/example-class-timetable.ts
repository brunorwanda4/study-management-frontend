import { PopulatedClassTimetable } from "@/lib/schema/class/class-timetable-schema";

export const populatedTimetableExample: PopulatedClassTimetable = {
  _id: "timetable_001",
  class_id: "class_10A",
  academic_year: "2024-2025",

  weekly_schedule: [
    // ==================== MONDAY ====================
    {
      day: "Monday",
      is_holiday: false,
      periods: [
        // Morning Lessons (9:00 AM - 10:20 AM)
        {
          period_id: "mon_1",
          type: "subject",
          title: "Mathematics",
          start_offset: 0, // 9:00 AM
          duration_minutes: 40,
          color_code: "#FF6B6B",
          enabled: true,
          teacher: {
            id: "teacher_001",
            _id: "teacher_001",
            name: "Dr. Smith",
            image: "/images/teachers/smith.jpg",
            user_id: "user_teacher_001"
          },
          subject: {
            id: "sub_math",
            _id: "sub_math",
            name: "Mathematics",
            code: "MATH101"
          }
        },
        {
          period_id: "mon_2",
          type: "subject",
          title: "Physics",
          start_offset: 40, // 9:40 AM
          duration_minutes: 40,
          color_code: "#4ECDC4",
          enabled: true,
          teacher: {
            id: "teacher_002",
            _id: "teacher_002",
            name: "Prof. Johnson",
            image: "/images/teachers/johnson.jpg",
            user_id: "user_teacher_002"
          },
          subject: {
            id: "sub_physics",
            _id: "sub_physics",
            name: "Physics",
            code: "PHY101"
          }
        },
        // Morning Break (20 minutes)
        {
          period_id: "mon_break1",
          type: "break",
          title: "Morning Break",
          start_offset: 80, // 10:20 AM
          duration_minutes: 20,
          color_code: "#F7F9FC",
          enabled: true
        },
        // Afternoon Lessons (10:40 AM - 1:00 PM)
        {
          period_id: "mon_3",
          type: "subject",
          title: "Chemistry",
          start_offset: 100, // 10:40 AM
          duration_minutes: 40,
          color_code: "#45B7D1",
          enabled: true,
          teacher: {
            id: "teacher_003",
            _id: "teacher_003",
            name: "Dr. Brown",
            image: "/images/teachers/brown.jpg",
            user_id: "user_teacher_003"
          },
          subject: {
            id: "sub_chemistry",
            _id: "sub_chemistry",
            name: "Chemistry",
            code: "CHEM101"
          }
        },
        {
          period_id: "mon_4",
          type: "subject",
          title: "Biology",
          start_offset: 140, // 11:20 AM
          duration_minutes: 40,
          color_code: "#96CEB4",
          enabled: true,
          teacher: {
            id: "teacher_004",
            _id: "teacher_004",
            name: "Ms. Davis",
            image: "/images/teachers/davis.jpg",
            user_id: "user_teacher_004"
          },
          subject: {
            id: "sub_biology",
            _id: "sub_biology",
            name: "Biology",
            code: "BIO101"
          }
        },
        {
          period_id: "mon_5",
          type: "subject",
          title: "English",
          start_offset: 180, // 12:00 PM
          duration_minutes: 40,
          color_code: "#FFEAA7",
          enabled: true,
          teacher: {
            id: "teacher_005",
            _id: "teacher_005",
            name: "Mrs. Wilson",
            image: "/images/teachers/wilson.jpg",
            user_id: "user_teacher_005"
          },
          subject: {
            id: "sub_english",
            _id: "sub_english",
            name: "English",
            code: "ENG101"
          }
        },
        {
          period_id: "mon_free1",
          type: "subject",
          title: "Free Period",
          start_offset: 220, // 12:40 PM
          duration_minutes: 20,
          color_code: "#DFE6E9",
          enabled: true
        },
        // Lunch Time (1 hour)
        {
          period_id: "mon_lunch",
          type: "lunch",
          title: "Lunch Break",
          start_offset: 240, // 1:00 PM
          duration_minutes: 60,
          color_code: "#FDCB6E",
          enabled: true
        },
        // Early Afternoon Lessons (2:00 PM - 3:20 PM)
        {
          period_id: "mon_6",
          type: "subject",
          title: "History",
          start_offset: 300, // 2:00 PM
          duration_minutes: 40,
          color_code: "#A29BFE",
          enabled: true,
          teacher: {
            id: "teacher_006",
            _id: "teacher_006",
            name: "Mr. Taylor",
            image: "/images/teachers/taylor.jpg",
            user_id: "user_teacher_006"
          },
          subject: {
            id: "sub_history",
            _id: "sub_history",
            name: "History",
            code: "HIS101"
          }
        },
        {
          period_id: "mon_7",
          type: "subject",
          title: "Geography",
          start_offset: 340, // 2:40 PM
          duration_minutes: 40,
          color_code: "#74B9FF",
          enabled: true,
          teacher: {
            id: "teacher_007",
            _id: "teacher_007",
            name: "Ms. Anderson",
            image: "/images/teachers/anderson.jpg",
            user_id: "user_teacher_007"
          },
          subject: {
            id: "sub_geography",
            _id: "sub_geography",
            name: "Geography",
            code: "GEO101"
          }
        },
        // Mid-Afternoon Break (20 minutes)
        {
          period_id: "mon_break2",
          type: "break",
          title: "Afternoon Break",
          start_offset: 380, // 3:20 PM
          duration_minutes: 20,
          color_code: "#F7F9FC",
          enabled: true
        },
        // Late Afternoon Lessons (3:40 PM - 5:00 PM)
        {
          period_id: "mon_8",
          type: "subject",
          title: "Computer Science",
          start_offset: 400, // 3:40 PM
          duration_minutes: 40,
          color_code: "#55EFC4",
          enabled: true,
          teacher: {
            id: "teacher_008",
            _id: "teacher_008",
            name: "Mr. Clark",
            image: "/images/teachers/clark.jpg",
            user_id: "user_teacher_008"
          },
          subject: {
            id: "sub_computer",
            _id: "sub_computer",
            name: "Computer Science",
            code: "CS101"
          }
        },
        {
          period_id: "mon_9",
          type: "subject",
          title: "Physical Education",
          start_offset: 440, // 4:20 PM
          duration_minutes: 40,
          color_code: "#81ECEC",
          enabled: true,
          teacher: {
            id: "teacher_009",
            _id: "teacher_009",
            name: "Coach Miller",
            image: "/images/teachers/miller.jpg",
            user_id: "user_teacher_009"
          },
          subject: {
            id: "sub_pe",
            _id: "sub_pe",
            name: "Physical Education",
            code: "PE101"
          }
        }
      ]
    },

    // ==================== TUESDAY ====================
    {
      day: "Tuesday",
      is_holiday: false,
      periods: [
        {
          period_id: "tue_1",
          type: "subject",
          title: "English",
          start_offset: 0,
          duration_minutes: 40,
          color_code: "#FFEAA7",
          enabled: true,
          teacher: {
            id: "teacher_005",
            _id: "teacher_005",
            name: "Mrs. Wilson",
            image: "/images/teachers/wilson.jpg",
            user_id: "user_teacher_005"
          },
          subject: {
            id: "sub_english",
            _id: "sub_english",
            name: "English",
            code: "ENG101"
          }
        },
        {
          period_id: "tue_2",
          type: "subject",
          title: "Mathematics",
          start_offset: 40,
          duration_minutes: 40,
          color_code: "#FF6B6B",
          enabled: true,
          teacher: {
            id: "teacher_001",
            _id: "teacher_001",
            name: "Dr. Smith",
            image: "/images/teachers/smith.jpg",
            user_id: "user_teacher_001"
          },
          subject: {
            id: "sub_math",
            _id: "sub_math",
            name: "Mathematics",
            code: "MATH101"
          }
        },
        {
          period_id: "tue_break1",
          type: "break",
          title: "Morning Break",
          start_offset: 80,
          duration_minutes: 20,
          color_code: "#F7F9FC",
          enabled: true
        },
        {
          period_id: "tue_3",
          type: "subject",
          title: "Chemistry",
          start_offset: 100,
          duration_minutes: 40,
          color_code: "#45B7D1",
          enabled: true,
          teacher: {
            id: "teacher_003",
            _id: "teacher_003",
            name: "Dr. Brown",
            image: "/images/teachers/brown.jpg",
            user_id: "user_teacher_003"
          },
          subject: {
            id: "sub_chemistry",
            _id: "sub_chemistry",
            name: "Chemistry",
            code: "CHEM101"
          }
        },
        {
          period_id: "tue_free1",
          type: "subject",
          title: "Free Period",
          start_offset: 140,
          duration_minutes: 40,
          color_code: "#DFE6E9",
          enabled: true
        },
        {
          period_id: "tue_4",
          type: "subject",
          title: "Physics",
          start_offset: 180,
          duration_minutes: 40,
          color_code: "#4ECDC4",
          enabled: true,
          teacher: {
            id: "teacher_002",
            _id: "teacher_002",
            name: "Prof. Johnson",
            image: "/images/teachers/johnson.jpg",
            user_id: "user_teacher_002"
          },
          subject: {
            id: "sub_physics",
            _id: "sub_physics",
            name: "Physics",
            code: "PHY101"
          }
        },
        {
          period_id: "tue_5",
          type: "subject",
          title: "Biology",
          start_offset: 220,
          duration_minutes: 20,
          color_code: "#96CEB4",
          enabled: true,
          teacher: {
            id: "teacher_004",
            _id: "teacher_004",
            name: "Ms. Davis",
            image: "/images/teachers/davis.jpg",
            user_id: "user_teacher_004"
          },
          subject: {
            id: "sub_biology",
            _id: "sub_biology",
            name: "Biology",
            code: "BIO101"
          }
        },
        {
          period_id: "tue_lunch",
          type: "lunch",
          title: "Lunch Break",
          start_offset: 240,
          duration_minutes: 60,
          color_code: "#FDCB6E",
          enabled: true
        },
        {
          period_id: "tue_6",
          type: "subject",
          title: "Art",
          start_offset: 300,
          duration_minutes: 40,
          color_code: "#FD79A8",
          enabled: true,
          teacher: {
            id: "teacher_010",
            _id: "teacher_010",
            name: "Ms. Garcia",
            image: "/images/teachers/garcia.jpg",
            user_id: "user_teacher_010"
          },
          subject: {
            id: "sub_art",
            _id: "sub_art",
            name: "Art",
            code: "ART101"
          }
        },
        {
          period_id: "tue_7",
          type: "subject",
          title: "Music",
          start_offset: 340,
          duration_minutes: 40,
          color_code: "#E84393",
          enabled: true,
          teacher: {
            id: "teacher_011",
            _id: "teacher_011",
            name: "Mr. Martinez",
            image: "/images/teachers/martinez.jpg",
            user_id: "user_teacher_011"
          },
          subject: {
            id: "sub_music",
            _id: "sub_music",
            name: "Music",
            code: "MUS101"
          }
        },
        {
          period_id: "tue_break2",
          type: "break",
          title: "Afternoon Break",
          start_offset: 380,
          duration_minutes: 20,
          color_code: "#F7F9FC",
          enabled: true
        },
        {
          period_id: "tue_8",
          type: "subject",
          title: "Geography",
          start_offset: 400,
          duration_minutes: 40,
          color_code: "#74B9FF",
          enabled: true,
          teacher: {
            id: "teacher_007",
            _id: "teacher_007",
            name: "Ms. Anderson",
            image: "/images/teachers/anderson.jpg",
            user_id: "user_teacher_007"
          },
          subject: {
            id: "sub_geography",
            _id: "sub_geography",
            name: "Geography",
            code: "GEO101"
          }
        },
        {
          period_id: "tue_free2",
          type: "subject",
          title: "Free Period",
          start_offset: 440,
          duration_minutes: 40,
          color_code: "#DFE6E9",
          enabled: true
        }
      ]
    },

    // ==================== WEDNESDAY ====================
    {
      day: "Wednesday",
      is_holiday: false,
      periods: [
        {
          period_id: "wed_1",
          type: "subject",
          title: "Physics",
          start_offset: 0,
          duration_minutes: 40,
          color_code: "#4ECDC4",
          enabled: true,
          teacher: {
            id: "teacher_002",
            _id: "teacher_002",
            name: "Prof. Johnson",
            image: "/images/teachers/johnson.jpg",
            user_id: "user_teacher_002"
          },
          subject: {
            id: "sub_physics",
            _id: "sub_physics",
            name: "Physics",
            code: "PHY101"
          }
        },
        {
          period_id: "wed_2",
          type: "subject",
          title: "Chemistry",
          start_offset: 40,
          duration_minutes: 40,
          color_code: "#45B7D1",
          enabled: true,
          teacher: {
            id: "teacher_003",
            _id: "teacher_003",
            name: "Dr. Brown",
            image: "/images/teachers/brown.jpg",
            user_id: "user_teacher_003"
          },
          subject: {
            id: "sub_chemistry",
            _id: "sub_chemistry",
            name: "Chemistry",
            code: "CHEM101"
          }
        },
        {
          period_id: "wed_break1",
          type: "break",
          title: "Morning Break",
          start_offset: 80,
          duration_minutes: 20,
          color_code: "#F7F9FC",
          enabled: true
        },
        {
          period_id: "wed_3",
          type: "subject",
          title: "Mathematics",
          start_offset: 100,
          duration_minutes: 40,
          color_code: "#FF6B6B",
          enabled: true,
          teacher: {
            id: "teacher_001",
            _id: "teacher_001",
            name: "Dr. Smith",
            image: "/images/teachers/smith.jpg",
            user_id: "user_teacher_001"
          },
          subject: {
            id: "sub_math",
            _id: "sub_math",
            name: "Mathematics",
            code: "MATH101"
          }
        },
        {
          period_id: "wed_4",
          type: "subject",
          title: "English",
          start_offset: 140,
          duration_minutes: 40,
          color_code: "#FFEAA7",
          enabled: true,
          teacher: {
            id: "teacher_005",
            _id: "teacher_005",
            name: "Mrs. Wilson",
            image: "/images/teachers/wilson.jpg",
            user_id: "user_teacher_005"
          },
          subject: {
            id: "sub_english",
            _id: "sub_english",
            name: "English",
            code: "ENG101"
          }
        },
        {
          period_id: "wed_free1",
          type: "subject",
          title: "Free Period",
          start_offset: 180,
          duration_minutes: 40,
          color_code: "#DFE6E9",
          enabled: true
        },
        {
          period_id: "wed_5",
          type: "subject",
          title: "Biology",
          start_offset: 220,
          duration_minutes: 20,
          color_code: "#96CEB4",
          enabled: true,
          teacher: {
            id: "teacher_004",
            _id: "teacher_004",
            name: "Ms. Davis",
            image: "/images/teachers/davis.jpg",
            user_id: "user_teacher_004"
          },
          subject: {
            id: "sub_biology",
            _id: "sub_biology",
            name: "Biology",
            code: "BIO101"
          }
        },
        {
          period_id: "wed_lunch",
          type: "lunch",
          title: "Lunch Break",
          start_offset: 240,
          duration_minutes: 60,
          color_code: "#FDCB6E",
          enabled: true
        },
        {
          period_id: "wed_6",
          type: "subject",
          title: "Computer Science",
          start_offset: 300,
          duration_minutes: 40,
          color_code: "#55EFC4",
          enabled: true,
          teacher: {
            id: "teacher_008",
            _id: "teacher_008",
            name: "Mr. Clark",
            image: "/images/teachers/clark.jpg",
            user_id: "user_teacher_008"
          },
          subject: {
            id: "sub_computer",
            _id: "sub_computer",
            name: "Computer Science",
            code: "CS101"
          }
        },
        {
          period_id: "wed_7",
          type: "subject",
          title: "History",
          start_offset: 340,
          duration_minutes: 40,
          color_code: "#A29BFE",
          enabled: true,
          teacher: {
            id: "teacher_006",
            _id: "teacher_006",
            name: "Mr. Taylor",
            image: "/images/teachers/taylor.jpg",
            user_id: "user_teacher_006"
          },
          subject: {
            id: "sub_history",
            _id: "sub_history",
            name: "History",
            code: "HIS101"
          }
        },
        {
          period_id: "wed_break2",
          type: "break",
          title: "Afternoon Break",
          start_offset: 380,
          duration_minutes: 20,
          color_code: "#F7F9FC",
          enabled: true
        },
        {
          period_id: "wed_8",
          type: "subject",
          title: "Physical Education",
          start_offset: 400,
          duration_minutes: 40,
          color_code: "#81ECEC",
          enabled: true,
          teacher: {
            id: "teacher_009",
            _id: "teacher_009",
            name: "Coach Miller",
            image: "/images/teachers/miller.jpg",
            user_id: "user_teacher_009"
          },
          subject: {
            id: "sub_pe",
            _id: "sub_pe",
            name: "Physical Education",
            code: "PE101"
          }
        },
        {
          period_id: "wed_9",
          type: "subject",
          title: "Geography",
          start_offset: 440,
          duration_minutes: 40,
          color_code: "#74B9FF",
          enabled: true,
          teacher: {
            id: "teacher_007",
            _id: "teacher_007",
            name: "Ms. Anderson",
            image: "/images/teachers/anderson.jpg",
            user_id: "user_teacher_007"
          },
          subject: {
            id: "sub_geography",
            _id: "sub_geography",
            name: "Geography",
            code: "GEO101"
          }
        }
      ]
    },

    // ==================== THURSDAY ====================
    {
      day: "Thursday",
      is_holiday: false,
      periods: [
        {
          period_id: "thu_1",
          type: "subject",
          title: "Biology",
          start_offset: 0,
          duration_minutes: 40,
          color_code: "#96CEB4",
          enabled: true,
          teacher: {
            id: "teacher_004",
            _id: "teacher_004",
            name: "Ms. Davis",
            image: "/images/teachers/davis.jpg",
            user_id: "user_teacher_004"
          },
          subject: {
            id: "sub_biology",
            _id: "sub_biology",
            name: "Biology",
            code: "BIO101"
          }
        },
        {
          period_id: "thu_2",
          type: "subject",
          title: "Mathematics",
          start_offset: 40,
          duration_minutes: 40,
          color_code: "#FF6B6B",
          enabled: true,
          teacher: {
            id: "teacher_001",
            _id: "teacher_001",
            name: "Dr. Smith",
            image: "/images/teachers/smith.jpg",
            user_id: "user_teacher_001"
          },
          subject: {
            id: "sub_math",
            _id: "sub_math",
            name: "Mathematics",
            code: "MATH101"
          }
        },
        {
          period_id: "thu_break1",
          type: "break",
          title: "Morning Break",
          start_offset: 80,
          duration_minutes: 20,
          color_code: "#F7F9FC",
          enabled: true
        },
        {
          period_id: "thu_3",
          type: "subject",
          title: "English",
          start_offset: 100,
          duration_minutes: 40,
          color_code: "#FFEAA7",
          enabled: true,
          teacher: {
            id: "teacher_005",
            _id: "teacher_005",
            name: "Mrs. Wilson",
            image: "/images/teachers/wilson.jpg",
            user_id: "user_teacher_005"
          },
          subject: {
            id: "sub_english",
            _id: "sub_english",
            name: "English",
            code: "ENG101"
          }
        },
        {
          period_id: "thu_4",
          type: "subject",
          title: "Physics",
          start_offset: 140,
          duration_minutes: 40,
          color_code: "#4ECDC4",
          enabled: true,
          teacher: {
            id: "teacher_002",
            _id: "teacher_002",
            name: "Prof. Johnson",
            image: "/images/teachers/johnson.jpg",
            user_id: "user_teacher_002"
          },
          subject: {
            id: "sub_physics",
            _id: "sub_physics",
            name: "Physics",
            code: "PHY101"
          }
        },
        {
          period_id: "thu_5",
          type: "subject",
          title: "Chemistry",
          start_offset: 180,
          duration_minutes: 40,
          color_code: "#45B7D1",
          enabled: true,
          teacher: {
            id: "teacher_003",
            _id: "teacher_003",
            name: "Dr. Brown",
            image: "/images/teachers/brown.jpg",
            user_id: "user_teacher_003"
          },
          subject: {
            id: "sub_chemistry",
            _id: "sub_chemistry",
            name: "Chemistry",
            code: "CHEM101"
          }
        },
        {
          period_id: "thu_free1",
          type: "subject",
          title: "Free Period",
          start_offset: 220,
          duration_minutes: 20,
          color_code: "#DFE6E9",
          enabled: true
        },
        {
          period_id: "thu_lunch",
          type: "lunch",
          title: "Lunch Break",
          start_offset: 240,
          duration_minutes: 60,
          color_code: "#FDCB6E",
          enabled: true
        },
        {
          period_id: "thu_6",
          type: "subject",
          title: "Art",
          start_offset: 300,
          duration_minutes: 40,
          color_code: "#FD79A8",
          enabled: true,
          teacher: {
            id: "teacher_010",
            _id: "teacher_010",
            name: "Ms. Garcia",
            image: "/images/teachers/garcia.jpg",
            user_id: "user_teacher_010"
          },
          subject: {
            id: "sub_art",
            _id: "sub_art",
            name: "Art",
            code: "ART101"
          }
        },
        {
          period_id: "thu_7",
          type: "subject",
          title: "Music",
          start_offset: 340,
          duration_minutes: 40,
          color_code: "#E84393",
          enabled: true,
          teacher: {
            id: "teacher_011",
            _id: "teacher_011",
            name: "Mr. Martinez",
            image: "/images/teachers/martinez.jpg",
            user_id: "user_teacher_011"
          },
          subject: {
            id: "sub_music",
            _id: "sub_music",
            name: "Music",
            code: "MUS101"
          }
        },
        {
          period_id: "thu_break2",
          type: "break",
          title: "Afternoon Break",
          start_offset: 380,
          duration_minutes: 20,
          color_code: "#F7F9FC",
          enabled: true
        },
        {
          period_id: "thu_8",
          type: "subject",
          title: "History",
          start_offset: 400,
          duration_minutes: 40,
          color_code: "#A29BFE",
          enabled: true,
          teacher: {
            id: "teacher_006",
            _id: "teacher_006",
            name: "Mr. Taylor",
            image: "/images/teachers/taylor.jpg",
            user_id: "user_teacher_006"
          },
          subject: {
            id: "sub_history",
            _id: "sub_history",
            name: "History",
            code: "HIS101"
          }
        },
        {
          period_id: "thu_free2",
          type: "subject",
          title: "Free Period",
          start_offset: 440,
          duration_minutes: 40,
          color_code: "#DFE6E9",
          enabled: true
        }
      ]
    },

    // ==================== FRIDAY ====================
    {
      day: "Friday",
      is_holiday: false,
      periods: [
        {
          period_id: "fri_1",
          type: "subject",
          title: "Computer Science",
          start_offset: 0,
          duration_minutes: 40,
          color_code: "#55EFC4",
          enabled: true,
          teacher: {
            id: "teacher_008",
            _id: "teacher_008",
            name: "Mr. Clark",
            image: "/images/teachers/clark.jpg",
            user_id: "user_teacher_008"
          },
          subject: {
            id: "sub_computer",
            _id: "sub_computer",
            name: "Computer Science",
            code: "CS101"
          }
        },
        {
          period_id: "fri_2",
          type: "subject",
          title: "Physical Education",
          start_offset: 40,
          duration_minutes: 40,
          color_code: "#81ECEC",
          enabled: true,
          teacher: {
            id: "teacher_009",
            _id: "teacher_009",
            name: "Coach Miller",
            image: "/images/teachers/miller.jpg",
            user_id: "user_teacher_009"
          },
          subject: {
            id: "sub_pe",
            _id: "sub_pe",
            name: "Physical Education",
            code: "PE101"
          }
        },
        {
          period_id: "fri_break1",
          type: "break",
          title: "Morning Break",
          start_offset: 80,
          duration_minutes: 20,
          color_code: "#F7F9FC",
          enabled: true
        },
        {
          period_id: "fri_3",
          type: "subject",
          title: "Mathematics",
          start_offset: 100,
          duration_minutes: 40,
          color_code: "#FF6B6B",
          enabled: true,
          teacher: {
            id: "teacher_001",
            _id: "teacher_001",
            name: "Dr. Smith",
            image: "/images/teachers/smith.jpg",
            user_id: "user_teacher_001"
          },
          subject: {
            id: "sub_math",
            _id: "sub_math",
            name: "Mathematics",
            code: "MATH101"
          }
        },
        {
          period_id: "fri_4",
          type: "subject",
          title: "English",
          start_offset: 140,
          duration_minutes: 40,
          color_code: "#FFEAA7",
          enabled: true,
          teacher: {
            id: "teacher_005",
            _id: "teacher_005",
            name: "Mrs. Wilson",
            image: "/images/teachers/wilson.jpg",
            user_id: "user_teacher_005"
          },
          subject: {
            id: "sub_english",
            _id: "sub_english",
            name: "English",
            code: "ENG101"
          }
        },
        {
          period_id: "fri_5",
          type: "subject",
          title: "Biology",
          start_offset: 180,
          duration_minutes: 40,
          color_code: "#96CEB4",
          enabled: true,
          teacher: {
            id: "teacher_004",
            _id: "teacher_004",
            name: "Ms. Davis",
            image: "/images/teachers/davis.jpg",
            user_id: "user_teacher_004"
          },
          subject: {
            id: "sub_biology",
            _id: "sub_biology",
            name: "Biology",
            code: "BIO101"
          }
        },
        {
          period_id: "fri_free1",
          type: "subject",
          title: "Free Period",
          start_offset: 220,
          duration_minutes: 20,
          color_code: "#DFE6E9",
          enabled: true
        },
        {
          period_id: "fri_lunch",
          type: "lunch",
          title: "Lunch Break",
          start_offset: 240,
          duration_minutes: 60,
          color_code: "#FDCB6E",
          enabled: true
        },
        {
          period_id: "fri_6",
          type: "subject",
          title: "Geography",
          start_offset: 300,
          duration_minutes: 40,
          color_code: "#74B9FF",
          enabled: true,
          teacher: {
            id: "teacher_007",
            _id: "teacher_007",
            name: "Ms. Anderson",
            image: "/images/teachers/anderson.jpg",
            user_id: "user_teacher_007"
          },
          subject: {
            id: "sub_geography",
            _id: "sub_geography",
            name: "Geography",
            code: "GEO101"
          }
        },
        {
          period_id: "fri_7",
          type: "subject",
          title: "History",
          start_offset: 340,
          duration_minutes: 40,
          color_code: "#A29BFE",
          enabled: true,
          teacher: {
            id: "teacher_006",
            _id: "teacher_006",
            name: "Mr. Taylor",
            image: "/images/teachers/taylor.jpg",
            user_id: "user_teacher_006"
          },
          subject: {
            id: "sub_history",
            _id: "sub_history",
            name: "History",
            code: "HIS101"
          }
        },
        {
          period_id: "fri_break2",
          type: "break",
          title: "Afternoon Break",
          start_offset: 380,
          duration_minutes: 20,
          color_code: "#F7F9FC",
          enabled: true
        },
        {
          period_id: "fri_8",
          type: "subject",
          title: "Chemistry",
          start_offset: 400,
          duration_minutes: 40,
          color_code: "#45B7D1",
          enabled: true,
          teacher: {
            id: "teacher_003",
            _id: "teacher_003",
            name: "Dr. Brown",
            image: "/images/teachers/brown.jpg",
            user_id: "user_teacher_003"
          },
          subject: {
            id: "sub_chemistry",
            _id: "sub_chemistry",
            name: "Chemistry",
            code: "CHEM101"
          }
        },
        {
          period_id: "fri_9",
          type: "subject",
          title: "Physics",
          start_offset: 440,
          duration_minutes: 40,
          color_code: "#4ECDC4",
          enabled: true,
          teacher: {
            id: "teacher_002",
            _id: "teacher_002",
            name: "Prof. Johnson",
            image: "/images/teachers/johnson.jpg",
            user_id: "user_teacher_002"
          },
          subject: {
            id: "sub_physics",
            _id: "sub_physics",
            name: "Physics",
            code: "PHY101"
          }
        }
      ]
    },

    // ==================== SATURDAY (Morning Only) ====================
    {
      day: "Saturday",
      is_holiday: false,
      periods: [
        {
          period_id: "sat_1",
          type: "subject",
          title: "Mathematics",
          start_offset: 0,
          duration_minutes: 40,
          color_code: "#FF6B6B",
          enabled: true,
          teacher: {
            id: "teacher_001",
            _id: "teacher_001",
            name: "Dr. Smith",
            image: "/images/teachers/smith.jpg",
            user_id: "user_teacher_001"
          },
          subject: {
            id: "sub_math",
            _id: "sub_math",
            name: "Mathematics",
            code: "MATH101"
          }
        },
        {
          period_id: "sat_2",
          type: "subject",
          title: "English",
          start_offset: 40,
          duration_minutes: 40,
          color_code: "#FFEAA7",
          enabled: true,
          teacher: {
            id: "teacher_005",
            _id: "teacher_005",
            name: "Mrs. Wilson",
            image: "/images/teachers/wilson.jpg",
            user_id: "user_teacher_005"
          },
          subject: {
            id: "sub_english",
            _id: "sub_english",
            name: "English",
            code: "ENG101"
          }
        },
        {
          period_id: "sat_break1",
          type: "break",
          title: "Morning Break",
          start_offset: 80,
          duration_minutes: 20,
          color_code: "#F7F9FC",
          enabled: true
        },
        {
          period_id: "sat_3",
          type: "subject",
          title: "Computer Science",
          start_offset: 100,
          duration_minutes: 40,
          color_code: "#55EFC4",
          enabled: true,
          teacher: {
            id: "teacher_008",
            _id: "teacher_008",
            name: "Mr. Clark",
            image: "/images/teachers/clark.jpg",
            user_id: "user_teacher_008"
          },
          subject: {
            id: "sub_computer",
            _id: "sub_computer",
            name: "Computer Science",
            code: "CS101"
          }
        },
        {
          period_id: "sat_free1",
          type: "subject",
          title: "Free Period",
          start_offset: 140,
          duration_minutes: 40,
          color_code: "#DFE6E9",
          enabled: true
        },
        {
          period_id: "sat_4",
          type: "subject",
          title: "Art",
          start_offset: 180,
          duration_minutes: 40,
          color_code: "#FD79A8",
          enabled: true,
          teacher: {
            id: "teacher_010",
            _id: "teacher_010",
            name: "Ms. Garcia",
            image: "/images/teachers/garcia.jpg",
            user_id: "user_teacher_010"
          },
          subject: {
            id: "sub_art",
            _id: "sub_art",
            name: "Art",
            code: "ART101"
          }
        }
      ]
    },

    // ==================== SUNDAY (Free Day) ====================
    {
      day: "Sunday",
      is_holiday: true,
      periods: [] // No periods on Sunday - complete free day
    }
  ],

  class: {
    id: "class_10A",
    _id: "class_10A",
    name: "Class 10A",
    username: "class_10a_2024",
    image: "/images/classes/10a.jpg"
  },

  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:00:00Z"
};
