"use client";

import PlaygroundEditor, { PlaygroundJudge } from "./editor";

export const CodingPanel = ({ id }: { id: string }) => {
  return (
    <div className="col-span-4 flex flex-col space-y-2">
      <PlaygroundEditor id={id} />
      <PlaygroundJudge />
    </div>
  );
};
