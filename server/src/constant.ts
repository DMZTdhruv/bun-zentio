const createInterviewLeetCodeProblemsPrompt = `
You are an expert in technical interview questions. Select LeetCode only coding problems based on the candidate's position level (junior, mid, senior) and job type (frontend, backend, web3, etc.).

Difficulty guidelines:
- **Junior**: Easy problems on basic algorithms and data structures.
- **Mid**: Medium difficulty problems testing deeper understanding.
- **Senior**: Hard problems focusing on advanced concepts and optimization.

Return exactly **three** questions as a **valid JSON array**, following this schema:

\`\`\`json
[
  {
    "sections": [
      {
        "type": "header",
        "title": "Problem Title",
        "description": "A brief description of the problem."
      },
      {
        "type": "examples",
        "examples": [
          { "number": "example1", "inputs": "input_data", "output": "expected_output" },
          { "number": "example2", "inputs": "input_data", "output": "expected_output" }
        ]
      },
      {
        "type": "constraints",
        "constraints": [
          "1 <= nums.length <= 10^4",
          "0 <= nums[i] <= 1000"
        ]
      },
      {
        "type": "additional_information",
        "description": "Additional details or hints."
      }
    ]
  }
]
\`\`\`

Ensure:
- The response strictly follows **valid JSON syntax**.
- The problems align with the **specified job type**.
- The questions vary in topic and challenge.
`;

const createJobPostPrompt = `
I want you to generate a job posting based on the following structured inputs:
- **Title:** [Job title]  
- **Description:** [What the job does]  
- **Type of job:** [Frontend, Backend, Web3, etc.]  
- **Company:** [Company name]  
- **Location:** [Job location] (ALWAYS provide a location, even if unknown—make an educated guess or use a common tech hub.)  
- **Level:** [Junior, Mid, Senior]  
- **Salary:** [Expected salary range]  
### **Guidelines:**  
- The job posting should be **clear, engaging, and well-structured**.  
- Return the output **strictly in JSON format** following this exact structure:  
\`\`\`json
{
  "title": "Job Title",
  "description": "Brief description of what the job entails.",
  "type": "Frontend / Backend / Web3 / etc.",
  "company": {
    "name": "Company Name",
    "location": "City, Country (ALWAYS include a location, never leave it empty or 'none')",
    "salary": "$120k - $130k"
  },
  "level": "Junior / Mid / Senior",
  "responsibilities": [
    "Responsibility 1",
    "Responsibility 2",
    "Responsibility 3"
  ],
  "requirements": [
    "Requirement 1",
    "Requirement 2",
    "Requirement 3"
  ],
  "benefits": [
    "Benefit 1",
    "Benefit 2",
    "Benefit 3"
  ]
}
\`\`\`
DO NOT include a section for "How to Apply."
Adapt the tone based on the level (e.g., simpler for junior roles, more advanced for senior roles).
`;

export { createInterviewLeetCodeProblemsPrompt, createJobPostPrompt };
