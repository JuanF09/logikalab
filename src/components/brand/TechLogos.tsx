import React from "react";

interface LogoProps {
  className?: string;
}

// 1. Next.js Official Logo
export const NextjsLogo: React.FC<LogoProps> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Next.js Logo"
  >
    <mask
      id="mask0_nextjs"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="180"
      height="180"
      style={{ maskType: "alpha" }}
    >
      <circle cx="90" cy="90" r="90" fill="black" />
    </mask>
    <g mask="url(#mask0_nextjs)">
      <circle cx="90" cy="90" r="90" fill="#000000" stroke="#1154FF" strokeWidth="6" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#paint0_linear_nextjs)"
      />
      <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_nextjs)" />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_nextjs"
        x1="109"
        y1="116.5"
        x2="144.5"
        y2="160.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_nextjs"
        x1="121"
        y1="54"
        x2="120.799"
        y2="106.875"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. TypeScript Official Logo
export const TypeScriptLogo: React.FC<LogoProps> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="TypeScript Logo"
  >
    <rect width="128" height="128" rx="16" fill="#3178C6" />
    <path d="M70.18 53.64H27.5V64.87H42.71V107H54.97V64.87H70.18V53.64Z" fill="white" />
    <path
      d="M99.58 64.65C97.1 63.3 93.38 62.17 88.63 62.17C79.85 62.17 74.07 66.82 74.07 74.25C74.07 80.86 78.71 84.47 86.87 87.77C93.07 90.35 95.85 92.52 95.85 96.03C95.85 99.85 92.34 102.12 87.08 102.12C81.82 102.12 76.55 99.74 73.56 97.78L69.64 107.59C73.46 110.17 80.57 112 87.08 112C97.1 112 108.04 107.07 108.04 98.09C108.04 91.38 103.6 87.36 95.34 83.95C89.04 81.37 86.15 79.41 86.15 75.9C86.15 72.8 89.04 70.84 93.69 70.84C97.82 70.84 101.53 72.39 103.7 73.63L99.58 64.65Z"
      fill="white"
    />
  </svg>
);

// 3. PostgreSQL Official Logo
export const PostgreSQLLogo: React.FC<LogoProps> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="PostgreSQL Logo"
  >
    <path
      d="M12.02 2C6.49 2 2 6.49 2 12.02c0 2.45.89 4.7 2.37 6.45l-.45 1.54c-.16.55-.07 1.15.25 1.63.32.48.86.76 1.44.76h3.42c.67 0 1.28-.42 1.51-1.05l.55-1.55c-.24.03-.49.05-.74.05-3.87 0-7.02-3.15-7.02-7.02s3.15-7.02 7.02-7.02 7.02 3.15 7.02 7.02c0 1.48-.46 2.86-1.25 4l1.47 1.08c1.14-1.48 1.82-3.32 1.82-5.08 0-5.53-4.49-10.02-10.02-10.02z"
      fill="#336791"
    />
    <path
      d="M19.12 14.88c-.55-.98-1.38-1.78-2.37-2.33s-2.12-.83-3.26-.83-2.27.28-3.26.83-1.82 1.35-2.37 2.33c-.55.98-.83 2.12-.83 3.26s.28 2.27.83 3.26c.55.98 1.38 1.78 2.37 2.33s2.12.83 3.26.83 2.27-.28 3.26-.83 1.82-1.35 2.37-2.33c.55-.98.83-2.12.83-3.26s-.28-2.27-.83-3.26z"
      fill="#4582B8"
    />
    <path
      d="M13.49 14.2c-1.38 0-2.5 1.12-2.5 2.5 0 .38.09.74.24 1.06l-.98.98c-.4-.36-.69-.84-.81-1.39-.33-1.47.47-2.95 1.9-3.46.73-.26 1.52-.22 2.22.11l-.07.2z"
      fill="#FFFFFF"
    />
  </svg>
);

// 4. Supabase Official Logo
export const SupabaseLogo: React.FC<LogoProps> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 109 113"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Supabase Logo"
  >
    <path
      d="M65.4855 112.515C63.2662 114.734 59.5662 113.684 58.7849 110.669L45.4121 59.043H98.7183C104.092 59.043 107.126 64.9962 103.882 69.293L65.4855 112.515Z"
      fill="url(#paint0_linear_supabase)"
    />
    <path
      d="M43.5145 0.485281C45.7338 -1.73403 49.4338 -0.68412 50.2151 2.33091L63.5879 53.957H10.2817C4.90807 53.957 1.87413 48.0038 5.11802 43.707L43.5145 0.485281Z"
      fill="#3ECF8E"
    />
    <defs>
      <linearGradient
        id="paint0_linear_supabase"
        x1="56.7628"
        y1="59.043"
        x2="88.7562"
        y2="101.446"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#249361" />
        <stop offset="1" stopColor="#3ECF8E" />
      </linearGradient>
    </defs>
  </svg>
);

// 5. Vercel Official Logo
export const VercelLogo: React.FC<LogoProps> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 116 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Vercel Logo"
  >
    <path d="M57.5 0L115 100H0L57.5 0Z" fill="#FFFFFF" />
  </svg>
);

// 6. Node.js Official Logo
export const NodejsLogo: React.FC<LogoProps> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Node.js Logo"
  >
    <path d="M64 4L116 34V94L64 124L12 94V34L64 4Z" fill="#215732" />
    <path d="M64 12L108 37.5V87.5L64 113L20 87.5V37.5L64 12Z" fill="#5FA04E" />
    <path
      d="M48 44V76L55 80V52L73 80L80 76V44L73 40V68L55 40L48 44Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 7. Tailwind CSS Official Logo
export const TailwindLogo: React.FC<LogoProps> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Tailwind CSS Logo"
  >
    <path
      d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
      fill="#38BDF8"
    />
  </svg>
);

// 8. Docker Official Logo
export const DockerLogo: React.FC<LogoProps> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Docker Logo"
  >
    <path
      d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.186.186.186m5.893 2.714h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m21.758 1.139a6.626 6.626 0 00-4.048-3.957l-.37-.13-.23.315c-.71.97-1.772 1.57-2.946 1.66-.275.02-.549-.008-.819-.085l-.56-.16-.27.514c-1.12 2.138-3.328 3.513-5.748 3.593H1.365a.558.558 0 00-.555.558 7.37 7.37 0 001.353 4.254c1.942 2.673 4.954 4.148 8.951 4.384 1.137.067 2.308.067 3.479 0 3.73-.213 6.945-1.572 9.053-3.826 2.03-2.17 2.766-4.997 2.072-7.962.06-.051.12-.1.18-.152l.06-.05z"
      fill="#2496ED"
    />
  </svg>
);
