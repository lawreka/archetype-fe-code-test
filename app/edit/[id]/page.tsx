"use client";

export const dynamic = 'force-dynamic';

import { Button } from "@/components/ui/button";
import { getSurveyById, saveSurvey } from "@/lib/survey";
import { Survey } from "@/types/survey";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NavBar } from "@/components/views/navbar";
import { EditForm } from "@/components/views/edit-form";
import { WithPreview } from "@/components/views/with-preview";
import { toast } from "sonner";

export default function EditSurvey() {
  const router = useRouter();
  const params = useParams();
  const [survey, setSurvey] = useState<Survey | undefined>();

  useEffect(() => {
    if (params.id) {
      const loadedSurvey = getSurveyById(params.id as string);
      if (loadedSurvey) {
        setSurvey(loadedSurvey);
      } else {
        router.push("/");
      }
    }
  }, [params.id, router]);

  const handleSave = () => {
    if (survey) {
      saveSurvey(survey);
      toast.success("Saved!")
    }
  }

  const handleSaveAndRedirect = () => {
    if (survey) {
      saveSurvey(survey);
      router.push(`/survey/${survey.id}`)
    }
  }

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <NavBar responses share />
      <h1 className="text-3xl font-bold mb-2 p-4">{`Edit "${survey.title}"`}</h1>
      <WithPreview survey={survey}>
        <EditForm
          survey={survey}
          setSurvey={setSurvey}
          saveSurvey={handleSave}
        />
      </WithPreview>
      <div className="flex justify-end mt-8">
        <Button onClick={handleSaveAndRedirect}>Save and View Survey</Button>
      </div>
    </div>
  );
}
