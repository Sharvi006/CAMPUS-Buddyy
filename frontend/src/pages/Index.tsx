import { ChatInterface } from "@/components/ChatInterface";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>CAMPUS Buddy - AI-Powered College Chatbot | Techno Vision Institute</title>
        <meta 
          name="description" 
          content="Get instant AI-powered answers about TVIT courses, professors, students, timetables, fees, placements, and campus facilities. Built with Gemini API & Vector Embeddings." 
        />
        <meta name="keywords" content="TVIT, AI chatbot, Gemini, college assistant, courses, placements, fees, timetable, students" />
        <meta name="theme-color" content="#8B5CF6" />
      </Helmet>
      <ChatInterface />
    </>
  );
};

export default Index;