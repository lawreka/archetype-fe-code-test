"use client";

import { useState } from "react";
import { Survey } from "@/types/survey";
import { getSurveysAsync } from "@/lib/survey";
import { Dashboard } from "@/components/views/dashboard";
import { NavBar } from "@/components/views/navbar";
import { useMount } from '@/hooks/use-mount'
import { retry } from "@/lib/utils";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useMount(() => {
    retry(getSurveysAsync, 3).then((res) => {
      if (res instanceof Error) {
        setError(true)
      } else {
        setSurveys(res)
        setLoading(false)
      }
    })
  })

  return (
    <div className="container mx-auto py-8">
      <NavBar create />
      <Dashboard error={error} loading={loading} surveys={surveys} setSurveys={setSurveys} />
    </div>
  );
}
