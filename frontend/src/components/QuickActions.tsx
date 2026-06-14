import { quickActions } from "@/data/collegeData";
import { cn } from "@/lib/utils";

interface QuickActionsProps {
  onActionClick: (query: string) => void;
  disabled?: boolean;
}

export const QuickActions = ({ onActionClick, disabled }: QuickActionsProps) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex gap-2 px-1 min-w-max">
        {quickActions.map((action, index) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.query)}
            disabled={disabled}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-full",
              "bg-quickAction hover:bg-primary hover:text-primary-foreground",
              "border border-border/50 hover:border-primary",
              "text-sm font-medium text-foreground",
              "transition-all duration-300 hover:shadow-hover hover:scale-105",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              "animate-bounce-in whitespace-nowrap"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-base">{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};