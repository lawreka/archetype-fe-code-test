"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Survey } from "@/types/survey";
import { Label } from '@/components/ui/label'

interface CreateFormProps {
    survey: Survey;
    setSurvey: any;
    validToSave: boolean;
    saveSurvey: any;
}

export const CreateForm = ({ survey, setSurvey, validToSave, saveSurvey }: CreateFormProps) => {
    return (
        <div className="max-w-3xl mx-auto mr-8">
            <div className="space-y-4 mb-4 p-1">
                <Label text-sm>Title</Label>
                <Input
                    placeholder="My Survey"
                    value={survey.title}
                    onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
                />
            </div>
            <div className="space-y-4 mb-4 p-1">
                <Label text-sm>Description</Label>
                <Textarea
                    placeholder="Test Description"
                    value={survey.description}
                    onChange={(e) =>
                        setSurvey({ ...survey, description: e.target.value })
                    }
                />
            </div>
            <div className="flex justify-end">
                <Button disabled={!validToSave} onClick={saveSurvey}>Let's go!</Button>
            </div>
        </div>
    )
}
