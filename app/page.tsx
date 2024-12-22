"use client";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dashboard } from "@/components/views/dashboard";
import { useMount } from '@/hooks/use-mount'
import { getSurveysAsync } from "@/lib/survey";
import { retry } from "@/lib/utils";
import { Survey } from "@/types/survey";

export default function Home() {
  const router = useRouter();
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Frontend Engineer Test Builder</h1>
        <Button onClick={() => router.push("/create")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Test
        </Button>
      </div>
      <Dashboard error={error} loading={loading} surveys={surveys} setSurveys={setSurveys} />
    </div>
  );
}
