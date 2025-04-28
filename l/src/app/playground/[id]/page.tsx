import PlaygroundNotesPanel from "~/components/playground/playground-notes-panel";
import QuestionPanel from "~/components/playground/question-panel";
import PlaygroundHeader from "~/components/playground/playground-header";
import AiPanel from "~/components/playground/ai-panel";
import { CodingPanel } from "~/components/playground/coding-panel";

const Playground = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log({ id });
  return (
    <div className="flex max-h-dvh w-full flex-col px-4">
      <PlaygroundHeader id={id} />
      <div className="grid flex-1 grid-cols-10 gap-x-2 pb-2">
        <QuestionPanel id={id} />
        <CodingPanel id={id} />
        <AiPanel />
      </div>
      <PlaygroundNotesPanel id={id} />
    </div>
  );
};

export default Playground;
