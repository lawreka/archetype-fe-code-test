
import { Survey } from "@/types/survey";
import { QuestionDisplay } from "@/components/survey/question-display";
import { Button } from "@/components/ui/button";

interface SurveyPageProps {
    survey: Survey;
    answers?: Record<string, any>;
    preview?: boolean;
    onChange?: any;
    onSubmit?: any;
}

export const SurveyPage = ({ survey, answers = {}, preview, onChange, onSubmit }: SurveyPageProps) => {
    return (
        <div className="container mx-auto p-2 bg-white h-full">
            <div className="max-w-3xl mx-auto flex flex-col h-full">
                <div className="h-full mb-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            {preview && survey.title == "" ?
                                (<h1 className="text-3xl font-bold text-slate-300 mb-2">Untitled</h1>)
                                :
                                (<h1 className="text-3xl font-bold mb-2">{survey.title}</h1>)
                            }
                            <p className="text-muted-foreground">{survey.description}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {survey.questions.map((question) => (
                            <QuestionDisplay
                                key={question.id}
                                preview={preview}
                                question={question}
                                value={answers[question.id]}
                                onChange={(value) => onChange(value, question)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button disabled={preview} onClick={onSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    )
}
