import { tw } from "../../utilities/tw";

interface PageLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={tw("flex", "h-full w-full", className)}>{children}</div>
  );
}
