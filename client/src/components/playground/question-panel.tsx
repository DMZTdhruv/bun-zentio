"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getJobInterview } from "~/actions/interview";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useQueryState } from "nuqs";

const QuestionPanel = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user-job-posts", id],
    queryFn: ({ queryKey }) => getJobInterview({ id: queryKey[1] }),
  });
  const [q] = useQueryState("q", { defaultValue: "0" });
  const currentIndex = parseInt(q || "0");

  useEffect(() => {
    console.log(q);
  }, [q]);

  const [expandedSections, setExpandedSections] = useState({
    examples: true,
    constraints: true,
    additionalInfo: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (isLoading) {
    return (
      <div className="col-span-3 flex h-[calc(100dvh-90px)] w-full animate-pulse items-center justify-center rounded-md bg-neutral-900"></div>
    );
  }

  const problemsData = data.find((data) => data.type === "problems")!;
  if (!problemsData) {
    return (
      <div className="col-span-3 flex h-[calc(100dvh-76px)] w-full items-center justify-center">
        No questions available
      </div>
    );
  }

  const { problemDetails } = problemsData;

  const activeQuestion = problemDetails[currentIndex];

  // Find the specific sections
  const headerSection = activeQuestion.sections["headerSection"];
  const examplesSection = activeQuestion.sections["examplesSection"];
  const constraintsSection = activeQuestion.sections["constraintsSection"];
  const additionalInfoSection =
    activeQuestion.sections["additionalInfoSection"];

  return (
    <div className="col-span-3 h-[calc(100dvh-90px)] w-full overflow-auto rounded-md">
      <div className="p-5 pl-0">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-neutral-100">
            {headerSection?.title}
          </h1>
        </div>

        <div className="mb-6">
          <p className="text-sm leading-relaxed text-neutral-100">
            {headerSection?.description}
          </p>
        </div>

        {examplesSection && (
          <div className="mb-6">
            <div
              className="mb-2 flex cursor-pointer items-center justify-between"
              onClick={() => toggleSection("examples")}
            >
              <h2 className="text-base font-medium text-neutral-100">
                Examples
              </h2>
              {expandedSections.examples ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {expandedSections.examples && (
              <div className="space-y-4 text-white">
                {examplesSection.examples.map((example, index) => (
                  <div key={index} className="mb-4">
                    <p className="mb-2 text-sm font-medium">
                      {example.number.replace(/example/i, "Example ")}:
                    </p>
                    <div className="mb-2 rounded-md bg-neutral-800 p-3">
                      <pre className="font-mono text-sm whitespace-pre-wrap text-white">
                        {example.inputs}
                      </pre>
                    </div>
                    <p className="mb-1 text-sm font-medium text-neutral-100">
                      Output:
                    </p>
                    <div className="rounded-md bg-neutral-800 p-3">
                      <pre className="font-mono text-sm whitespace-pre-wrap text-white">
                        {example.output}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {constraintsSection && (
          <div className="mb-6">
            <div
              className="mb-2 flex cursor-pointer items-center justify-between"
              onClick={() => toggleSection("constraints")}
            >
              <h2 className="text-base font-medium text-white">Constraints</h2>
              {expandedSections.constraints ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {expandedSections.constraints && (
              <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-100">
                {constraintsSection.constraints.map((constraint, index) => (
                  <li key={index}>{constraint.content}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {additionalInfoSection && (
          <div className="mb-6">
            <div
              onClick={() => toggleSection("additionalInfo")}
              className="mb-2 flex cursor-pointer items-center justify-between"
            >
              <h2 className="text-base font-medium text-white">
                Additional Information
              </h2>
              {expandedSections.additionalInfo ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {expandedSections.additionalInfo && (
              <p className="text-sm text-neutral-100">
                {additionalInfoSection.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPanel;
