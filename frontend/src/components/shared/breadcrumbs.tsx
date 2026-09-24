import React from "react";
import Link from "next/link";

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbProps = {
    items: BreadcrumbItem[];
    className?: string;
};

export default function Breadcrumbs({ items, className }: BreadcrumbProps) {
    return (
        <p className={className}>
            {items.map((item, index) => (
                <span key={`${item.label}-${index}`}>
                    {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
                    {index < items.length - 1 ? " / " : null}
                </span>
            ))}
        </p>
    );
}