"use client";

import { PartType } from "@/util/users";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeViewerProps {
  username: string;
  part: PartType;
  day: number;
  language: string;
  fetchSourceCode: (
    username: string,
    day: number,
    part: PartType
  ) => Promise<string>;
}

export default function CodeViewer({
  username,
  part,
  day,
  language,
  fetchSourceCode,
}: CodeViewerProps) {
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchSourceCode(username, day, part)
      .then((result) => {
        setCode(result);
        setIsLoading(false);
      })
      .catch((error) => {
        setCode(`// Error: ${error.message}`);
        setIsLoading(false);
      });
  }, [username, day, part, fetchSourceCode]);

  return (
    <div className="border border-border h-full flex flex-col">
      <div className="bg-bg px-4 py-2 border-b border-border">
        <div className="text-sm font-medium">
          {username} / Day {day} / Part {part}
          {isLoading && (
            <span className="ml-2 text-xs text-muted animate-pulse">
              Loading...
            </span>
          )}
        </div>
        <div className="text-xs text-muted">{language}</div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-auto">
        {isLoading ? (
          <div className="p-4 text-muted animate-pulse">Loading code...</div>
        ) : (
          <SyntaxHighlighter
            language={language.toLowerCase()}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
            }}
            codeTagProps={{
              style: {
                background: "transparent",
              },
            }}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
