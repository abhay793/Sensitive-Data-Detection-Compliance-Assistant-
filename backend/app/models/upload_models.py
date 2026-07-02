from pydantic import BaseModel
from typing import List, Dict


class DocumentInfo(BaseModel):
    filename: str
    pages: int
    size: int
    preview: str


class RiskAssessment(BaseModel):
    level: str
    score: int


class Summary(BaseModel):
    executive_summary: str
    compliance_observations: List[str]
    security_risks: List[str]
    recommendations: List[str]
    overall_assessment: str


class UploadResponse(BaseModel):
    analysis_id: str
    document: DocumentInfo
    risk: RiskAssessment
    detections: Dict
    summary: Summary