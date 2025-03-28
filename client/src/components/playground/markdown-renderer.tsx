import React from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function MarkdownRenderer({ mdFormat }: { mdFormat: string }) {
  return (
    <div className="prose prose-invert prose-pre:p-0 prose-pre:bg-transparent col-span-3 max-w-none">
      <div className="col-span-3 h-[calc(100svh-84px)] w-full overflow-x-auto pr-4">
        <div className="prose markdown prose-invert max-w-full break-words">
          <ReactMarkdown
            components={{
              code: ({ inline, className, children, ...props }: CodeProps) => {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={{
                      ...materialDark,
                    }}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md text-xs"
                    wrapLines={true}
                    wrapLongLines={true}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {mdFormat}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
