import { ChatMessage as ChatMessageType } from "@/utils/chatbotEngine";
import { cn } from "@/lib/utils";
import { Bot, User, Sparkles } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
  isLatest?: boolean;
}

const formatContent = (content: string) => {
  // Convert markdown-like formatting to HTML
  let formatted = content
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Line breaks
    .replace(/\n/g, '<br/>');
  
  return formatted;
};

export const ChatMessage = ({ message, isLatest }: ChatMessageProps) => {
  const isBot = message.role === "bot";

  return (
    <div
      className={cn(
        "flex gap-3 animate-slide-up",
        isBot ? "justify-start" : "justify-end"
      )}
      style={{ animationDelay: isLatest ? "0ms" : "0ms" }}
    >
      {isBot && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full gradient-hero flex items-center justify-center shadow-hover relative">
          <Bot className="w-5 h-5 text-primary-foreground" />
          <Sparkles className="w-3 h-3 text-primary-foreground absolute -top-1 -right-1" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3",
          isBot
            ? "bg-chat-bot text-chat-bot-foreground rounded-tl-md shadow-soft border border-border/30"
            : "bg-chat-user text-chat-user-foreground rounded-tr-md shadow-hover glow-purple"
        )}
      >
        <div
          className="text-sm md:text-base leading-relaxed prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
        />
        <div
          className={cn(
            "text-[10px] mt-2 opacity-60",
            isBot ? "text-left" : "text-right"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-soft border border-primary/20">
          <User className="w-5 h-5 text-primary" />
        </div>
      )}
    </div>
  );
};