import CreateJobPost from "~/components/dashboard/create-job-post";
import JobMarket from "~/components/dashboard/job-market";
import RightSidePanel from "~/components/dashboard/right-side-panel";
import SearchJobPost from "~/components/dashboard/search-job-post";

export default function Home() {
  return (
    <div className="relative h-dvh">
      <div className="pb-[100px]">
        <header className="bg-background/10 sticky -top-[76px] z-50 mx-auto max-w-7xl px-8 pt-8 pb-4 backdrop-blur-xl">
          <h2 className="text-4xl font-semibold capitalize">
            Land your dream job with Ai
          </h2>
          <section className="flex items-center justify-between pt-4">
            <SearchJobPost />
            <div className="flex items-center">
              <CreateJobPost />
            </div>
          </section>
        </header>
        <JobMarket />
      </div>
      <RightSidePanel />
    </div>
  );
}
