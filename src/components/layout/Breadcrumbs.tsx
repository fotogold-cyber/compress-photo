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
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs font-mono text-slate-500 flex-wrap">
        {items.map((crumb, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <React.Fragment key={crumb.url}>
              {idx > 0 && <span className="text-slate-600">/</span>}
              {isLast ? (
                <span className="font-bold text-slate-300 truncate max-w-xs uppercase">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.url}
                  className="hover:text-[#ff5500] text-slate-500 transition-colors uppercase flex items-center gap-1"
                >
                  {idx === 0 && <span className="text-[#ff5500]">~</span>}
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
