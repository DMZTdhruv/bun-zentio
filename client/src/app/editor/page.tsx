"use client";

import { GlobalZentioEditor } from "~/components/editor/pl-editor";
import { useNoteStore } from "~/store/note";

export default function Page() {
  const { globalNoteContent } = useNoteStore();
  console.log(globalNoteContent);
  return (
    <div
      className="max-h-screen w-full overflow-y-scroll caret-white"
      data-registry="plate"
    >
      <GlobalZentioEditor value={globalNoteContent} />
    </div>
  );
}
