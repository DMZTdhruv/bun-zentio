import PlaygroundNotesPanel from "~/components/playground/playground-notes-panel";
import QuestionPanel from "~/components/playground/question-panel";
import PlaygroundEditor, {
  PlaygroundJudge,
} from "~/components/playground/editor";
import PlaygroundHeader from "~/components/playground/playground-header";
import AiPanel from "~/components/playground/ai-panel";

const Playground = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="flex max-h-dvh w-full flex-col px-4">
      <PlaygroundHeader id={id} />
      <div className="grid flex-1 grid-cols-10 gap-x-2 pb-2">
        <QuestionPanel id={id} />
        <CodingPanel />
        <AiPanel />
      </div>
      <PlaygroundNotesPanel id={id} />
    </div>
  );
};

const CodingPanel = () => {
  return (
    <div className="col-span-4 flex flex-col space-y-2">
      <PlaygroundEditor />
      <PlaygroundJudge />
    </div>
  );
};

export default Playground;
