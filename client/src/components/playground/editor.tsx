"use client";

import { TerminalIcon } from "lucide-react";

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
import "ace-builds/src-min-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-min-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-min-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-min-noconflict/theme-tomorrow_night";
import "ace-builds/src-min-noconflict/theme-tomorrow";
import "ace-builds/src-min-noconflict/theme-textmate";
import "ace-builds/src-min-noconflict/theme-terminal";
import "ace-builds/src-min-noconflict/theme-sqlserver";
import "ace-builds/src-min-noconflict/theme-solarized_light";
import "ace-builds/src-min-noconflict/theme-solarized_dark";
import "ace-builds/src-min-noconflict/theme-pastel_on_dark";
import "ace-builds/src-min-noconflict/theme-one_dark";
import "ace-builds/src-min-noconflict/theme-nord_dark";
import "ace-builds/src-min-noconflict/theme-monokai";
import "ace-builds/src-min-noconflict/theme-mono_industrial";
import "ace-builds/src-min-noconflict/theme-merbivore_soft";
import "ace-builds/src-min-noconflict/theme-merbivore";
import "ace-builds/src-min-noconflict/theme-kuroir";
import "ace-builds/src-min-noconflict/theme-kr_theme";
import "ace-builds/src-min-noconflict/theme-katzenmilch";
import "ace-builds/src-min-noconflict/theme-iplastic";
import "ace-builds/src-min-noconflict/theme-idle_fingers";
import "ace-builds/src-min-noconflict/theme-gruvbox_light_hard";
import "ace-builds/src-min-noconflict/theme-gruvbox_dark_hard";
import "ace-builds/src-min-noconflict/theme-gruvbox";
import "ace-builds/src-min-noconflict/theme-gob";
import "ace-builds/src-min-noconflict/theme-github_light_default";
import "ace-builds/src-min-noconflict/theme-github_dark";
import "ace-builds/src-min-noconflict/theme-github";
import "ace-builds/src-min-noconflict/theme-eclipse";
import "ace-builds/src-min-noconflict/theme-dreamweaver";
import "ace-builds/src-min-noconflict/theme-dracula";
import "ace-builds/src-min-noconflict/theme-dawn";
import "ace-builds/src-min-noconflict/theme-crimson_editor";
import "ace-builds/src-min-noconflict/theme-cobalt";
import "ace-builds/src-min-noconflict/theme-clouds_midnight";
import "ace-builds/src-min-noconflict/theme-clouds";
import "ace-builds/src-min-noconflict/theme-cloud_editor_dark";
import "ace-builds/src-min-noconflict/theme-cloud_editor";
import "ace-builds/src-min-noconflict/theme-cloud9_night_low_color";
import "ace-builds/src-min-noconflict/theme-cloud9_night";
import "ace-builds/src-min-noconflict/theme-cloud9_day";
import "ace-builds/src-min-noconflict/theme-chrome";
import "ace-builds/src-min-noconflict/theme-chaos";
import "ace-builds/src-min-noconflict/theme-ambiance";
import "ace-builds/src-min-noconflict/theme-twilight";
import { LangaugeSchema } from "~/schema/language";
import { useEffect, useRef, useState } from "react";
import { languages } from "~/config/language";
import { handleToggleSidebar } from "~/store/sidebar";

const PlaygroundEditor = () => {
  const [mode, setMode] = useState<LangaugeSchema>(languages[0]);
  const editorRef = useRef<Ace.Editor | null>(null);
  const [selectedId, setSelectedId] = useState<string>("0");
  const handleSelectLanguage = (languageId: number) => {
    const language = languages[languageId];
    setSelectedId(String(languageId));
    setMode(language);
  };

  const handleEditorOnLoad = (editor: Ace.Editor) => {
    editorRef.current = editor;
    editor.session.setValue(mode.content);
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

  return (
    <section className="bg-job-card flex h-[64%] flex-col overflow-hidden rounded-md">
      <header className="flex items-center justify-between bg-neutral-800 px-2 py-1 capitalize">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} strokeWidth={3} />
          <span className="font-semibold">{mode.mode}</span>
        </div>
        <Select
          value={selectedId}
          onValueChange={(value) => {
            handleSelectLanguage(parseInt(value));
          }}
        >
          <SelectTrigger className="">
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
          mode={languages[0].mode}
          fontSize={16}
          theme="twilight"
          onLoad={handleEditorOnLoad}
          style={{
            height: "100%",
            width: "100%",
            borderEndEndRadius: "4px",
          }}
          setOptions={{
            wrap: true,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            enableMobileMenu: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </section>
  );
};

export default PlaygroundEditor;

export const PlaygroundJudge = () => {
  return <section className="bg-job-card flex-1 rounded-md border"></section>;
};
