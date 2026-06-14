import { collegeData } from "@/data/collegeData";

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const notAvailableResponse = "Sorry, this information is currently not available. Please contact the college administration at info@tvit.edu.in or call +91-80-1234-5678.";

const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

export const generateResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase().trim();

  // College Overview
  if (lowerQuery.includes("college name") || lowerQuery.includes("about college") || lowerQuery.includes("overview") || lowerQuery.includes("tell me about the college")) {
    const { overview } = collegeData;
    return `🏛️ **${overview.name}**\n\n` +
      `📅 Established: ${overview.established}\n` +
      `🏆 ${overview.accreditation}\n` +
      `📍 ${overview.address}\n` +
      `📞 ${overview.phone}\n` +
      `📧 ${overview.email}\n\n` +
      `*"${overview.motto}"*`;
  }

  // Chancellor / Leadership
  if (lowerQuery.includes("chancellor") || lowerQuery.includes("director") || lowerQuery.includes("leadership") || lowerQuery.includes("administration")) {
    const { overview } = collegeData;
    return `👔 **College Leadership**\n\n` +
      `**Chancellor:** ${overview.chancellor.name}\n` +
      `${overview.chancellor.qualification}\n` +
      `*"${overview.chancellor.message}"*\n\n` +
      `**Director:** ${overview.director.name}\n` +
      `${overview.director.qualification}`;
  }

  // Departments
  if (lowerQuery.includes("department") && !lowerQuery.includes("location")) {
    const depts = collegeData.departments;
    let response = "🏢 **Departments at TVIT**\n\n";
    depts.forEach(dept => {
      response += `**${dept.name}**\n`;
      response += `• HOD: ${dept.hod}\n`;
      response += `• Courses: ${dept.courses.join(", ")}\n`;
      response += `• Intake: ${dept.intake} students\n\n`;
    });
    return response;
  }

  // Courses
  if (lowerQuery.includes("course") || lowerQuery.includes("program") || lowerQuery.includes("what courses")) {
    const depts = collegeData.departments;
    let response = "📚 **Courses Offered at TVIT**\n\n";
    depts.forEach(dept => {
      response += `**${dept.name}:**\n`;
      dept.courses.forEach(course => {
        response += `• ${course}\n`;
      });
      response += "\n";
    });
    response += "Would you like details about any specific course?";
    return response;
  }

  // Subjects for specific course
  if (lowerQuery.includes("subject") || lowerQuery.includes("syllabus") || lowerQuery.includes("curriculum")) {
    if (lowerQuery.includes("cse") || lowerQuery.includes("computer science")) {
      const course = collegeData.courses["B.Tech CSE"];
      let response = "📖 **B.Tech CSE Subjects**\n\n";
      response += `Duration: ${course.duration} | Semesters: ${course.semesters}\n\n`;
      Object.entries(course.subjects).slice(0, 4).forEach(([sem, subjects]) => {
        response += `**${sem.charAt(0).toUpperCase() + sem.slice(1)}:**\n`;
        subjects.forEach(sub => response += `• ${sub}\n`);
        response += "\n";
      });
      response += "*Ask for specific semester subjects for complete list.*";
      return response;
    }
    if (lowerQuery.includes("ece") || lowerQuery.includes("electronics")) {
      const course = collegeData.courses["B.Tech ECE"];
      let response = "📖 **B.Tech ECE Subjects**\n\n";
      response += `Duration: ${course.duration} | Semesters: ${course.semesters}\n\n`;
      Object.entries(course.subjects).slice(0, 4).forEach(([sem, subjects]) => {
        response += `**${sem.charAt(0).toUpperCase() + sem.slice(1)}:**\n`;
        subjects.forEach(sub => response += `• ${sub}\n`);
        response += "\n";
      });
      return response;
    }
    if (lowerQuery.includes("mba") || lowerQuery.includes("management")) {
      const course = collegeData.courses["MBA"];
      let response = "📖 **MBA Subjects**\n\n";
      response += `Duration: ${course.duration} | Semesters: ${course.semesters}\n\n`;
      Object.entries(course.subjects).forEach(([sem, subjects]) => {
        response += `**${sem.charAt(0).toUpperCase() + sem.slice(1)}:**\n`;
        subjects.forEach(sub => response += `• ${sub}\n`);
        response += "\n";
      });
      return response;
    }
    return "Please specify which course subjects you'd like to know about (CSE, ECE, ME, EE, Civil, or MBA).";
  }

  // Professors
  if (lowerQuery.includes("professor") || lowerQuery.includes("faculty") || lowerQuery.includes("teacher") || lowerQuery.includes("who teaches")) {
    const profs = collegeData.professors;
    let response = "👨‍🏫 **Faculty Members**\n\n";
    
    if (lowerQuery.includes("cse") || lowerQuery.includes("computer")) {
      const cseProfs = profs.filter(p => p.department === "CSE");
      response = "👨‍🏫 **CSE Faculty**\n\n";
      cseProfs.forEach(p => {
        response += `**${p.name}** - ${p.designation}\n`;
        response += `📧 ${p.email} | 🚪 ${p.cabin}\n`;
        response += `Teaches: ${p.subjects.join(", ")}\n\n`;
      });
    } else if (lowerQuery.includes("ece") || lowerQuery.includes("electronics")) {
      const eceProfs = profs.filter(p => p.department === "ECE");
      response = "👨‍🏫 **ECE Faculty**\n\n";
      eceProfs.forEach(p => {
        response += `**${p.name}** - ${p.designation}\n`;
        response += `📧 ${p.email} | 🚪 ${p.cabin}\n`;
        response += `Teaches: ${p.subjects.join(", ")}\n\n`;
      });
    } else {
      profs.slice(0, 6).forEach(p => {
        response += `**${p.name}** (${p.department})\n`;
        response += `${p.designation} | ${p.subjects.join(", ")}\n\n`;
      });
      response += "*Ask about specific department for complete faculty list.*";
    }
    return response;
  }

  // Timetable
  if (lowerQuery.includes("timetable") || lowerQuery.includes("schedule") || lowerQuery.includes("class timing")) {
    if (lowerQuery.includes("cse") && (lowerQuery.includes("5") || lowerQuery.includes("sem 5") || lowerQuery.includes("semester 5"))) {
      const tt = collegeData.timetable["B.Tech CSE"].semester5;
      let response = "📅 **B.Tech CSE Semester 5 Timetable**\n\n";
      Object.entries(tt).forEach(([day, classes]) => {
        response += `**${day.charAt(0).toUpperCase() + day.slice(1)}:**\n`;
        classes.forEach(c => response += `• ${c}\n`);
        response += "\n";
      });
      return response;
    }
    if (lowerQuery.includes("cse") && (lowerQuery.includes("3") || lowerQuery.includes("sem 3") || lowerQuery.includes("semester 3"))) {
      const tt = collegeData.timetable["B.Tech CSE"].semester3;
      let response = "📅 **B.Tech CSE Semester 3 Timetable**\n\n";
      Object.entries(tt).forEach(([day, classes]) => {
        response += `**${day.charAt(0).toUpperCase() + day.slice(1)}:**\n`;
        classes.forEach(c => response += `• ${c}\n`);
        response += "\n";
      });
      return response;
    }
    if (lowerQuery.includes("ece")) {
      const tt = collegeData.timetable["B.Tech ECE"].semester3;
      let response = "📅 **B.Tech ECE Semester 3 Timetable**\n\n";
      Object.entries(tt).forEach(([day, classes]) => {
        response += `**${day.charAt(0).toUpperCase() + day.slice(1)}:**\n`;
        classes.forEach(c => response += `• ${c}\n`);
        response += "\n";
      });
      return response;
    }
    return "📅 **Timetable Information**\n\nPlease specify:\n• Course (CSE, ECE, etc.)\n• Semester number\n\nExample: *\"Show timetable for CSE semester 5\"*";
  }

  // Attendance
  if (lowerQuery.includes("attendance")) {
    const { attendance } = collegeData;
    let response = "📊 **Attendance Information**\n\n";
    response += `⚠️ Minimum Required: ${attendance.minimumRequired}%\n`;
    response += `${attendance.warning}\n\n`;
    response += "**Sample Student Records:**\n\n";
    attendance.sampleStudents.forEach(s => {
      response += `**${s.name}** (${s.rollNo})\n`;
      response += `${s.course} - Sem ${s.semester}\n`;
      response += `Overall Attendance: ${s.attendance}%\n\n`;
    });
    return response;
  }

  // Fees
  if (lowerQuery.includes("fee") || lowerQuery.includes("cost") || lowerQuery.includes("tuition") || lowerQuery.includes("payment")) {
    const { fees } = collegeData;
    let response = "💰 **Fee Structure**\n\n";
    
    if (lowerQuery.includes("cse")) {
      const f = fees["B.Tech CSE"];
      response = "💰 **B.Tech CSE Fees (Per Year)**\n\n";
      response += `• Tuition: ${formatCurrency(f.tuition)}\n`;
      response += `• Development: ${formatCurrency(f.development)}\n`;
      response += `• Library: ${formatCurrency(f.library)}\n`;
      response += `• Lab: ${formatCurrency(f.lab)}\n`;
      response += `• Examination: ${formatCurrency(f.exam)}\n\n`;
      response += `**Total Annual: ${formatCurrency(f.total)}**\n`;
      response += `Per Semester: ${formatCurrency(f.perSemester)}`;
    } else if (lowerQuery.includes("mba")) {
      const f = fees["MBA"];
      response = "💰 **MBA Fees (Per Year)**\n\n";
      response += `• Tuition: ${formatCurrency(f.tuition)}\n`;
      response += `• Development: ${formatCurrency(f.development)}\n`;
      response += `• Library: ${formatCurrency(f.library)}\n`;
      response += `• Placement: ${formatCurrency(f.placement)}\n`;
      response += `• Examination: ${formatCurrency(f.exam)}\n\n`;
      response += `**Total Annual: ${formatCurrency(f.total)}**`;
    } else if (lowerQuery.includes("hostel")) {
      const h = fees.hostel;
      response = "🏠 **Hostel Fees (Per Year)**\n\n";
      response += `• Single Room: ${formatCurrency(h.singleRoom)}\n`;
      response += `• Double Room: ${formatCurrency(h.doubleRoom)}\n`;
      response += `• Triple Room: ${formatCurrency(h.tripleRoom)}\n`;
      response += `• Mess Charges: ${formatCurrency(h.mess)}`;
    } else {
      Object.entries(fees).forEach(([course, f]) => {
        if (typeof f === 'object' && 'total' in f) {
          response += `**${course}:** ${formatCurrency(f.total)}/year\n`;
        }
      });
      response += "\n**Scholarships Available:**\n";
      fees.scholarships.forEach(s => response += `• ${s}\n`);
    }
    return response;
  }

  // Placements
  if (lowerQuery.includes("placement") || lowerQuery.includes("recruiter") || lowerQuery.includes("job") || lowerQuery.includes("package") || lowerQuery.includes("salary")) {
    const p = collegeData.placements.year2024;
    let response = "🎯 **Placement Statistics 2024**\n\n";
    response += `📈 Placement Rate: **${p.placementRate}%**\n`;
    response += `💼 Students Placed: ${p.studentsPlaced}/${p.totalEligible}\n\n`;
    response += `**Package Details:**\n`;
    response += `• Highest: ${p.highestPackage}\n`;
    response += `• Average: ${p.averagePackage}\n`;
    response += `• Median: ${p.medianPackage}\n\n`;
    response += `**Top Recruiters:**\n${p.topRecruiters.slice(0, 10).join(" • ")}\n\n`;
    response += `**Sector-wise Placement:**\n`;
    Object.entries(p.sectorWise).forEach(([sector, percent]) => {
      response += `• ${sector}: ${percent}\n`;
    });
    return response;
  }

  // Mentors
  if (lowerQuery.includes("mentor") || lowerQuery.includes("advisor") || lowerQuery.includes("counselor")) {
    const mentors = collegeData.mentors;
    let response = "👥 **Academic Mentors**\n\n";
    mentors.forEach(m => {
      response += `**${m.name}** (${m.department})\n`;
      response += `📧 ${m.email}\n`;
      response += `Students Assigned: ${m.studentsAssigned}\n`;
      response += `Specialization: ${m.specialization}\n\n`;
    });
    return response;
  }

  // Food Court / Canteen
  if (lowerQuery.includes("food") || lowerQuery.includes("canteen") || lowerQuery.includes("cafe") || lowerQuery.includes("eat") || lowerQuery.includes("mess")) {
    const fc = collegeData.facilities.foodCourt;
    let response = "🍽️ **${fc.name}**\n\n";
    response = `🍽️ **${fc.name}**\n\n`;
    response += `📍 ${fc.location}\n`;
    response += `⏰ ${fc.timings}\n`;
    response += `👥 Seating: ${fc.seatingCapacity}\n`;
    response += `💵 Average Cost: ${fc.averageCost}\n\n`;
    response += `**Food Outlets:**\n`;
    fc.outlets.forEach(o => response += `• ${o}\n`);
    response += `\n**Features:** ${fc.specialFeatures.join(" • ")}`;
    return response;
  }

  // Library
  if (lowerQuery.includes("library") || lowerQuery.includes("book") || lowerQuery.includes("reading")) {
    const lib = collegeData.facilities.library;
    let response = `📚 **${lib.name}**\n\n`;
    response += `📍 ${lib.location}\n\n`;
    response += `**Timings:**\n`;
    response += `• Weekdays: ${lib.timings.weekdays}\n`;
    response += `• Weekends: ${lib.timings.weekends}\n`;
    response += `• During Exams: ${lib.timings.exams}\n\n`;
    response += `📖 Total Books: ${lib.totalBooks.toLocaleString()}\n`;
    response += `💻 Seating Capacity: ${lib.seating}\n\n`;
    response += `**E-Resources:** ${lib.eResources.join(" • ")}\n\n`;
    response += `**Library Rules:**\n`;
    lib.rules.forEach(r => response += `• ${r}\n`);
    return response;
  }

  // Sports
  if (lowerQuery.includes("sport") || lowerQuery.includes("gym") || lowerQuery.includes("fitness") || lowerQuery.includes("ground") || lowerQuery.includes("swimming")) {
    const sp = collegeData.facilities.sportsComplex;
    let response = `⚽ **${sp.name}**\n\n`;
    response += `📍 ${sp.location}\n`;
    response += `⏰ ${sp.timings}\n`;
    response += `👤 Coach: ${sp.coach}\n\n`;
    response += `**Indoor Facilities:**\n`;
    sp.indoor.forEach(f => response += `• ${f}\n`);
    response += `\n**Outdoor Facilities:**\n`;
    sp.outdoor.forEach(f => response += `• ${f}\n`);
    response += `\n**Events:** ${sp.events.join(" • ")}`;
    return response;
  }

  // Department Locations
  if (lowerQuery.includes("location") || lowerQuery.includes("where is") || lowerQuery.includes("find") || lowerQuery.includes("block") || lowerQuery.includes("building")) {
    const locs = collegeData.departmentLocations;
    let response = "🗺️ **Campus Map & Locations**\n\n";
    Object.entries(locs).forEach(([block, facilities]) => {
      response += `**${block}:**\n`;
      facilities.forEach(f => response += `• ${f}\n`);
      response += "\n";
    });
    return response;
  }

  // Facilities general
  if (lowerQuery.includes("facilit") || lowerQuery.includes("amenities") || lowerQuery.includes("infrastructure")) {
    const { facilities } = collegeData;
    let response = "🏫 **Campus Facilities**\n\n";
    response += `📚 **Library:** ${facilities.library.totalBooks.toLocaleString()} books, ${facilities.library.seating} seats\n`;
    response += `⏰ ${facilities.library.timings.weekdays}\n\n`;
    response += `🍽️ **Food Court:** ${facilities.foodCourt.seatingCapacity} seats\n`;
    response += `⏰ ${facilities.foodCourt.timings}\n\n`;
    response += `⚽ **Sports Complex:** Indoor & Outdoor facilities\n`;
    response += `⏰ ${facilities.sportsComplex.timings}\n\n`;
    response += `🏥 **Health Center:** ${facilities.medical.timings}\n`;
    response += `🚌 **Transport:** ${facilities.transport.routes} routes\n\n`;
    response += "*Ask specifically about any facility for more details.*";
    return response;
  }

  // Medical / Health
  if (lowerQuery.includes("medical") || lowerQuery.includes("health") || lowerQuery.includes("doctor") || lowerQuery.includes("hospital")) {
    const med = collegeData.facilities.medical;
    let response = `🏥 **${med.name}**\n\n`;
    response += `📍 ${med.location}\n`;
    response += `⏰ ${med.timings}\n`;
    response += `🚨 Emergency: ${med.emergencyContact}\n\n`;
    response += `**Services:**\n`;
    med.facilities.forEach(f => response += `• ${f}\n`);
    return response;
  }

  // Transport
  if (lowerQuery.includes("transport") || lowerQuery.includes("bus") || lowerQuery.includes("shuttle")) {
    const tr = collegeData.facilities.transport;
    let response = "🚌 **Campus Transport**\n\n";
    response += `• Routes: ${tr.routes}\n`;
    response += `• Coverage: ${tr.coverage}\n`;
    response += `• Timing: ${tr.timing}\n`;
    response += `• Contact: ${tr.contact}`;
    return response;
  }

  // Greetings
  if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("hey") || lowerQuery === "hii") {
    return "👋 Hello! Welcome to CAMPUS Buddy. I'm here to help you with information about:\n\n" +
      "• 📚 Courses & Subjects\n• 👨‍🏫 Professors\n• 📅 Timetables\n• 💰 Fees\n• 🎯 Placements\n• 🏫 Facilities\n\n" +
      "How can I assist you today?";
  }

  // Thank you
  if (lowerQuery.includes("thank") || lowerQuery.includes("thanks")) {
    return "You're welcome! 😊 If you have any more questions about TVIT, feel free to ask. I'm here to help!";
  }

  // Help
  if (lowerQuery.includes("help") || lowerQuery.includes("what can you")) {
    return "🤖 **I can help you with:**\n\n" +
      "• **College Info** - Overview, leadership, motto\n" +
      "• **Academics** - Courses, subjects, syllabus\n" +
      "• **Faculty** - Professors, their subjects, contact\n" +
      "• **Timetable** - Class schedules by course/semester\n" +
      "• **Attendance** - Records, requirements\n" +
      "• **Fees** - Course fees, hostel, scholarships\n" +
      "• **Placements** - Stats, recruiters, packages\n" +
      "• **Mentors** - Academic advisors\n" +
      "• **Facilities** - Library, sports, food court, medical\n" +
      "• **Locations** - Department & facility locations\n\n" +
      "Just ask your question or use the quick action buttons!";
  }

  // Default - not available
  return notAvailableResponse;
};

export const generateWelcomeMessage = (): ChatMessage => ({
  id: "welcome",
  role: "bot",
  content: `👋 **Welcome to CAMPUS Buddy!**\n\nI'm your virtual guide for **Techno Vision Institute of Technology**. I can help you with:\n\n` +
    `• 📚 Courses & Subjects\n• 👨‍🏫 Faculty Information\n• 📅 Timetables\n• 💰 Fee Structure\n• 🎯 Placements & Recruiters\n• 🏫 Campus Facilities\n\n` +
    `Use the quick action buttons below or type your question. How can I help you today?`,
  timestamp: new Date()
});
