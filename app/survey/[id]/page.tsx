"use client";

export const dynamic = 'force-dynamic';

import { getSurveyById, saveSurveyResponse } from "@/lib/survey";
import { Survey } from "@/types/survey";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SurveyPage } from "@/components/views/survey-page";
import { NavBar } from "@/components/views/navbar";

export default function SurveyPreview() {
  const params = useParams();
  const [survey, setSurvey] = useState<Survey | undefined>();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      const loadedSurvey = getSurveyById(params.id as string);
      setSurvey(loadedSurvey);
    }
  }, [params.id]);

  if (!survey) {
    return <div>Survey not found</div>;
  }

  const handleChange = (value: any, question: any) => {
    setAnswers({ ...answers, [question.id]: value })
  }

  const handleSubmit = () => {
    // Validate required questions
    const unansweredRequired = survey.questions
      .filter(q => q.required)
      .filter(q => !answers[q.id]);

    if (unansweredRequired.length > 0) {
      toast.error("Please answer all required questions");
      return;
    }

    // Format answers for submission
    const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value,
    }));

    // Create and save response
    const response = {
      id: crypto.randomUUID(),
      surveyId: survey.id,
      answers: formattedAnswers,
      submittedAt: new Date().toISOString(),
    };

    saveSurveyResponse(response);
    toast.success("Survey submitted successfully!");
    router.push("/");
  };

  return (
    <div className="container mx-auto py-8">
      <NavBar edit responses share />
      <SurveyPage
        survey={survey}
        answers={answers}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>

  );
}
