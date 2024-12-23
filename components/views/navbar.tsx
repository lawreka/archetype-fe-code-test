import { useRouter, useParams } from "next/navigation";

import { generateShareableLink } from "@/lib/survey";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


interface NavBarProps {
    logo?: boolean;
    dashboard?: boolean;
    create?: boolean;
    edit?: boolean;
    responses?: boolean;
    share?: boolean;
}

export const NavBar = ({
    logo = true,
    dashboard,
    create,
    edit,
    responses,
    share
}: NavBarProps) => {
    const router = useRouter();
    const params = useParams();
    const surveyId = params.id as string || null;
    const handleShare = () => {
        if (surveyId) {
            const link = generateShareableLink(surveyId);
            navigator.clipboard.writeText(link);
        }
        toast.success("Link copied to clipboard!");
    };
    return (
        <div className="flex justify-between items-center mb-8">
            {logo &&
                <Button variant="ghost" onClick={() => router.push("/")}>
                    LOGO
                </Button>
            }
            <div className="flex gap-4">
                {dashboard &&
                    <Button onClick={() => router.push("/")}>
                        My surveys
                    </Button>
                }
                {create &&
                    <Button onClick={() => router.push("/create")}>
                        New survey
                    </Button>
                }
                {responses && params.id &&
                    <Button variant="outline" onClick={() => router.push(`/survey/${surveyId}/responses`)}>
                        View responses
                    </Button>

                }
                {edit &&
                    <Button variant="secondary" onClick={() => router.push(`/edit/${surveyId}`)}>
                        Edit
                    </Button>
                }
                {share &&
                    <Button onClick={handleShare}>
                        Share
                    </Button>
                }
            </div>
        </div>
    )
}
