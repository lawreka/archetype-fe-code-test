import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface NavBarProps {
    logo?: boolean;
    dashboard?: boolean;
    create?: boolean;
    responses?: boolean;
    share?: boolean;
}

export const NavBar = ({
    logo = true,
    dashboard,
    create,
    responses,
    share
}: NavBarProps) => {
    const router = useRouter();
    return (
        <div className="flex justify-between items-center mb-8">
            {logo &&
                <div>logo</div>
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
                {responses &&
                    <Button variant="outline" onClick={() => router.push("/responses")}>
                        View responses
                    </Button>
                }
                {share &&
                    <Button onClick={() => console.log("open share modal")}>
                        Share
                    </Button>
                }
            </div>
        </div>
    )
}
