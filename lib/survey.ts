import { Survey, SurveyResponse } from '@/types/survey';
import { delay, error1in5 } from './utils'

const STORAGE_KEY = 'surveys';
const RESPONSES_STORAGE_KEY = 'survey_responses';

export function getSurveys(): Survey[] {
  if (typeof window === 'undefined') return [];
  const surveys = localStorage.getItem(STORAGE_KEY);
  return surveys ? JSON.parse(surveys) : [];
}

export async function getSurveysAsync(): Promise<Survey[] | Error> {
  if (typeof window === 'undefined') return new Promise(() => []);
  const surveys = getSurveys();
  const success = error1in5();
  if (success) {
    return delay(2000).then(() => surveys)
  } else {
    return delay(2000).then(() => new Error('Failed to fetch surveys'))
  }
}

export function saveSurvey(survey: Survey): void {
  if (typeof window === 'undefined') return;
  const surveys = getSurveys();
  const existingIndex = surveys.findIndex((s) => s.id === survey.id);

  if (existingIndex >= 0) {
    surveys[existingIndex] = survey;
  } else {
    surveys.push(survey);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(surveys));
}

export function deleteSurvey(id: string): void {
  if (typeof window === 'undefined') return;
  const surveys = getSurveys();
  const filteredSurveys = surveys.filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSurveys));
}

export function getSurveyById(id: string): Survey | undefined {
  if (typeof window === 'undefined') return undefined;
  const surveys = getSurveys();
  return surveys.find((s) => s.id === id);
}

export function generateShareableLink(id: string): string {
  return `${window.location.origin}/survey/${id}`;
}

export function getSurveyResponses(surveyId: string): SurveyResponse[] {
  if (typeof window === 'undefined') return [];
  const responses = localStorage.getItem(RESPONSES_STORAGE_KEY);
  const allResponses = responses ? JSON.parse(responses) : [];
  return allResponses.filter((r: SurveyResponse) => r.surveyId === surveyId);
}

export function saveSurveyResponse(response: SurveyResponse): void {
  if (typeof window === 'undefined') return;
  const responses = localStorage.getItem(RESPONSES_STORAGE_KEY);
  const allResponses = responses ? JSON.parse(responses) : [];
  allResponses.push(response);
  localStorage.setItem(RESPONSES_STORAGE_KEY, JSON.stringify(allResponses));
}
