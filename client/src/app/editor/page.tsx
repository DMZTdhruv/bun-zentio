"use client";
import dynamic from "next/dynamic";

const LazyZentioEditor = dynamic(
  () => import("~/components/editor/pl-editor"),
  {
    ssr: false,
    loading: () => <div>loading..</div>,
  },
);

export default function Page() {
  return (
    <div
      className="max-h-screen w-full overflow-y-scroll caret-white"
      data-registry="plate"
    >
      <LazyZentioEditor />
    </div>
  );
}
