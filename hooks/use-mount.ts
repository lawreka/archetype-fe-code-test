"use client"

import { useEffect, useState } from "react"

export function useMount(fn: () => any) {
    const [mount, setMount] = useState<boolean>(true);
    const [effect, setEffect] = useState<boolean>(true);

    useEffect(() => {
        if (mount) {
            setMount(false)
        } else {
            if (effect) {
                fn()
                setEffect(false)
            }
        }
    })
}
