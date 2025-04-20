"use client";

import React from "react";
import { DndProvider } from "react-dnd";
import { useDebouncedCallback } from "use-debounce";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Plate } from "@udecode/plate/react";

import { useCreateEditor } from "~/components/editor/use-create-editor";
import { SettingsDialog } from "~/components/editor/settings";
import { Editor, EditorContainer } from "~/components/plate-ui/editor";

interface EditorProps {
  value?: any[];
  onChange?: (value: any[]) => void;
}

export function PlateEditor({ value, onChange }: EditorProps) {
  const editor = useCreateEditor({
    value: value,
  });

  const debounced = useDebouncedCallback((value) => {
    onChange(value);
  }, 1000);

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor} onChange={(e) => debounced(e.value)}>
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
