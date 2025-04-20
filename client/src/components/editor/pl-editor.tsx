"use client";

import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { PlateEditor } from "./plate-editor";
import { SettingsProvider } from "./settings";
import {
  updateGlobalNoteContent,
  updateInterviewNoteContent,
} from "~/store/note";

export function GlobalZentioEditor({ value }: { value?: any[] }) {
  return (
    <div className="max-h-screen w-full caret-white" data-registry="plate">
      <SettingsProvider>
        <PlateEditor onChange={updateGlobalNoteContent} value={value} />
      </SettingsProvider>
      <Toaster />
    </div>
  );
}

export function InterviewZentioEditor({
  id,
  value,
}: {
  id: string;
  value?: any[];
}) {
  return (
    <div className="max-h-screen w-full caret-white" data-registry="plate">
      <SettingsProvider>
        <PlateEditor
          onChange={(editorValue) => {
            console.log(editorValue);
            console.log("sup kings");
            updateInterviewNoteContent(id, editorValue);
          }}
          value={value}
        />
      </SettingsProvider>
      <Toaster />
    </div>
  );
}
