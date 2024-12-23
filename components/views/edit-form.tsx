"use client"

import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Question, QuestionType, QuestionTypeLabel, Survey } from "@/types/survey";
import { Label } from '@/components/ui/label'
import { AddQuestionMenu } from "./add-question-menu";
import { QuestionBuilder } from "@/components/survey/question-builder";

interface EditFormProps {
    survey: Survey;
    setSurvey: any;
    saveSurvey: any;
}

export const EditForm = ({ survey, setSurvey, saveSurvey }: EditFormProps) => {
    const [editingIndex, setEditingIndex] = useState<number>(0);

    useEffect(() => {
        console.log(editingIndex)
    }, [editingIndex])

    const resetEditingIndex = () => setEditingIndex(0);

    const addQuestion = (type: QuestionType, typeLabel: QuestionTypeLabel) => {
        if (!survey) return;
        const nextQuestionIndex = survey.questions.length + 1
        const newQuestion: Question = {
            id: crypto.randomUUID(),
            index: nextQuestionIndex,
            type: type,
            typeLabel: typeLabel,
            text: "",
            options: [],
            required: false,
        };
        setSurvey({
            ...survey,
            questions: [...survey.questions, newQuestion],
        });
        setEditingIndex(nextQuestionIndex);
    };

    const updateQuestion = (updatedQuestion: Question) => {
        if (!survey) return;
        setSurvey({
            ...survey,
            questions: survey.questions.map((q) =>
                q.id === updatedQuestion.id ? updatedQuestion : q
            ),
        });
    };

    const deleteQuestion = (questionId: string) => {
        if (!survey) return;
        setSurvey({
            ...survey,
            questions: survey.questions.filter((q) => q.id !== questionId),
        });
    };

    const saveQuestion = () => {
        saveSurvey();
        setEditingIndex(0);
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="space-y-2 mb-4 p-1" onClick={() => resetEditingIndex()}>
                <Label className="text-sm">Title</Label>
                <Input
                    value={survey.title}
                    onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
                />
            </div>
            <div className="space-y-2 mb-4 p-1" onClick={() => resetEditingIndex()}>
                <Label className="text-sm">Description</Label>
                <Textarea
                    placeholder="Describe or introduce your survey"
                    value={survey.description}
                    onChange={(e) =>
                        setSurvey({ ...survey, description: e.target.value })
                    }
                />
            </div>
            <div className="space-y-4 mb-8 p-1">
                {survey.questions.map((question) => (
                    <QuestionBuilder
                        key={question.id}
                        question={question}
                        editing={question.index == editingIndex}
                        setEditing={setEditingIndex}
                        onUpdate={updateQuestion}
                        onDelete={deleteQuestion}
                        saveQuestion={saveQuestion}
                    />
                ))}
            </div>
            <div className="space-y-2 mb-8 p-1">
                <AddQuestionMenu onSelect={addQuestion} />
            </div>
        </div>
    )
}
