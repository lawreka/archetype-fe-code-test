"use client"

import { toast } from "sonner";

import { SurveyCard } from "@/components/survey/survey-card";
import { deleteSurvey, getSurveys } from "@/lib/survey";
import { Survey } from "@/types/survey";

interface DashboardProps {
    error: boolean;
    loading: boolean;
    surveys: Survey[]
    setSurveys: any
}

export const Dashboard = ({ error, loading, surveys, setSurveys }: DashboardProps) => {

    const handleDelete = (id: string) => {
        deleteSurvey(id);
        setSurveys(getSurveys());
        toast.success("Survey deleted successfully");
    };

    if (error) {
        return (
            <div className="flex flex-col flex-1 grow justify-center items-center text-center" >
                Oh no! Your surveys failed to load.<br />
                Don't worry though, they're safe in local storage. Please simply reload the page to try again.
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex flex-col flex-1 grow justify-center items-center" >
                Loading...
            </div>
        );
    }
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" >
                {surveys.map((survey) => (
                    <SurveyCard
                        key={survey.id}
                        survey={survey}
                        onDelete={handleDelete}
                    />
                ))
                }
            </div>
        </>
    );
}
