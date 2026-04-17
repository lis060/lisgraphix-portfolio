interface GoldDividerProps {
  className?: string;
}

export default function GoldDivider({ className = '' }: GoldDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/40" />
      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
}
