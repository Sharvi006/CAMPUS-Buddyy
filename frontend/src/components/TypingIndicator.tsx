import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 justify-start animate-fade-in">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-soft">
        <Bot className="w-5 h-5 text-primary-foreground" />
      </div>
      
      <div className="bg-chat-bot rounded-2xl rounded-tl-md px-4 py-3 shadow-soft">
        <div className="flex gap-1.5 items-center h-5">
          <span 
            className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-typing"
            style={{ animationDelay: "0ms" }}
          />
          <span 
            className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-typing"
            style={{ animationDelay: "150ms" }}
          />
          <span 
            className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-typing"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
};
