import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex items-end gap-2 bg-card rounded-2xl border border-border/50 shadow-soft p-2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your question here..."
        disabled={disabled}
        rows={1}
        className={cn(
          "flex-1 resize-none bg-transparent px-3 py-2.5",
          "text-foreground placeholder:text-muted-foreground",
          "focus:outline-none text-sm md:text-base",
          "min-h-[44px] max-h-[120px]",
          "disabled:opacity-50"
        )}
        style={{
          height: "auto",
          overflowY: input.split("\n").length > 3 ? "auto" : "hidden"
        }}
      />
      
      <button
        onClick={handleSend}
        disabled={!input.trim() || disabled}
        className={cn(
          "flex-shrink-0 w-11 h-11 rounded-xl",
          "bg-primary hover:bg-primary/90",
          "flex items-center justify-center",
          "transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:shadow-hover active:scale-95"
        )}
      >
        <Send className="w-5 h-5 text-primary-foreground" />
      </button>
    </div>
  );
};
