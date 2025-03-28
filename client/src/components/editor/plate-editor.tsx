"use client";

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Plate } from "@udecode/plate/react";

import { useCreateEditor } from "~/components/editor/use-create-editor";
import { SettingsDialog } from "~/components/editor/settings";
import { Editor, EditorContainer } from "~/components/plate-ui/editor";

export function PlateEditor({ value }: { value?: any[] }) {
  const editor = useCreateEditor({
    value: value,
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editor={editor}
        onChange={(value) => {
          console.log(value);
        }}
      >
        <EditorContainer>
          <Editor
            variant="demo"
            className="dark caret-white selection:bg-teal-200/40 selection:text-white"
          />
        </EditorContainer>

        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
