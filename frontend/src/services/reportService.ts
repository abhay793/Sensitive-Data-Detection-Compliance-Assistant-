import { apiClient } from "./api";

export const downloadReport = async (analysisId: string) => {
  const response = await apiClient.get(
    `/report/${analysisId}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};