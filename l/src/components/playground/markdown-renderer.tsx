"use client";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("copied to clipboard successfully");
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        components={{
          // @ts-expect-error <unknown weird ahh error>
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const code = String(children).replace(/\n$/, "");
            if (!inline && match) {
              return (
                <div className="group relative">
                  <Button
                    size="sm"
                    onClick={() => handleCopyCode(code)}
                    className="absolute top-2 right-2 flex items-center gap-1.5 rounded-md border border-neutral-600 bg-neutral-800/50 px-2 py-1 text-xs leading-none font-semibold text-white opacity-0 backdrop-blur-3xl transition-opacity group-hover:opacity-100 hover:bg-neutral-700"
                  >
                    <Copy size={12} className="mr-1" />
                    {copiedCode === code ? "Copied!" : "Copy"}
                  </Button>
                  <SyntaxHighlighter
                    // @ts-expect-error <unknown weird ahh error>
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="!mt-4 !mb-6 rounded-lg"
                    {...props}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          p: ({ ...props }) => <p className="my-2" {...props} />,
          h1: ({ ...props }) => (
            <h1 className="mt-4 mb-4 text-3xl font-bold" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="mt-3 mb-3 text-2xl font-bold" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="mt-3 mb-3 text-xl font-bold" {...props} />
          ),
          h4: ({ ...props }) => (
            <h4 className="mt-2 mb-2 text-lg font-bold" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="my-2 list-disc space-y-2 pl-6" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="my-2 list-decimal space-y-2 pl-6" {...props} />
          ),
          li: ({ ...props }) => <li className="mb-1" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote
              className="my-3 border-l-4 border-neutral-300 pl-4 text-neutral-700 italic dark:border-neutral-700 dark:text-neutral-300"
              {...props}
            />
          ),
          hr: ({ ...props }) => (
            <hr
              className="my-8 border-neutral-200 dark:border-neutral-800"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
