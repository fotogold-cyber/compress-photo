import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbJsonLd } from '../seo/JsonLd';

export interface BreadcrumbCrumb {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbCrumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
        {items.map((crumb, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <React.Fragment key={crumb.url}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
              {isLast ? (
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.url}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  {idx === 0 && <Home className="w-3 h-3" />}
                  <span>{crumb.name}</span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
