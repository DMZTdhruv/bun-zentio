"use client";

import React from "react";
import { Toaster } from "sonner";
import { PlateEditor } from "./plate-editor";
import { SettingsProvider } from "./settings";

export default function ZentioEditor({ value }: { value?: any[] }) {
  return (
    <div className="max-h-screen w-full caret-white" data-registry="plate">
      <SettingsProvider>
        <PlateEditor value={value} />
      </SettingsProvider>
      <Toaster />
    </div>
  );
}
