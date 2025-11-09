import React from 'react';

export const NavDot = React.memo(() => (
  <div className="absolute h-[12px] left-0 w-[15px] transition-all duration-300 group-hover:opacity-100 opacity-40 group-hover:scale-110" style={{ top: '50%', transform: 'translateY(-50%)' }}>
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 15 12"
    >
      <ellipse
        cx="7.5"
        cy="6"
        fill="white"
        id="Ellipse"
        rx="7.5"
        ry="6"
      />
    </svg>
  </div>
));

NavDot.displayName = 'NavDot';
