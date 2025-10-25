import React from 'react'
import { Separator } from './separator'

interface TypographyProps {
    children: React.ReactNode
    className?: string
}

export function TypographyH1({ children, className }: TypographyProps) {
    return (
        <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight text-balance ${className || ''}`}>
            {children}
        </h1>
    )
}

export function TypographyH2({ children, className }: TypographyProps) {
    return (
        <>
            <h2 className={` ${className || ''} scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0`}>
                {children}
            </h2>
        </>
    )
}

export function TypographyH3({ children, className }: TypographyProps) {
    return (
        <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className || ''}`}>
            {children}
        </h3>
    )
}

export function TypographyH4({ children, className }: TypographyProps) {
    return (
        <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className || ''}`}>
            {children}
        </h4>
    )
}
