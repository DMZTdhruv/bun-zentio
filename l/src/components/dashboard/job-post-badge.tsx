import { cn } from "~/lib/utils";

type JobPostBadgeProps = {
  title?: string;
  className?: string;
};

const JobPostBadge = ({ title, className }: JobPostBadgeProps) => {
  if (!title) return;
  return (
    <span
      className={cn(
        `w-fit rounded-full border bg-neutral-800 px-4 py-1 text-sm font-[500] tracking-tighter group-hover:border-neutral-700`,
        className,
      )}
    >
      {title}
    </span>
  );
};

export default JobPostBadge;
