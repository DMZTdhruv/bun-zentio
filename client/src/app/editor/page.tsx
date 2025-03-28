import { Toaster } from "sonner";

import { PlateEditor } from "~/components/editor/plate-editor";
import { SettingsProvider } from "~/components/editor/settings";

export default function Page() {
  return (
    <div
      className="max-h-screen w-full overflow-y-scroll caret-white"
      data-registry="plate"
    >
      <SettingsProvider>
        <PlateEditor />
      </SettingsProvider>

      <Toaster />
    </div>
  );
}
