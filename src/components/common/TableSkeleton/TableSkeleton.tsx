'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"

export const TableSkeleton = () => {
    return (
        <TableBody>
            {Array.from({ length: 4 })
                .map((item, i) => {
                    return <TableRow key={i}>
                        <TableCell colSpan={4}><Skeleton className="h-[20px]" /></TableCell>
                    </TableRow>
                })}
        </TableBody>
    )
}