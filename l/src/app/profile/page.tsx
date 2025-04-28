import React from "react";
import { ProfileActions } from "~/components/profile/actions";
import { ProfileHeader } from "~/components/profile/header";

const Page = () => {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-8 pt-10">
        <header>
          <h1 className="text-4xl font-semibold capitalize">User Profile</h1>
        </header>
      </div>
      <div className="mx-auto max-w-7xl">
        <ProfileHeader />
        <ProfileActions />
      </div>
    </section>
  );
};

export default Page;
