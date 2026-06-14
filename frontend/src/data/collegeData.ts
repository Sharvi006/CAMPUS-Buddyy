export const collegeData = {
  overview: {
    name: "Techno Vision Institute of Technology",
    established: 2005,
    type: "Private Engineering College",
    accreditation: "NAAC A+ Accredited, NBA Approved",
    motto: "Excellence Through Innovation",
    address: "Technology Park, Innovation Road, Bangalore - 560001",
    phone: "+91-80-1234-5678",
    email: "info@tvit.edu.in",
    website: "www.tvit.edu.in",
    chancellor: {
      name: "Dr. Rajesh Kumar",
      title: "Chancellor",
      qualification: "Ph.D. in Computer Science, MIT",
      message: "Committed to nurturing future leaders in technology and innovation."
    },
    director: {
      name: "Dr. Priya Sharma",
      title: "Director",
      qualification: "Ph.D. in Electronics, IISc Bangalore"
    }
  },

  departments: [
    {
      id: "cse",
      name: "Computer Science & Engineering",
      hod: "Dr. Ananya Reddy",
      courses: ["B.Tech CSE", "M.Tech CSE", "Ph.D. Computer Science"],
      intake: 180,
      location: "Block A, Floor 2-4"
    },
    {
      id: "ece",
      name: "Electronics & Communication Engineering",
      hod: "Dr. Vikram Singh",
      courses: ["B.Tech ECE", "M.Tech VLSI", "M.Tech Communication Systems"],
      intake: 120,
      location: "Block B, Floor 1-3"
    },
    {
      id: "me",
      name: "Mechanical Engineering",
      hod: "Dr. Suresh Patel",
      courses: ["B.Tech ME", "M.Tech Thermal Engineering"],
      intake: 90,
      location: "Block C, Floor 1-2"
    },
    {
      id: "ee",
      name: "Electrical Engineering",
      hod: "Dr. Kavitha Nair",
      courses: ["B.Tech EE", "M.Tech Power Systems"],
      intake: 60,
      location: "Block B, Floor 4"
    },
    {
      id: "civil",
      name: "Civil Engineering",
      hod: "Dr. Mohammed Ali",
      courses: ["B.Tech Civil", "M.Tech Structural Engineering"],
      intake: 60,
      location: "Block D, Floor 1-2"
    },
    {
      id: "mba",
      name: "Management Studies",
      hod: "Dr. Sunita Verma",
      courses: ["MBA", "PGDM"],
      intake: 120,
      location: "Management Block, Floor 1-3"
    }
  ],

  courses: {
    "B.Tech CSE": {
      duration: "4 Years",
      semesters: 8,
      totalCredits: 180,
      eligibility: "10+2 with PCM, JEE Main/State CET",
      subjects: {
        semester1: ["Engineering Mathematics I", "Physics", "Chemistry", "Programming in C", "Engineering Graphics", "Communication Skills"],
        semester2: ["Engineering Mathematics II", "Data Structures", "Digital Electronics", "Object-Oriented Programming", "Environmental Science"],
        semester3: ["Discrete Mathematics", "Computer Organization", "Database Management Systems", "Java Programming", "Operating Systems"],
        semester4: ["Design & Analysis of Algorithms", "Computer Networks", "Software Engineering", "Web Technologies", "Probability & Statistics"],
        semester5: ["Compiler Design", "Machine Learning", "Cloud Computing", "Mobile App Development", "Elective I"],
        semester6: ["Artificial Intelligence", "Information Security", "Big Data Analytics", "Elective II", "Minor Project"],
        semester7: ["Deep Learning", "Blockchain Technology", "Elective III", "Elective IV", "Major Project I"],
        semester8: ["Industry Internship", "Major Project II", "Technical Seminar"]
      }
    },
    "B.Tech ECE": {
      duration: "4 Years",
      semesters: 8,
      totalCredits: 180,
      eligibility: "10+2 with PCM, JEE Main/State CET",
      subjects: {
        semester1: ["Engineering Mathematics I", "Physics", "Chemistry", "Basic Electronics", "Engineering Graphics", "Communication Skills"],
        semester2: ["Engineering Mathematics II", "Network Analysis", "Digital Electronics", "Electronic Devices", "Environmental Science"],
        semester3: ["Signals & Systems", "Analog Electronics", "Electromagnetic Theory", "Data Structures", "Microprocessors"],
        semester4: ["Control Systems", "Communication Systems", "VLSI Design", "Digital Signal Processing", "Probability & Statistics"],
        semester5: ["Microcontrollers", "Antenna & Wave Propagation", "Embedded Systems", "Optical Communication", "Elective I"],
        semester6: ["Wireless Communication", "IoT Systems", "RF Circuit Design", "Elective II", "Minor Project"],
        semester7: ["5G Networks", "Satellite Communication", "Elective III", "Elective IV", "Major Project I"],
        semester8: ["Industry Internship", "Major Project II", "Technical Seminar"]
      }
    },
    "MBA": {
      duration: "2 Years",
      semesters: 4,
      totalCredits: 120,
      eligibility: "Bachelor's Degree, CAT/MAT/GMAT Score",
      subjects: {
        semester1: ["Principles of Management", "Financial Accounting", "Business Statistics", "Organizational Behavior", "Marketing Management"],
        semester2: ["Operations Management", "Human Resource Management", "Financial Management", "Business Research Methods", "Business Communication"],
        semester3: ["Strategic Management", "Specialization Core I", "Specialization Core II", "Elective I", "Summer Internship"],
        semester4: ["Entrepreneurship", "Business Ethics", "Specialization Elective", "Major Project", "Industry Interface"]
      }
    }
  },

  professors: [
    { id: 1, name: "Dr. Ananya Reddy", department: "CSE", designation: "Professor & HOD", subjects: ["Machine Learning", "Deep Learning"], email: "ananya.reddy@tvit.edu.in", cabin: "A-401" },
    { id: 2, name: "Dr. Rahul Mehta", department: "CSE", designation: "Associate Professor", subjects: ["Data Structures", "Algorithms"], email: "rahul.mehta@tvit.edu.in", cabin: "A-305" },
    { id: 3, name: "Prof. Sneha Kulkarni", department: "CSE", designation: "Assistant Professor", subjects: ["Web Technologies", "Database Systems"], email: "sneha.k@tvit.edu.in", cabin: "A-210" },
    { id: 4, name: "Dr. Vikram Singh", department: "ECE", designation: "Professor & HOD", subjects: ["VLSI Design", "Digital Signal Processing"], email: "vikram.singh@tvit.edu.in", cabin: "B-401" },
    { id: 5, name: "Prof. Meera Joshi", department: "ECE", designation: "Associate Professor", subjects: ["Communication Systems", "Wireless Networks"], email: "meera.j@tvit.edu.in", cabin: "B-302" },
    { id: 6, name: "Dr. Suresh Patel", department: "ME", designation: "Professor & HOD", subjects: ["Thermodynamics", "Heat Transfer"], email: "suresh.patel@tvit.edu.in", cabin: "C-301" },
    { id: 7, name: "Prof. Arun Kumar", department: "ME", designation: "Assistant Professor", subjects: ["Fluid Mechanics", "Manufacturing"], email: "arun.k@tvit.edu.in", cabin: "C-205" },
    { id: 8, name: "Dr. Kavitha Nair", department: "EE", designation: "Professor & HOD", subjects: ["Power Systems", "Electrical Machines"], email: "kavitha.nair@tvit.edu.in", cabin: "B-501" },
    { id: 9, name: "Dr. Sunita Verma", department: "MBA", designation: "Professor & HOD", subjects: ["Strategic Management", "Leadership"], email: "sunita.verma@tvit.edu.in", cabin: "M-301" },
    { id: 10, name: "Prof. Nikhil Sharma", department: "MBA", designation: "Associate Professor", subjects: ["Marketing", "Consumer Behavior"], email: "nikhil.s@tvit.edu.in", cabin: "M-205" }
  ],

  timetable: {
    "B.Tech CSE": {
      semester3: {
        monday: ["9:00-10:00 Discrete Mathematics (Room 301)", "10:00-11:00 DBMS Lab (Lab 1)", "11:30-12:30 Java Programming (Room 302)", "2:00-3:00 Computer Organization (Room 301)"],
        tuesday: ["9:00-10:00 Operating Systems (Room 303)", "10:00-11:00 Discrete Mathematics (Room 301)", "11:30-12:30 DBMS (Room 302)", "2:00-4:00 Java Lab (Lab 2)"],
        wednesday: ["9:00-11:00 OS Lab (Lab 3)", "11:30-12:30 Java Programming (Room 302)", "2:00-3:00 Computer Organization (Room 301)", "3:00-4:00 DBMS (Room 302)"],
        thursday: ["9:00-10:00 Discrete Mathematics (Room 301)", "10:00-11:00 Java Programming (Room 302)", "11:30-12:30 Operating Systems (Room 303)", "2:00-3:00 Tutorial"],
        friday: ["9:00-10:00 Computer Organization (Room 301)", "10:00-11:00 DBMS (Room 302)", "11:30-12:30 Operating Systems (Room 303)", "2:00-4:00 Mini Project"]
      },
      semester5: {
        monday: ["9:00-10:00 Machine Learning (Room 401)", "10:00-11:00 Compiler Design (Room 402)", "11:30-12:30 Cloud Computing (Room 403)", "2:00-4:00 ML Lab (Lab 5)"],
        tuesday: ["9:00-10:00 Mobile Development (Room 404)", "10:00-11:00 Machine Learning (Room 401)", "11:30-12:30 Compiler Design (Room 402)", "2:00-3:00 Elective I (Room 405)"],
        wednesday: ["9:00-11:00 Cloud Lab (Lab 6)", "11:30-12:30 Mobile Development (Room 404)", "2:00-3:00 Compiler Design (Room 402)", "3:00-4:00 Elective I (Room 405)"],
        thursday: ["9:00-10:00 Machine Learning (Room 401)", "10:00-11:00 Cloud Computing (Room 403)", "11:30-12:30 Elective I (Room 405)", "2:00-4:00 Mobile Dev Lab (Lab 4)"],
        friday: ["9:00-10:00 Compiler Design (Room 402)", "10:00-11:00 Cloud Computing (Room 403)", "11:30-12:30 Guest Lecture", "2:00-4:00 Project Work"]
      }
    },
    "B.Tech ECE": {
      semester3: {
        monday: ["9:00-10:00 Signals & Systems (Room 201)", "10:00-11:00 Analog Electronics (Room 202)", "11:30-12:30 EM Theory (Room 203)", "2:00-4:00 Electronics Lab (Lab E1)"],
        tuesday: ["9:00-10:00 Data Structures (Room 204)", "10:00-11:00 Microprocessors (Room 201)", "11:30-12:30 Analog Electronics (Room 202)", "2:00-3:00 Signals & Systems (Room 201)"],
        wednesday: ["9:00-11:00 Microprocessor Lab (Lab E2)", "11:30-12:30 EM Theory (Room 203)", "2:00-3:00 Data Structures (Room 204)", "3:00-4:00 Tutorial"],
        thursday: ["9:00-10:00 Analog Electronics (Room 202)", "10:00-11:00 Signals & Systems (Room 201)", "11:30-12:30 Microprocessors (Room 201)", "2:00-4:00 DS Lab (Lab 1)"],
        friday: ["9:00-10:00 EM Theory (Room 203)", "10:00-11:00 Data Structures (Room 204)", "11:30-12:30 Microprocessors (Room 201)", "2:00-4:00 Project Work"]
      }
    }
  },

  students: [
    { rollNo: "CSE21001", name: "Arjun Patel", course: "B.Tech CSE", semester: 5, cgpa: 8.7, attendance: 92, email: "arjun.patel@tvit.edu.in", phone: "+91-9876543201", bloodGroup: "B+", hostel: "Boys Hostel A - Room 205", mentor: "Dr. Ananya Reddy" },
    { rollNo: "CSE21002", name: "Priya Sharma", course: "B.Tech CSE", semester: 5, cgpa: 9.1, attendance: 88, email: "priya.sharma@tvit.edu.in", phone: "+91-9876543202", bloodGroup: "A+", hostel: "Girls Hostel B - Room 112", mentor: "Prof. Sneha Kulkarni" },
    { rollNo: "CSE21003", name: "Rahul Kumar", course: "B.Tech CSE", semester: 5, cgpa: 7.5, attendance: 78, email: "rahul.kumar@tvit.edu.in", phone: "+91-9876543203", bloodGroup: "O+", hostel: "Day Scholar", mentor: "Dr. Rahul Mehta" },
    { rollNo: "ECE21001", name: "Sneha Reddy", course: "B.Tech ECE", semester: 5, cgpa: 9.3, attendance: 94, email: "sneha.reddy@tvit.edu.in", phone: "+91-9876543204", bloodGroup: "AB+", hostel: "Girls Hostel A - Room 304", mentor: "Dr. Vikram Singh" },
    { rollNo: "ECE21002", name: "Vikash Singh", course: "B.Tech ECE", semester: 5, cgpa: 8.2, attendance: 85, email: "vikash.singh@tvit.edu.in", phone: "+91-9876543205", bloodGroup: "B-", hostel: "Boys Hostel B - Room 410", mentor: "Prof. Meera Joshi" },
    { rollNo: "MBA23001", name: "Aisha Khan", course: "MBA", semester: 3, cgpa: 8.9, attendance: 96, email: "aisha.khan@tvit.edu.in", phone: "+91-9876543206", bloodGroup: "A-", hostel: "Girls Hostel C - Room 201", mentor: "Dr. Sunita Verma" },
    { rollNo: "ME21001", name: "Rohit Verma", course: "B.Tech ME", semester: 5, cgpa: 7.8, attendance: 82, email: "rohit.verma@tvit.edu.in", phone: "+91-9876543207", bloodGroup: "O-", hostel: "Boys Hostel A - Room 315", mentor: "Dr. Suresh Patel" },
    { rollNo: "CSE22001", name: "Kavya Nair", course: "B.Tech CSE", semester: 3, cgpa: 8.5, attendance: 90, email: "kavya.nair@tvit.edu.in", phone: "+91-9876543208", bloodGroup: "A+", hostel: "Girls Hostel B - Room 208", mentor: "Prof. Sneha Kulkarni" },
    { rollNo: "EE21001", name: "Amit Joshi", course: "B.Tech EE", semester: 5, cgpa: 8.0, attendance: 87, email: "amit.joshi@tvit.edu.in", phone: "+91-9876543209", bloodGroup: "B+", hostel: "Day Scholar", mentor: "Dr. Kavitha Nair" },
    { rollNo: "CIVIL21001", name: "Pooja Gupta", course: "B.Tech Civil", semester: 5, cgpa: 8.4, attendance: 91, email: "pooja.gupta@tvit.edu.in", phone: "+91-9876543210", bloodGroup: "O+", hostel: "Girls Hostel A - Room 105", mentor: "Dr. Mohammed Ali" }
  ],

  attendance: {
    sampleStudents: [
      { rollNo: "CSE21001", name: "Arjun Patel", course: "B.Tech CSE", semester: 5, attendance: 92, subjects: { "Machine Learning": 95, "Compiler Design": 88, "Cloud Computing": 92, "Mobile Development": 94 } },
      { rollNo: "CSE21002", name: "Priya Sharma", course: "B.Tech CSE", semester: 5, attendance: 88, subjects: { "Machine Learning": 90, "Compiler Design": 85, "Cloud Computing": 88, "Mobile Development": 89 } },
      { rollNo: "CSE21003", name: "Rahul Kumar", course: "B.Tech CSE", semester: 5, attendance: 78, subjects: { "Machine Learning": 82, "Compiler Design": 75, "Cloud Computing": 78, "Mobile Development": 77 } },
      { rollNo: "ECE21001", name: "Sneha Reddy", course: "B.Tech ECE", semester: 5, attendance: 94, subjects: { "Microcontrollers": 96, "Embedded Systems": 92, "Antenna": 94, "Optical Comm": 94 } },
      { rollNo: "ECE21002", name: "Vikash Singh", course: "B.Tech ECE", semester: 5, attendance: 85, subjects: { "Microcontrollers": 88, "Embedded Systems": 82, "Antenna": 86, "Optical Comm": 84 } }
    ],
    minimumRequired: 75,
    warning: "Students with attendance below 75% may be detained from exams."
  },

  fees: {
    "B.Tech CSE": { tuition: 150000, development: 20000, library: 5000, lab: 15000, exam: 8000, total: 198000, perSemester: 99000 },
    "B.Tech ECE": { tuition: 145000, development: 20000, library: 5000, lab: 18000, exam: 8000, total: 196000, perSemester: 98000 },
    "B.Tech ME": { tuition: 140000, development: 20000, library: 5000, lab: 20000, exam: 8000, total: 193000, perSemester: 96500 },
    "B.Tech EE": { tuition: 140000, development: 20000, library: 5000, lab: 15000, exam: 8000, total: 188000, perSemester: 94000 },
    "B.Tech Civil": { tuition: 135000, development: 20000, library: 5000, lab: 12000, exam: 8000, total: 180000, perSemester: 90000 },
    "MBA": { tuition: 250000, development: 30000, library: 8000, placement: 20000, exam: 12000, total: 320000, perSemester: 160000 },
    hostel: { singleRoom: 80000, doubleRoom: 60000, tripleRoom: 45000, mess: 48000 },
    scholarships: ["Merit Scholarship (up to 50%)", "Sports Quota (25%)", "EWS Category (100%)", "SC/ST Scholarship (Government)", "Girl Child Scholarship (10%)"]
  },

  placements: {
    year2024: {
      placementRate: 92,
      averagePackage: "8.5 LPA",
      highestPackage: "45 LPA",
      medianPackage: "7.2 LPA",
      studentsPlaced: 520,
      totalEligible: 565,
      topRecruiters: ["Google", "Microsoft", "Amazon", "Infosys", "TCS", "Wipro", "Accenture", "Deloitte", "Goldman Sachs", "JP Morgan", "Flipkart", "Swiggy", "Zomato", "Adobe", "Oracle"],
      sectorWise: { IT: "45%", Core: "20%", Consulting: "15%", Finance: "12%", Others: "8%" }
    },
    internships: {
      averageStipend: "25,000/month",
      partneredCompanies: 120,
      internshipRate: 78
    },
    trainingPrograms: ["Aptitude Training", "Technical Mock Interviews", "Group Discussions", "Resume Building", "LinkedIn Profile Optimization", "Industry Certifications"]
  },

  mentors: [
    { name: "Dr. Ananya Reddy", department: "CSE", studentsAssigned: 25, email: "ananya.reddy@tvit.edu.in", specialization: "AI/ML Career Guidance" },
    { name: "Dr. Vikram Singh", department: "ECE", studentsAssigned: 22, email: "vikram.singh@tvit.edu.in", specialization: "VLSI & Hardware Design" },
    { name: "Prof. Sneha Kulkarni", department: "CSE", studentsAssigned: 30, email: "sneha.k@tvit.edu.in", specialization: "Web Development & Startups" },
    { name: "Dr. Sunita Verma", department: "MBA", studentsAssigned: 20, email: "sunita.verma@tvit.edu.in", specialization: "Entrepreneurship" }
  ],

  facilities: {
    foodCourt: {
      name: "Campus Café & Food Court",
      location: "Central Building, Ground Floor",
      timings: "7:00 AM - 10:00 PM",
      outlets: ["Main Canteen (South Indian, North Indian)", "Pizza Corner", "Juice Bar & Snacks", "Coffee House", "Chinese Wok"],
      seatingCapacity: 500,
      averageCost: "₹50-150 per meal",
      specialFeatures: ["Air Conditioned", "WiFi Enabled", "Digital Payment", "Hygiene Certified"]
    },
    library: {
      name: "Central Library",
      location: "Library Block, All Floors",
      timings: { weekdays: "8:00 AM - 10:00 PM", weekends: "9:00 AM - 6:00 PM", exams: "24/7 Access" },
      totalBooks: 85000,
      eResources: ["IEEE Xplore", "Springer", "ScienceDirect", "NPTEL", "Coursera Campus"],
      seating: 600,
      facilities: ["Reading Halls", "Discussion Rooms", "Computer Section", "Reference Section", "Thesis Section"],
      rules: ["Maintain silence", "No food or drinks", "ID card mandatory", "Books can be borrowed for 14 days", "Fine: ₹5/day for late returns"]
    },
    sportsComplex: {
      name: "TVIT Sports Complex",
      location: "Behind Academic Block D",
      timings: "6:00 AM - 8:00 PM",
      indoor: ["Badminton Courts (4)", "Table Tennis (6)", "Chess Room", "Carrom", "Yoga Hall", "Gymnasium"],
      outdoor: ["Cricket Ground", "Football Field", "Basketball Court", "Volleyball Court", "Tennis Court", "400m Track", "Swimming Pool"],
      events: ["Annual Sports Meet", "Inter-College Tournaments", "Fitness Programs"],
      coach: "Mr. Rajesh Nair (Chief Sports Officer)"
    },
    medical: {
      name: "Campus Health Center",
      location: "Administrative Block, Ground Floor",
      timings: "8:00 AM - 8:00 PM",
      emergencyContact: "+91-80-1234-5680",
      facilities: ["First Aid", "General Physician", "Pharmacy", "Ambulance Service"]
    },
    transport: {
      routes: 25,
      coverage: "All major areas within 30km radius",
      contact: "+91-80-1234-5681",
      timing: "7:00 AM - 7:00 PM"
    }
  },

  departmentLocations: {
    "Block A": ["Computer Science & Engineering (Floor 2-4)", "IT Department (Floor 1)", "Central Computing Facility (Ground Floor)"],
    "Block B": ["Electronics & Communication (Floor 1-3)", "Electrical Engineering (Floor 4)", "ECE Labs (Ground Floor)"],
    "Block C": ["Mechanical Engineering (Floor 1-2)", "Workshop (Ground Floor)", "ME Labs (Basement)"],
    "Block D": ["Civil Engineering (Floor 1-2)", "Architecture (Floor 3)", "Survey Labs (Ground Floor)"],
    "Management Block": ["MBA Department (Floor 1-3)", "Conference Halls", "Seminar Rooms"],
    "Administrative Block": ["Principal's Office", "Registrar", "Accounts", "Examination Cell", "Health Center"],
    "Central Building": ["Auditorium", "Food Court", "Placement Cell", "Student Affairs"]
  }
};

export type QuickAction = {
  id: string;
  label: string;
  icon: string;
  query: string;
};

export const quickActions: QuickAction[] = [
  { id: "courses", label: "Courses", icon: "📚", query: "What courses are offered?" },
  { id: "professors", label: "Professors", icon: "👨‍🏫", query: "Tell me about the professors" },
  { id: "students", label: "Students", icon: "🎓", query: "Show me student records and information" },
  { id: "timetable", label: "Timetable", icon: "📅", query: "Show me the timetable for CSE semester 5" },
  { id: "fees", label: "Fees", icon: "💰", query: "What are the fees for different courses?" },
  { id: "placements", label: "Placements", icon: "🎯", query: "Tell me about placements and recruiters" },
  { id: "facilities", label: "Facilities", icon: "🏫", query: "What facilities are available on campus?" },
  { id: "library", label: "Library", icon: "📖", query: "What are the library timings and rules?" },
  { id: "sports", label: "Sports", icon: "⚽", query: "Tell me about the sports complex" }
];
