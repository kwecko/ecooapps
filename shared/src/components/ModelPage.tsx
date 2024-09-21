"use client";

import React from "react";

interface ConfirmationPageProps {
    title?: string;
    subtitle?: string;
    buttonArea?: React.ReactNode;
    children?: React.ReactNode;
}

export function ModelPage({ title, subtitle, buttonArea, children }: ConfirmationPageProps): React.JSX.Element {

    return (
        <div className="w-full h-full p-4 pt-5 flex flex-col justify-between items-center gap-4 text-theme-default">

            {title && (
                <div className="flex flex-col items-center w-full justify-between gap-5">
                    <h1 className="pt-12 px-12 text-3xl leading-8.5 text-center font-medium">{title}</h1>
                    {subtitle && (
                        <h2 className="pb-0 px-8 text-sm font-medium text-center">{subtitle}</h2>
                    )}
                </div>
            )}

            {children && (
                <div className="w-full h-full flex justify-start items-start">
                    {children}
                </div>
            )}

            {buttonArea && (
                <div className="w-full pb-4.5">
                    {buttonArea}
                </div>
            )}
        </div>
    );
}
