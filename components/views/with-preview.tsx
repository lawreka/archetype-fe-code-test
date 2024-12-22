import { useRef } from "react"
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable'
import { ImperativePanelHandle } from 'react-resizable-panels';
import { SurveyPage } from "./survey-page";

interface WithPreviewProps {
    survey: any;
    children: React.ReactNode;
}

export const WithPreview = ({ survey, children }: WithPreviewProps) => {
    const previewPaneRef = useRef<ImperativePanelHandle>(null)
    const togglePreviewPane = () => {
        const panel = previewPaneRef.current
        const open = panel?.isExpanded()
        if (open) {
            panel?.collapse()
        } else {
            panel?.expand(50)
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-end mb-2">
                <div onClick={togglePreviewPane}>Toggle Preview</div>
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
