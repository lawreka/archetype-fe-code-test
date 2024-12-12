"use client";

import { QuestionBuilder } from "@/components/survey/question-builder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveSurvey } from "@/lib/survey";
import { Question, Survey } from "@/types/survey";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateSurvey() {
  const router = useRouter();
  const [survey, setSurvey] = useState<Survey>({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    questions: [],
    createdAt: new Date().toISOString(),
  });

  const addQuestion = () => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      type: "text",
      text: "",
      options: [],
      required: false,
    };
    setSurvey({
      ...survey,
      questions: [...survey.questions, newQuestion],
    });
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setSurvey({
      ...survey,
      questions: survey.questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      ),
    });
  };

  const deleteQuestion = (questionId: string) => {
    setSurvey({
      ...survey,
      questions: survey.questions.filter((q) => q.id !== questionId),
    });
  };

  const handleSave = () => {
    saveSurvey(survey);
    router.push("/");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Test</h1>

        <div className="space-y-4 mb-8">
          <Input
            placeholder="Test Title"
            value={survey.title}
            onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
          />
          <Textarea
            placeholder="Test Description"
            value={survey.description}
            onChange={(e) =>
              setSurvey({ ...survey, description: e.target.value })
            }
          />
        </div>

        <div className="space-y-4 mb-8">
          {survey.questions.map((question) => (
            <QuestionBuilder
              key={question.id}
              question={question}
              onUpdate={updateQuestion}
              onDelete={deleteQuestion}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <Button onClick={addQuestion} variant="outline">
            Add Question
          </Button>
          <Button onClick={handleSave}>Save Test</Button>
        </div>
      </div>
    </div>
  );
}