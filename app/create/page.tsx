"use client";

import { saveSurvey } from "@/lib/survey";
import { Survey } from "@/types/survey";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { NavBar } from "@/components/views/navbar";
import { CreateForm } from "@/components/views/create-form";
import { WithPreview } from "@/components/views/with-preview";

export default function CreateSurvey() {
  const router = useRouter();
  const [valid, setValid] = useState(false)
  const [survey, setSurvey] = useState<Survey>({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    questions: [],
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (survey.title.trim().length > 0) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [survey.title])

  const handleSave = () => {
    saveSurvey(survey);
    router.push(`/edit/${survey.id}`)
  }

  return (
    <div className="container mx-auto py-8">
      <NavBar responses share />
      <h1 className="text-3xl font-bold mb-2">Create new survey</h1>
      <WithPreview survey={survey}>
        <CreateForm
          survey={survey}
          setSurvey={setSurvey}
          validToSave={valid}
          saveSurvey={handleSave}
        />
      </WithPreview>
    </div>
  );
}
