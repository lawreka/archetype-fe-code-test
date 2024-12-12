"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSurveyById, getSurveyResponses } from "@/lib/survey";
import { Survey, SurveyResponse } from "@/types/survey";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SurveyResponses() {
  const params = useParams();
  const router = useRouter();
  const [survey, setSurvey] = useState<Survey>();
  const [responses, setResponses] = useState<SurveyResponse[]>([]);

  useEffect(() => {
    if (params.id) {
      const loadedSurvey = getSurveyById(params.id as string);
      setSurvey(loadedSurvey);
      if (loadedSurvey) {
        const surveyResponses = getSurveyResponses(loadedSurvey.id);
        setResponses(surveyResponses);
      }
    }
  }, [params.id]);

  if (!survey) {
    return <div>Survey not found</div>;
  }

  const formatAnswer = (questionId: string, value: string | string[]) => {
    const question = survey.questions.find((q) => q.id === questionId);
    if (!question) return String(value);

    if (Array.isArray(value)) {
      return question.options
        ?.filter((opt) => value.includes(opt.id))
        .map((opt) => opt.text)
        .join(", ");
    } else if (question.options) {
      return question.options.find((opt) => opt.id === value)?.text || value;
    }
    return value;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{survey.title} - Responses</h1>
            <p className="text-muted-foreground">
              {responses.length} total {responses.length === 1 ? "response" : "responses"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {responses.length === 0 ? (
            <Card className="p-6">
              <p className="text-muted-foreground text-center">
                No responses yet
              </p>
            </Card>
          ) : (
            responses.map((response) => (
              <Card key={response.id} className="p-6">
                <div className="text-sm text-muted-foreground mb-4">
                  Submitted on{" "}
                  {new Date(response.submittedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="space-y-4">
                  {survey.questions.map((question) => {
                    const answer = response.answers.find(
                      (a) => a.questionId === question.id
                    );
                    return (
                      <div key={question.id}>
                        <div className="font-medium">{question.text}</div>
                        <div className="text-muted-foreground">
                          {answer
                            ? formatAnswer(question.id, answer.value)
                            : "Not answered"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 