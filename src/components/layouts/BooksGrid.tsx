import { tw } from "../../utilities/tw";

interface BooksGridProps {
  children: React.ReactNode | React.ReactNode[];
}

export function BooksGrid(props: BooksGridProps) {
  return (
    <div className={tw("flex flex-wrap gap-x-6 gap-y-6", "py-10")}>
      {props.children}
    </div>
  );
}
