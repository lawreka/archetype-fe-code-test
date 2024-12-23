import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { QuestionType } from "@/types/survey";
import { Plus } from "lucide-react";

interface AddQuestionMenuProps {
    onSelect: any;
}

export const AddQuestionMenu = ({ onSelect }: AddQuestionMenuProps) => {
    const questionTypes: { value: QuestionType; label: string }[] = [
        { value: "text", label: "Text Input" },
        { value: "checkbox", label: "Checkbox (Multiple Choice)" },
        { value: "radio", label: "Radio (Single Choice)" },
        { value: "multiselect", label: "Multi Select" },
        { value: "singleselect", label: "Single Select" },
        { value: "date", label: "Date Picker" },
        { value: "rating", label: "Rating" },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium gap-1">
                <Plus className="h-4 w-4" /> Add a question
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {questionTypes.map(({ value, label }) =>
                    <DropdownMenuItem key={value} onSelect={() => onSelect(value, label)}>
                        {label}
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent >
        </DropdownMenu >
    )
}
