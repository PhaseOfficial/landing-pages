const GameIcon = ({ category, title }) => {
  const gameTitle = title ? title.toLowerCase() : "";

  const getIconContent = () => {
    // 1. DOOM (Hellish flickering)
    if (gameTitle.includes("doom")) {
      return (
        <g>
          <rect x="0" y="0" width="100" height="100" fill="#400" className="animate-pulse" />
          <text x="50" y="65" textAnchor="middle" fontSize="50" fill="#f00" fontWeight="900" style={{ filter: 'drop-shadow(0 0 5px #f00)' }}>☠</text>
        </g>
      );
    }

    // 2. MARIO (Jumping Question Block)
    if (gameTitle.includes("mario")) {
      return (
        <g className="animate-bounce">
          <rect x="30" y="30" width="40" height="40" fill="#e87a1e" stroke="#fff" strokeWidth="2" rx="4" />
          <text x="50" y="62" textAnchor="middle" fontSize="30" fill="white" fontWeight="bold">?</text>
          <circle cx="35" cy="35" r="2" fill="black" /><circle cx="65" cy="35" r="2" fill="black" />
          <circle cx="35" cy="65" r="2" fill="black" /><circle cx="65" cy="65" r="2" fill="black" />
        </g>
      );
    }

    // 3. GEOMETRY DASH (Sliding Square)
    if (gameTitle.includes("geometry")) {
      return (
        <g>
          <rect x="35" y="40" width="30" height="30" fill="#0ff" stroke="#000" strokeWidth="2" className="animate-bounce" />
          <rect x="10" y="70" width="80" height="4" fill="#fff" opacity="0.5" />
          <path d="M70 70 L80 60 L90 70" fill="#f00" className="animate-ping" />
        </g>
      );
    }

    // 4. PAPA'S SERIES (Chef Hat)
    if (gameTitle.includes("papa")) {
      return (
        <g className="animate-pulse">
          <path d="M30 50 Q30 20 50 20 Q70 20 70 50 L70 60 L30 60 Z" fill="white" stroke="#ccc" />
          <rect x="30" y="55" width="40" height="10" fill="#f00" rx="2" />
        </g>
      );
    }

    // 5. POKEMON (Pokeball spin)
    if (gameTitle.includes("pokemon")) {
      return (
        <g className="animate-spin" style={{ animationDuration: '3s' }}>
          <circle cx="50" cy="50" r="35" fill="white" stroke="#000" strokeWidth="3" />
          <path d="M15 50 A35 35 0 0 1 85 50 Z" fill="#f00" stroke="#000" strokeWidth="3" />
          <circle cx="50" cy="50" r="10" fill="white" stroke="#000" strokeWidth="3" />
        </g>
      );
    }

    // 6. SPORTS / MOTO / BASKETBALL
    if (gameTitle.includes("moto") || gameTitle.includes("star") || gameTitle.includes("ball")) {
      return (
        <circle cx="50" cy="50" r="30" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="10 5" className="animate-spin" />
      );
    }

    // CATEGORY FALLBACKS
    if (category === "Flash") {
      return <path d="M55 10 L35 50 L50 50 L45 90 L65 50 L50 50 Z" fill="#F7AD19" className="animate-pulse" />;
    }
    if (category === "Emulated") {
      return (
        <g>
          <rect x="20" y="35" width="60" height="30" rx="5" fill="#9933FF" />
          <circle cx="35" cy="50" r="5" fill="white" className="animate-ping" />
          <rect x="60" y="45" width="10" height="10" fill="white" />
        </g>
      );
    }

    // DEFAULT (Dynamic tech circle)
    return (
      <g className="animate-spin" style={{ animationDuration: '10s' }}>
        <circle cx="50" cy="50" r="30" fill="none" stroke="#33CC33" strokeWidth="2" strokeDasharray="4 8" />
        <circle cx="50" cy="50" r="15" fill="#33CC33" opacity="0.3" />
      </g>
    );
  };

  return (
    <div className="relative flex items-center justify-center bg-black rounded-xl w-full aspect-video mb-4 overflow-hidden shadow-inner group-hover:ring-2 ring-blue-500 transition-all">
      <svg viewBox="0 0 100 100" className="w-20 h-20">
        {getIconContent()}
      </svg>
    </div>
  );
};