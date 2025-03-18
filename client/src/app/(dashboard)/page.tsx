import { Search } from "lucide-react";
import CreateJobPost from "~/components/dashboard/create-job-post";
import JobPosting from "~/components/dashboard/job-postings";
import RightSidePanel from "~/components/dashboard/right-side-panel";
import { Input } from "~/components/ui/input";

export default function Home() {
  return (
    <div className="relative h-dvh">
      <div className="mx-auto max-w-7xl px-8 pt-10 pb-[100px]">
        <header>
          <h2 className="text-4xl font-semibold capitalize">
            Land your dream job with Ai
          </h2>
        </header>
        <section className="mt-4 flex items-center justify-between">
          <div className="relative flex max-w-xl flex-1 items-center">
            <Input
              placeholder="Search for an ai based mocked interview"
              className="w-full bg-neutral-900 py-5 text-white"
            />
            <Search
              className="absolute top-1/2 right-4 -translate-y-1/2"
              size={18}
            />
          </div>
          <div className="flex items-center">
            <CreateJobPost />
          </div>
        </section>
        <section className="mt-14 w-full">
          <div>
            <header className="font-medium">Created By You</header>
            <JobPosting />
          </div>
        </section>
      </div>
      <RightSidePanel />
    </div>
  );
}
