import { useRef, useState } from "react"
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable'
import { ImperativePanelHandle } from 'react-resizable-panels';
import { Eye } from "lucide-react";
import { SurveyPage } from "./survey-page";
import { cn } from '@/lib/utils';

interface WithPreviewProps {
    survey: any;
    children: React.ReactNode;
}

const EyeClosed = ({ className }: any) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={cn('lucide lucide-eye-closed', className)}>
            <path d="m15 18-.722-3.25" />
            <path d="M2 8a10.645 10.645 0 0 0 20 0" />
            <path d="m20 15-1.726-2.05" />
            <path d="m4 15 1.726-2.05" />
            <path d="m9 18 .722-3.25" />
        </svg>
    )
}
export const WithPreview = ({ survey, children }: WithPreviewProps) => {
    const [open, setOpen] = useState(false);
    const previewPaneRef = useRef<ImperativePanelHandle>(null)
    const togglePreviewPane = () => {
        const panel = previewPaneRef.current
        const open = panel?.isExpanded()
        if (open) {
            panel?.collapse()
            setOpen(false)
        } else {
            panel?.expand(50)
            setOpen(true)
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-end mb-2">
                <div
                    className="text-gray-400 flex gap-2"
                    onClick={togglePreviewPane}
                >
                    Preview
                    {open ?
                        <Eye className="stroke-gray-400" />
                        : <EyeClosed className="stroke-gray-400" />}

                </div>
            </div>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                    {children}
                </ResizablePanel>
                <ResizablePanel
                    defaultSize={0}
                    collapsible={true}
                    collapsedSize={0}
                    maxSize={50}
                    ref={previewPaneRef}
                >
                    <div className="h-full bg-slate-200 p-4">
                        <SurveyPage survey={survey} preview />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
