import React from 'react';

interface TechTagProps {
  children: React.ReactNode;
}

export const TechTag = React.memo<TechTagProps>(({ children }) => (
  <span className="px-3 md:px-4 py-1.5 bg-gray-100/70 text-gray-800 rounded-lg text-xs md:text-sm font-medium">
    {children}
  </span>
));

TechTag.displayName = 'TechTag';
