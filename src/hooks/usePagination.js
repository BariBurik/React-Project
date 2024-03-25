import {useMemo} from "react";

export const usePagesPagination = (totalPages) => {
    return useMemo(() => {
        let itemsArr = []
        for (let i = 0; i < totalPages; i++) {
            itemsArr.push(i + 1)
        }
        return itemsArr
    }, [totalPages])
}