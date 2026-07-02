import { apiClient } from "./api";

export const askQuestion = async (
  analysisId: string,
  question: string
) => {
  const response = await apiClient.post("/chat", {
    analysis_id: analysisId,
    question,
  });

  return response.data.response;
};