import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Complete college knowledge base embedded in the function
const collegeKnowledge = `
# TVIT College Knowledge Base

## College Overview
- Name: Techno Vision Institute of Technology (TVIT)
- Established: 2005
- Type: Private Engineering College
- Accreditation: NAAC A+ Accredited, NBA Approved
- Motto: "Excellence Through Innovation"
- Address: Technology Park, Innovation Road, Bangalore - 560001
- Phone: +91-80-1234-5678
- Email: info@tvit.edu.in
- Website: www.tvit.edu.in

## Leadership
- Chancellor: Dr. Rajesh Kumar (Ph.D. in Computer Science, MIT)
- Director: Dr. Priya Sharma (Ph.D. in Electronics, IISc Bangalore)

## Departments
1. Computer Science & Engineering (CSE) - HOD: Dr. Ananya Reddy, Location: Block A Floor 2-4, Intake: 180
2. Electronics & Communication Engineering (ECE) - HOD: Dr. Vikram Singh, Location: Block B Floor 1-3, Intake: 120
3. Mechanical Engineering (ME) - HOD: Dr. Suresh Patel, Location: Block C Floor 1-2, Intake: 90
4. Electrical Engineering (EE) - HOD: Dr. Kavitha Nair, Location: Block B Floor 4, Intake: 60
5. Civil Engineering - HOD: Dr. Mohammed Ali, Location: Block D Floor 1-2, Intake: 60
6. Management Studies (MBA) - HOD: Dr. Sunita Verma, Location: Management Block Floor 1-3, Intake: 120

## Courses Offered
### B.Tech CSE (4 Years, 8 Semesters)
Eligibility: 10+2 with PCM, JEE Main/State CET
Semester 1: Engineering Mathematics I, Physics, Chemistry, Programming in C, Engineering Graphics, Communication Skills
Semester 2: Engineering Mathematics II, Data Structures, Digital Electronics, Object-Oriented Programming, Environmental Science
Semester 3: Discrete Mathematics, Computer Organization, Database Management Systems, Java Programming, Operating Systems
Semester 4: Design & Analysis of Algorithms, Computer Networks, Software Engineering, Web Technologies, Probability & Statistics
Semester 5: Compiler Design, Machine Learning, Cloud Computing, Mobile App Development, Elective I
Semester 6: Artificial Intelligence, Information Security, Big Data Analytics, Elective II, Minor Project
Semester 7: Deep Learning, Blockchain Technology, Elective III, Elective IV, Major Project I
Semester 8: Industry Internship, Major Project II, Technical Seminar

### B.Tech ECE (4 Years, 8 Semesters)
Eligibility: 10+2 with PCM, JEE Main/State CET
Key subjects: Signals & Systems, Analog Electronics, VLSI Design, Communication Systems, Embedded Systems, IoT, 5G Networks

### MBA (2 Years, 4 Semesters)
Eligibility: Bachelor's Degree, CAT/MAT/GMAT Score
Key subjects: Management Principles, Financial Accounting, Marketing, HR Management, Strategic Management

## Faculty/Professors
1. Dr. Ananya Reddy - CSE, Professor & HOD - Machine Learning, Deep Learning - ananya.reddy@tvit.edu.in - Cabin A-401
2. Dr. Rahul Mehta - CSE, Associate Professor - Data Structures, Algorithms - rahul.mehta@tvit.edu.in - Cabin A-305
3. Prof. Sneha Kulkarni - CSE, Assistant Professor - Web Technologies, Database Systems - sneha.k@tvit.edu.in - Cabin A-210
4. Dr. Vikram Singh - ECE, Professor & HOD - VLSI Design, Digital Signal Processing - vikram.singh@tvit.edu.in - Cabin B-401
5. Prof. Meera Joshi - ECE, Associate Professor - Communication Systems, Wireless Networks - meera.j@tvit.edu.in - Cabin B-302
6. Dr. Suresh Patel - ME, Professor & HOD - Thermodynamics, Heat Transfer - suresh.patel@tvit.edu.in - Cabin C-301
7. Dr. Kavitha Nair - EE, Professor & HOD - Power Systems, Electrical Machines - kavitha.nair@tvit.edu.in - Cabin B-501
8. Dr. Sunita Verma - MBA, Professor & HOD - Strategic Management, Leadership - sunita.verma@tvit.edu.in - Cabin M-301

## Student Records (Sample Data)
1. Arjun Patel (CSE21001) - B.Tech CSE Sem 5 - Overall Attendance: 92% - CGPA: 8.7
2. Priya Sharma (CSE21002) - B.Tech CSE Sem 5 - Overall Attendance: 88% - CGPA: 9.1
3. Rahul Kumar (CSE21003) - B.Tech CSE Sem 5 - Overall Attendance: 78% - CGPA: 7.5
4. Sneha Reddy (ECE21001) - B.Tech ECE Sem 5 - Overall Attendance: 94% - CGPA: 9.3
5. Vikash Singh (ECE21002) - B.Tech ECE Sem 5 - Overall Attendance: 85% - CGPA: 8.2
6. Aisha Khan (MBA23001) - MBA Sem 3 - Overall Attendance: 96% - CGPA: 8.9
7. Rohit Verma (ME21001) - B.Tech ME Sem 5 - Overall Attendance: 82% - CGPA: 7.8
8. Kavya Nair (CSE22001) - B.Tech CSE Sem 3 - Overall Attendance: 90% - CGPA: 8.5

Minimum Attendance Required: 75%. Students below 75% may be detained from exams.

## Fee Structure (Per Year)
- B.Tech CSE: ₹1,98,000 (Tuition: ₹1,50,000 + Development: ₹20,000 + Library: ₹5,000 + Lab: ₹15,000 + Exam: ₹8,000)
- B.Tech ECE: ₹1,96,000
- B.Tech ME: ₹1,93,000
- B.Tech EE: ₹1,88,000
- B.Tech Civil: ₹1,80,000
- MBA: ₹3,20,000

Hostel Fees (Per Year):
- Single Room: ₹80,000
- Double Room: ₹60,000
- Triple Room: ₹45,000
- Mess Charges: ₹48,000

Scholarships: Merit Scholarship (up to 50%), Sports Quota (25%), EWS Category (100%), SC/ST Government Scholarship, Girl Child Scholarship (10%)

## Placements 2024
- Placement Rate: 92%
- Students Placed: 520 out of 565 eligible
- Highest Package: ₹45 LPA
- Average Package: ₹8.5 LPA
- Median Package: ₹7.2 LPA
- Top Recruiters: Google, Microsoft, Amazon, Infosys, TCS, Wipro, Accenture, Deloitte, Goldman Sachs, JP Morgan, Flipkart, Adobe, Oracle
- Sector-wise: IT 45%, Core 20%, Consulting 15%, Finance 12%, Others 8%
- Internship Average Stipend: ₹25,000/month
- Partnered Companies: 120

## Facilities

### Library
- Name: Central Library
- Location: Library Block, All Floors
- Timings: Weekdays 8:00 AM - 10:00 PM, Weekends 9:00 AM - 6:00 PM, During Exams: 24/7
- Books: 85,000+
- E-Resources: IEEE Xplore, Springer, ScienceDirect, NPTEL, Coursera Campus
- Seating: 600
- Rules: Maintain silence, No food/drinks, ID mandatory, Borrow for 14 days, Fine ₹5/day late

### Food Court
- Name: Campus Café & Food Court
- Location: Central Building, Ground Floor
- Timings: 7:00 AM - 10:00 PM
- Outlets: Main Canteen, Pizza Corner, Juice Bar, Coffee House, Chinese Wok
- Seating: 500
- Average Cost: ₹50-150 per meal
- Features: Air Conditioned, WiFi, Digital Payment, Hygiene Certified

### Sports Complex
- Name: TVIT Sports Complex
- Location: Behind Academic Block D
- Timings: 6:00 AM - 8:00 PM
- Indoor: 4 Badminton Courts, 6 Table Tennis, Chess Room, Carrom, Yoga Hall, Gymnasium
- Outdoor: Cricket Ground, Football Field, Basketball Court, Volleyball Court, Tennis Court, 400m Track, Swimming Pool
- Coach: Mr. Rajesh Nair (Chief Sports Officer)

### Health Center
- Location: Administrative Block, Ground Floor
- Timings: 8:00 AM - 8:00 PM
- Emergency: +91-80-1234-5680
- Services: First Aid, General Physician, Pharmacy, Ambulance

### Transport
- Routes: 25
- Coverage: All major areas within 30km
- Contact: +91-80-1234-5681
- Timing: 7:00 AM - 7:00 PM

## Campus Locations
- Block A: CSE (Floor 2-4), IT Dept (Floor 1), Central Computing (Ground)
- Block B: ECE (Floor 1-3), EE (Floor 4), ECE Labs (Ground)
- Block C: Mechanical Engineering (Floor 1-2), Workshop (Ground), ME Labs (Basement)
- Block D: Civil Engineering (Floor 1-2), Architecture (Floor 3), Survey Labs (Ground)
- Management Block: MBA (Floor 1-3), Conference Halls, Seminar Rooms
- Administrative Block: Principal's Office, Registrar, Accounts, Examination Cell, Health Center
- Central Building: Auditorium, Food Court, Placement Cell, Student Affairs

## Timetable Sample - B.Tech CSE Semester 5
Monday: 9:00-10:00 Machine Learning (Room 401), 10:00-11:00 Compiler Design (Room 402), 11:30-12:30 Cloud Computing (Room 403), 2:00-4:00 ML Lab (Lab 5)
Tuesday: 9:00-10:00 Mobile Development (Room 404), 10:00-11:00 Machine Learning (Room 401), 11:30-12:30 Compiler Design (Room 402), 2:00-3:00 Elective I (Room 405)
Wednesday: 9:00-11:00 Cloud Lab (Lab 6), 11:30-12:30 Mobile Development (Room 404), 2:00-3:00 Compiler Design (Room 402), 3:00-4:00 Elective I (Room 405)
Thursday: 9:00-10:00 Machine Learning (Room 401), 10:00-11:00 Cloud Computing (Room 403), 11:30-12:30 Elective I (Room 405), 2:00-4:00 Mobile Dev Lab (Lab 4)
Friday: 9:00-10:00 Compiler Design (Room 402), 10:00-11:00 Cloud Computing (Room 403), 11:30-12:30 Guest Lecture, 2:00-4:00 Project Work

## Academic Mentors
1. Dr. Ananya Reddy - CSE - 25 students - AI/ML Career Guidance
2. Dr. Vikram Singh - ECE - 22 students - VLSI & Hardware Design
3. Prof. Sneha Kulkarni - CSE - 30 students - Web Development & Startups
4. Dr. Sunita Verma - MBA - 20 students - Entrepreneurship
`;

const systemPrompt = `You are the official AI assistant for Techno Vision Institute of Technology (TVIT). You help students, parents, and visitors with accurate information about the college.

IMPORTANT RULES:
1. ONLY respond using information from the provided college knowledge base below.
2. If information is NOT available in the knowledge base, respond with: "Sorry, this information is currently not available. Please contact the college administration at info@tvit.edu.in or call +91-80-1234-5678."
3. NEVER generate fictional or made-up data.
4. Use polite, professional, college-style language.
5. Format responses nicely with bullet points, headers, and emojis where appropriate.
6. Be helpful and guide students to relevant information.
7. For student-specific queries like personal attendance or grades, remind them to check the student portal.

${collegeKnowledge}

Remember: You represent TVIT officially. Be accurate, helpful, and professional.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: message }
    ];

    console.log("Sending request to Lovable AI with message:", message);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        max_tokens: 1500,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: "Rate limit exceeded. Please try again in a moment." 
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: "Service temporarily unavailable. Please try again later." 
        }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I apologize, but I couldn't process your request. Please try again.";

    console.log("AI response received successfully");

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("College chat error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "An unexpected error occurred" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
