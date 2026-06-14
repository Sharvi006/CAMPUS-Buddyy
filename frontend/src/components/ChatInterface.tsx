import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickActions } from "./QuickActions";
import { TypingIndicator } from "./TypingIndicator";
import { ChatMessage as ChatMessageType, generateWelcomeMessage } from "@/utils/chatbotEngine";
import { GraduationCap, Info, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([generateWelcomeMessage()]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // THIS IS THE NEW FETCH LOGIC PLACED IN THE CORRECT SPOT
  const handleSendMessage = async (content: string) => {
    // Add user message to UI immediately
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // 🚀 NEW: Call your Python FastAPI RAG backend
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          query: content
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response from FastAPI
      const data = await response.json();

      // Create the bot's response object
      const botMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: data.answer || data.reply || "I couldn't process that response.", 
        timestamp: new Date()
      };

      // Update UI with bot message
      setMessages(prev => [...prev, botMessage]);
      
      // Update local history
      setConversationHistory(prev => [
        ...prev,
        { role: "user", content },
        { role: "assistant", content: botMessage.content }
      ]);

    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Connection Issue",
        description: "Unable to reach the Python RAG backend. Make sure uvicorn is running!",
        variant: "destructive"
      });
      
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "I apologize, but my RAG brain isn't responding right now. Please check the backend server.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex-shrink-0 gradient-hero px-4 py-4 md:py-5 shadow-lg glow-purple">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center animate-pulse-glow">
            <GraduationCap className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="font-heading text-lg md:text-xl font-bold text-primary-foreground flex items-center gap-2">
              CAMPUS Buddy
              <Sparkles className="w-4 h-4 text-primary-foreground/80" />
            </h1>
            <p className="text-xs md:text-sm text-primary-foreground/80 flex items-center gap-1">
              Powered by Gemini AI
            </p>
          </div>
          <button 
            className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
            onClick={() => handleSendMessage("What can you help me with?")}
            disabled={isTyping}
          >
            <Info className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </header>

      {/* Quick Actions */}
      <div className="flex-shrink-0 bg-card/50 backdrop-blur-sm border-b border-border/30 py-3 px-4">
        <div className="max-w-4xl mx-auto">
          <QuickActions onActionClick={handleSendMessage} disabled={isTyping} />
        </div>
      </div>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              isLatest={index === messages.length - 1}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-shrink-0 bg-gradient-to-t from-background via-background to-transparent pt-2 pb-4 px-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSend={handleSendMessage} disabled={isTyping} />
          <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" />
            Built with Gemini API & Vector Embeddings
          </p>
        </div>
      </footer>
    </div>
  );
};