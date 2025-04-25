import { File, TerminalIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import type { Ace } from "ace-builds";

import "ace-builds/src-min-noconflict/ace";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/ext-settings_menu";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-statusbar";
import "ace-builds/src-min-noconflict/ext-code_lens";
import "ace-builds/src-min-noconflict/ext-error_marker";
import "ace-builds/src-min-noconflict/ext-static_highlight";
import "ace-builds/src-min-noconflict/ext-emmet";

// ========================
import "ace-builds/src-min-noconflict/mode-assembly_x86";
import "ace-builds/src-min-noconflict/mode-sh";
import "ace-builds/src-min-noconflict/mode-c_cpp";
import "ace-builds/src-min-noconflict/mode-csharp";
import "ace-builds/src-min-noconflict/mode-clojure";
import "ace-builds/src-min-noconflict/mode-cobol";
import "ace-builds/src-min-noconflict/mode-lisp";
import "ace-builds/src-min-noconflict/mode-d";
import "ace-builds/src-min-noconflict/mode-elixir";
import "ace-builds/src-min-noconflict/mode-erlang";
import "ace-builds/src-min-noconflict/mode-fsharp";
import "ace-builds/src-min-noconflict/mode-fortran";
import "ace-builds/src-min-noconflict/mode-golang";
import "ace-builds/src-min-noconflict/mode-groovy";
import "ace-builds/src-min-noconflict/mode-haskell";
import "ace-builds/src-min-noconflict/mode-java";
import "ace-builds/src-min-noconflict/mode-javascript";
import "ace-builds/src-min-noconflict/mode-kotlin";
import "ace-builds/src-min-noconflict/mode-lua";
import "ace-builds/src-min-noconflict/mode-objectivec";
import "ace-builds/src-min-noconflict/mode-perl";
import "ace-builds/src-min-noconflict/mode-ocaml";
import "ace-builds/src-min-noconflict/mode-pascal";
import "ace-builds/src-min-noconflict/mode-php";
import "ace-builds/src-min-noconflict/mode-prolog";
import "ace-builds/src-min-noconflict/mode-python";
import "ace-builds/src-min-noconflict/mode-r";
import "ace-builds/src-min-noconflict/mode-ruby";
import "ace-builds/src-min-noconflict/mode-rust";
import "ace-builds/src-min-noconflict/mode-scala";
import "ace-builds/src-min-noconflict/mode-sql";
import "ace-builds/src-min-noconflict/mode-swift";
import "ace-builds/src-min-noconflict/mode-typescript";
import "ace-builds/src-min-noconflict/mode-nim";
// 8========================D
import "ace-builds/src-min-noconflict/snippets/vbscript";
import "ace-builds/src-min-noconflict/snippets/assembly_x86";
import "ace-builds/src-min-noconflict/snippets/sh";
import "ace-builds/src-min-noconflict/snippets/c_cpp";
import "ace-builds/src-min-noconflict/snippets/clojure";
import "ace-builds/src-min-noconflict/snippets/cobol";
import "ace-builds/src-min-noconflict/snippets/lisp";
import "ace-builds/src-min-noconflict/snippets/d";
import "ace-builds/src-min-noconflict/snippets/elixir";
import "ace-builds/src-min-noconflict/snippets/erlang";
import "ace-builds/src-min-noconflict/snippets/fsharp";
import "ace-builds/src-min-noconflict/snippets/fortran";
import "ace-builds/src-min-noconflict/snippets/golang";
import "ace-builds/src-min-noconflict/snippets/groovy";
import "ace-builds/src-min-noconflict/snippets/haskell";
import "ace-builds/src-min-noconflict/snippets/java";
import "ace-builds/src-min-noconflict/snippets/javascript";
import "ace-builds/src-min-noconflict/snippets/kotlin";
import "ace-builds/src-min-noconflict/snippets/lua";
import "ace-builds/src-min-noconflict/snippets/objectivec";
import "ace-builds/src-min-noconflict/snippets/ocaml";
import "ace-builds/src-min-noconflict/snippets/pascal";
import "ace-builds/src-min-noconflict/snippets/perl";
import "ace-builds/src-min-noconflict/snippets/csharp";
import "ace-builds/src-min-noconflict/snippets/prolog";
import "ace-builds/src-min-noconflict/snippets/python";
import "ace-builds/src-min-noconflict/snippets/r";
import "ace-builds/src-min-noconflict/snippets/ruby";
import "ace-builds/src-min-noconflict/snippets/rust";
import "ace-builds/src-min-noconflict/snippets/scala";
import "ace-builds/src-min-noconflict/snippets/sql";
import "ace-builds/src-min-noconflict/snippets/swift";
import "ace-builds/src-min-noconflict/snippets/typescript";
import "ace-builds/src-min-noconflict/snippets/php";
import "ace-builds/src-min-noconflict/snippets/vbscript";
import "ace-builds/src-min-noconflict/snippets/nim";
// ========================
import "ace-builds/src-min-noconflict/theme-twilight";
import { LangaugeSchema } from "~/schema/language";
import { useEffect, useRef, useState } from "react";
import { languages } from "~/config/language";
import { handleToggleSidebar } from "~/store/sidebar";
import { updateInterviewRound, useSolutionStore } from "~/store/solution";
import { useQueryState } from "nuqs";

const PlaygroundEditor = ({ id }: { id: string }) => {
  const [mode, setMode] = useState<LangaugeSchema>(languages[1]);
  const editorRef = useRef<Ace.Editor | null>(null);
  const [selectedId, setSelectedId] = useState<string>("1");
  const [q] = useQueryState("q", { defaultValue: "0" });
  const code = useSolutionStore.getState().interviewRound;
  const [editorContent, setEditorContent] = useState<string>("");
  const handleSelectLanguage = (languageId: number) => {
    const language = languages[languageId];
    setSelectedId(String(languageId));
    setMode(language);
  };

  const handleCodeChange = (code: string) => {
    const currentIndex = String(q ?? 0);
    updateInterviewRound(id, currentIndex, code);
  };

  const handleEditorOnLoad = (editor: Ace.Editor) => {
    const interview = code[id];
    const editorCode = interview ? (interview[q] ?? "") : "";
    setEditorContent(editorCode);
    editor.getSession().setMode(`ace/mode/${mode.mode}`);
  };

  useEffect(() => {
    handleToggleSidebar(true);
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.session.setValue(mode.content);
    editorRef.current.getSession().setMode(`ace/mode/${mode.mode}`);
  }, [mode]);

  useEffect(() => {
    const interview = code[id];
    const editorCode = interview ? (interview[q] ?? "") : "";
    setEditorContent(editorCode);
  }, [q]);

  return (
    <section className="bg-job-card flex h-[74%] flex-col overflow-hidden rounded-md">
      <header className="flex items-center justify-between bg-neutral-800 px-2 text-xs capitalize">
        <div className="flex items-center gap-2">
          <File size={16} strokeWidth={3} />
          <span className="text-sm font-medium capitalize">{mode.mode}</span>
        </div>
        <Select
          value={selectedId}
          onValueChange={(value) => {
            handleSelectLanguage(parseInt(value));
          }}
        >
          <SelectTrigger className="text-sm capitalize">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.entries(languages).map(([key, value]) => {
                return (
                  <SelectItem key={key} value={key}>
                    {value.mode}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>{" "}
      </header>
      <div className="flex-1">
        <AceEditor
          mode={languages[1].mode}
          fontSize={14}
          theme="twilight"
          value={editorContent}
          onLoad={handleEditorOnLoad}
          style={{
            height: "100%",
            width: "100%",
            borderEndEndRadius: "4px",
          }}
          onChange={(code) => {
            console.log("code from the onChange", code);
            setEditorContent(code);
            handleCodeChange(code);
          }}
          setOptions={{
            wrap: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            enableMobileMenu: false,
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
      </div>
    </section>
  );
};

export default PlaygroundEditor;

export const PlaygroundJudge = () => {
  return (
    <section className="bg-job-card flex-1 rounded-md border">
      <header className="flex items-center justify-between bg-neutral-800 px-2 py-2 text-xs capitalize">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} strokeWidth={3} />
          <span className="font-semibold">Terminal</span>
        </div>
      </header>
      <div className="p-2">
        zentio/client [dev] <br /> {">"}
      </div>
    </section>
  );
};
