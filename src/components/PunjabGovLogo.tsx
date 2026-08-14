import React from 'react';

interface PunjabGovLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTooltip?: boolean;
}

export const PunjabGovLogo: React.FC<PunjabGovLogoProps> = ({
  className = '',
  size = 'sm',
  showTooltip = false,
}) => {
  const sizeMap = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  const currentSize = sizeMap[size] || sizeMap.sm;

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 rounded-full bg-emerald-900/90 border border-amber-400/60 p-0.5 shadow-xs select-none ${currentSize} ${className}`}
      title={showTooltip ? 'Government of Punjab - Official Honorary Position' : undefined}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
        aria-label="Government of Punjab Official Emblem"
      >
        {/* Outer Circular Ring */}
        <circle cx="50" cy="50" r="47" fill="#064e3b" stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="43" fill="#043a2c" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />

        {/* Top Crescent and Star (Pakistan & Punjab emblem) */}
        <g fill="#fef08a" stroke="#d97706" strokeWidth="0.5">
          <path d="M 50 14 C 44 14 39 19 39 25 C 39 31 44 36 50 36 C 46 34 43 30 43 25 C 43 20 46 16 50 14 Z" />
          <polygon points="53,21 54.5,23.8 57.5,24 55.2,26 56,29 53.5,27.5 51,29 51.8,26 49.5,24 52.5,23.8" fill="#fbbf24" />
        </g>

        {/* Central Shield with 5 Rivers of Punjab */}
        <path
          d="M 32 37 L 68 37 C 68 53 60 67 50 72 C 40 67 32 53 32 37 Z"
          fill="#065f46"
          stroke="#fbbf24"
          strokeWidth="2"
        />

        {/* 5 Flowing Water Streams (Panj-Aab / 5 Rivers) */}
        <g stroke="#6ee7b7" strokeWidth="1.6" strokeLinecap="round">
          <path d="M 38 43 Q 50 40 62 43" />
          <path d="M 36 49 Q 50 46 64 49" />
          <path d="M 38 55 Q 50 52 62 55" />
          <path d="M 40 60 Q 50 58 60 60" />
          <path d="M 43 65 Q 50 63 57 65" />
        </g>

        {/* Flanking Wheat Stalks (Agricultural Wealth of Punjab) */}
        <g fill="#fbbf24" opacity="0.95">
          {/* Left Wheat Ears */}
          <ellipse cx="23" cy="40" rx="3" ry="5" transform="rotate(-30 23 40)" />
          <ellipse cx="21" cy="49" rx="3" ry="5" transform="rotate(-15 21 49)" />
          <ellipse cx="22" cy="58" rx="3" ry="5" transform="rotate(10 22 58)" />
          <ellipse cx="26" cy="67" rx="3" ry="5" transform="rotate(30 26 67)" />

          {/* Right Wheat Ears */}
          <ellipse cx="77" cy="40" rx="3" ry="5" transform="rotate(30 77 40)" />
          <ellipse cx="79" cy="49" rx="3" ry="5" transform="rotate(15 79 49)" />
          <ellipse cx="78" cy="58" rx="3" ry="5" transform="rotate(-10 78 58)" />
          <ellipse cx="74" cy="67" rx="3" ry="5" transform="rotate(-30 74 67)" />
        </g>

        {/* Base Banner / Pedestal */}
        <path
          d="M 28 78 Q 50 73 72 78 L 68 84 Q 50 80 32 84 Z"
          fill="#1e293b"
          stroke="#f59e0b"
          strokeWidth="1.2"
        />

        {/* Text 'PUNJAB' / 'GOVT' on banner */}
        <text
          x="50"
          y="82.5"
          textAnchor="middle"
          fill="#fef08a"
          fontSize="4.8"
          fontWeight="bold"
          fontFamily="sans-serif"
          letterSpacing="0.6"
        >
          GOVT OF PUNJAB
        </text>
      </svg>
    </div>
  );
};
