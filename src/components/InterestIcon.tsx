import React from 'react';

interface InterestIconProps {
  type: 'basketball' | 'videogames' | 'music' | 'linkedin';
  size?: number;
}

export const InterestIcon: React.FC<InterestIconProps> = ({ type, size = 40 }) => {
  switch (type) {
    case 'basketball':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Basketball */}
          <circle cx="50" cy="50" r="45" stroke="#FF6B35" strokeWidth="3" fill="none"/>
          {/* Curved lines */}
          <path d="M 50 5 Q 60 50 50 95" stroke="#FF6B35" strokeWidth="2.5" fill="none"/>
          <path d="M 50 5 Q 40 50 50 95" stroke="#FF6B35" strokeWidth="2.5" fill="none"/>
          <path d="M 10 50 Q 50 60 90 50" stroke="#FF6B35" strokeWidth="2.5" fill="none"/>
          <path d="M 10 50 Q 50 40 90 50" stroke="#FF6B35" strokeWidth="2.5" fill="none"/>
        </svg>
      );

    case 'videogames':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Game controller */}
          <rect x="15" y="30" width="70" height="45" rx="8" stroke="#4A90E2" strokeWidth="3" fill="none"/>
          {/* D-pad on left */}
          <circle cx="30" cy="50" r="4" fill="#4A90E2"/>
          <line x1="30" y1="42" x2="30" y2="58" stroke="#4A90E2" strokeWidth="2"/>
          <line x1="22" y1="50" x2="38" y2="50" stroke="#4A90E2" strokeWidth="2"/>
          {/* Buttons on right */}
          <circle cx="70" cy="45" r="3.5" fill="#4A90E2"/>
          <circle cx="70" cy="55" r="3.5" fill="#4A90E2"/>
          <circle cx="64" cy="50" r="3.5" fill="#4A90E2"/>
          <circle cx="76" cy="50" r="3.5" fill="#4A90E2"/>
          {/* Shoulder buttons */}
          <line x1="20" y1="32" x2="35" y2="32" stroke="#4A90E2" strokeWidth="2"/>
          <line x1="65" y1="32" x2="80" y2="32" stroke="#4A90E2" strokeWidth="2"/>
        </svg>
      );

    case 'music':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Musical notes */}
          {/* First note head */}
          <ellipse cx="25" cy="65" rx="6" ry="7" fill="#9B59B6"/>
          {/* First stem */}
          <line x1="31" y1="65" x2="31" y2="25" stroke="#9B59B6" strokeWidth="2.5"/>
          {/* Second note head */}
          <ellipse cx="50" cy="55" rx="6" ry="7" fill="#9B59B6"/>
          {/* Second stem */}
          <line x1="56" y1="55" x2="56" y2="15" stroke="#9B59B6" strokeWidth="2.5"/>
          {/* Connecting beam */}
          <path d="M 31 25 Q 43 22 56 15" stroke="#9B59B6" strokeWidth="3" fill="none"/>
          {/* Third note head */}
          <ellipse cx="70" cy="60" rx="6" ry="7" fill="#9B59B6"/>
          {/* Third stem */}
          <line x1="76" y1="60" x2="76" y2="30" stroke="#9B59B6" strokeWidth="2.5"/>
        </svg>
      );

    case 'linkedin':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* LinkedIn rounded rectangle background - black */}
          <rect x="10" y="10" width="80" height="80" rx="8" fill="#000000"/>
          {/* LinkedIn "in" text in white */}
          <text x="50" y="62" fontSize="40" fontWeight="bold" fill="white" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif">in</text>
        </svg>
      );

    default:
      return null;
  }
};
