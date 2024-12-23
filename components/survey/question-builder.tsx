"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Question } from "@/types/survey";
import { Trash2, EllipsisVertical, Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { cn } from '@/lib/utils';

interface QuestionBuilderProps {
  question: Question;
  editing: boolean;
  setEditing: any;
  onUpdate: (question: Question) => void;
  onDelete: (id: string) => void;
  saveQuestion: any;
}

export function QuestionBuilder({ question, editing, setEditing, onUpdate, onDelete, saveQuestion }: QuestionBuilderProps) {
  const handleOptionAdd = () => {
    const newOption = { id: crypto.randomUUID(), text: "" };
    onUpdate({
      ...question,
      options: [...(question.options || []), newOption],
    });
  };

  const handleOptionUpdate = (optionId: string, text: string) => {
    onUpdate({
      ...question,
      options: question.options?.map((opt) =>
        opt.id === optionId ? { ...opt, text } : opt
      ),
    });
  };

  const handleOptionDelete = (optionId: string) => {
    onUpdate({
      ...question,
      options: question.options?.filter((opt) => opt.id !== optionId),
    });
  };

  return (
    <Card className={cn("p-4 mb-4", { "outline": editing })}>
      <div className="flex-col space-y-2 gap-4 mb-2">
        <div className="flex justify-between items-center">
          <Label text-sm>{question.typeLabel}</Label>
          <div className="flex items-center gap-2">
            <Switch
              id={`required-${question.id}`}
              checked={question.required}
              onCheckedChange={(checked) =>
                onUpdate({ ...question, required: checked })
              }
            />
            <Label className="text-xs font-normal" htmlFor={`required-${question.id}`}>Required</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <EllipsisVertical className="stroke-slate-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {!editing &&
                  <DropdownMenuItem className="gap-2" onSelect={() => setEditing(question.index)}>
                    <Pencil /> Edit
                  </DropdownMenuItem>}
                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive" onSelect={() => onDelete(question.id)}>
                  <Trash2 /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent >
            </DropdownMenu>
          </div>
        </div>

        <div className="flex-1">
          {editing ?
            <Textarea
              placeholder="Question text"
              value={question.text}
              onChange={(e) => onUpdate({ ...question, text: e.target.value })}
            />
            :
            <Label className="text-lg block">
              {question.text}
            </Label>
          }

        </div>

        {editing &&
          <Button disabled={question.text == ""} onClick={saveQuestion}>
            Save Question
          </Button>
        }
      </div>
      {/* {showOptions && (
        <div className="space-y-2">
          {question.options?.map((option) => (
            <div key={option.id} className="flex gap-2">
              <Input
                placeholder="Option text"
                value={option.text}
                onChange={(e) => handleOptionUpdate(option.id, e.target.value)}
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleOptionDelete(option.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={handleOptionAdd} variant="outline">
            Add Option
          </Button>
        </div>
      )} */}
    </Card>
  );
}
