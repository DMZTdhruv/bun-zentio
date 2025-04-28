import SignInCard from "~/components/auth/sign-in";

const Page = () => {
  return (
    <section className="grid h-screen grid-cols-5 items-center">
      <div className="col-span-2 h-full scale-x-95 scale-y-[0.97] rounded-md bg-neutral-500" />
      <div className="col-span-3 px-[100px]">
        <div className="mb-8">
          <h1 className="text-[88px] leading-[1.0] font-semibold tracking-tight">
            Zentio
          </h1>
          <p className="text-lg text-neutral-400">
            Land your dream tech job with ai
          </p>
        </div>
        <SignInCard />
      </div>
    </section>
  );
};

export default Page;
