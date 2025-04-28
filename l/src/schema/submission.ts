export interface SubmitCodeSolutionSchema {
  solution: string;
  problemIndex: string;
  problemId: string;
  interviewId: string;
}

export interface SubmitInterviewResultSchema {
  timeScore: string;
  problemsSolvedScore: string;
  jobPostId: string;
}

interface InterviewFeedback {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  strengths: string;
  weaknesses: string;
}

interface InterviewReport {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  problems_solved_score: number;
  time_score: number;
  validation_score: number;
  quality_score: number;
  job_post_id: string;
  created_by: string;
  feedback: string;
}

export interface InterviewData {
  interview_submission_report: InterviewReport;
  interview_submission_feedback: InterviewFeedback;
}
