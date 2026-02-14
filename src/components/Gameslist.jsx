import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const GameIcon = ({ category, title }) => {
  const gameTitle = title ? title.toLowerCase() : "";

  const getIconContent = () => {
    // Specialized Title-Based Animations
    if (gameTitle.includes("doom")) return <g><rect x="0" y="0" width="100" height="100" fill="#400" className="animate-pulse" /><text x="50" y="65" textAnchor="middle" fontSize="50" fill="#f00" fontWeight="900">☠</text></g>;
    
    if (gameTitle.includes("mario")) return <g className="animate-bounce"><rect x="30" y="30" width="40" height="40" fill="#e87a1e" stroke="#fff" rx="4" /><text x="50" y="62" textAnchor="middle" fontSize="30" fill="white" fontWeight="bold">?</text></g>;
    
    if (gameTitle.includes("duck")) return <g className="animate-bounce"><circle cx="50" cy="55" r="20" fill="#FFD700" /><circle cx="65" cy="40" r="12" fill="#FFD700" /><path d="M75 40 L85 45 L75 50 Z" fill="#FF8C00" /><circle cx="70" cy="35" r="2" fill="black" /></g>;
    
    if (gameTitle.includes("hobo") || gameTitle.includes("riddle") || gameTitle.includes("stick")) return <g className="animate-pulse"><circle cx="50" cy="30" r="10" stroke="white" strokeWidth="3" fill="none" /><path d="M50 40 L50 70 M50 50 L30 60 M50 50 L70 60" stroke="white" strokeWidth="3" /></g>;
    
    if (gameTitle.includes("fnaf") || gameTitle.includes("friday")) return <g><circle cx="50" cy="50" r="5" fill="#fff" className="animate-ping" /><path d="M20 50 Q50 20 80 50 Q50 80 20 50" stroke="#300" strokeWidth="2" fill="none" /><rect x="0" y="0" width="100" height="100" fill="red" opacity="0.05" className="animate-pulse" /></g>;
    
    if (gameTitle.includes("mine")) return <g className="animate-pulse"><rect x="25" y="25" width="50" height="50" fill="#5d4037" stroke="#8bc34a" strokeWidth="6" /></g>;
    
    if (gameTitle.includes("geometry")) return <g><rect x="35" y="40" width="30" height="30" fill="#0ff" stroke="#000" className="animate-bounce" /><rect x="10" y="75" width="80" height="2" fill="#fff" /></g>;

    if (gameTitle.includes("papa")) return <g className="animate-pulse"><path d="M30 50 Q30 20 50 20 Q70 20 70 50 L70 60 L30 60 Z" fill="white" /><rect x="30" y="55" width="40" height="10" fill="#f00" rx="2" /></g>;

    // 1. CONTRA (Scrolling 'Stage' with gunfire)
    if (gameTitle.includes("contra")) {
      return (
        <g>
          <rect x="0" y="70" width="100" height="30" fill="#225522" /> {/* Jungle ground */}
          <rect x="30" y="45" width="10" height="25" fill="#555" className="animate-bounce" /> {/* Soldier */}
          <circle cx="50" cy="50" r="2" fill="red" className="animate-ping" /> {/* Bullet */}
          <path d="M0 80 L100 80" stroke="#fff" strokeWidth="1" strokeDasharray="5 15" className="animate-[spin_2s_linear_infinite]" />
        </g>
      );
    }

    // 1. RUN / SLOPE (Tunnel Perspective)
    if (gameTitle.includes("run") || gameTitle.includes("slope")) {
      return (
        <g>
          {/* Perspective lines moving toward viewer */}
          <path d="M50 50 L0 100 M50 50 L100 100 M50 50 L50 100" stroke="#0ff" strokeWidth="1" opacity="0.5" />
          <rect x="40" y="60" width="20" height="20" fill="#0ff" className="animate-bounce">
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
          </rect>
          <path d="M0 50 L100 50" stroke="#0ff" strokeWidth="0.5" strokeDasharray="5 10" className="animate-[pulse_1s_infinite]" />
        </g>
      );
    }

    // 2. STREET FIGHTER / MORTAL KOMBAT (Health Bars & KO)
    if (gameTitle.includes("fighter") || gameTitle.includes("combat") || gameTitle.includes("street")) {
      return (
        <g>
          {/* Health Bars */}
          <rect x="10" y="15" width="35" height="5" fill="#ff0" stroke="#000" />
          <rect x="55" y="15" width="35" height="5" fill="#ff0" stroke="#000" />
          <text x="50" y="20" textAnchor="middle" fontSize="8" fill="#f00" fontWeight="bold">99</text>
          {/* KO Text flickering */}
          <text x="50" y="60" textAnchor="middle" fontSize="24" fill="#fff" fontWeight="900" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 3px #f00)' }}>K.O.</text>
          <path d="M30 80 L40 70 L20 70 Z" fill="#0af" className="animate-bounce" /> {/* Fighter 1 */}
          <path d="M70 80 L60 70 L80 70 Z" fill="#f0a" /> {/* Fighter 2 */}
        </g>
      );
    }

    // 3. SONIC (Spinning Blue Circle)
    if (gameTitle.includes("sonic")) {
      return (
        <g>
          <circle cx="50" cy="50" r="25" fill="none" stroke="#04f" strokeWidth="6" strokeDasharray="40 10" className="animate-spin" style={{ animationDuration: '0.5s' }} />
          <path d="M40 40 L60 40 L50 60 Z" fill="#fff" className="animate-ping" />
        </g>
      );
    }

    // 1. GOOGLE GAMES (Snake / Dinosaur)
    if (gameTitle.includes("google") || gameTitle.includes("snake") || gameTitle.includes("dino")) {
      return (
        <g>
          {/* Snake / Dino Green path */}
          <path 
            d="M20 50 H40 V30 H60 V70 H80" 
            fill="none" 
            stroke="#4caf50" 
            strokeWidth="6" 
            strokeLinecap="round" 
            className="animate-[pulse_1.5s_infinite]" 
          />
          <circle cx="80" cy="70" r="4" fill="#f44336" className="animate-ping" /> {/* The Apple */}
        </g>
      );
    }

    // 2. MOTO X3M / RACING (Spinning Wheels)
    if (gameTitle.includes("moto") || gameTitle.includes("bike")) {
      return (
        <g>
          {/* Bike Frame */}
          <path d="M30 70 L50 50 L70 70" fill="none" stroke="#fff" strokeWidth="3" />
          {/* Animated Wheels */}
          <circle cx="30" cy="70" r="10" fill="none" stroke="#f00" strokeWidth="3" strokeDasharray="5 3" className="animate-spin" />
          <circle cx="70" cy="70" r="10" fill="none" stroke="#f00" strokeWidth="3" strokeDasharray="5 3" className="animate-spin" />
          <path d="M10 85 L90 85" stroke="#444" strokeWidth="2" /> {/* Road */}
        </g>
      );
    }

    // 3. RIDDLE SCHOOL (The Protagonist / Stick Figure)
    if (gameTitle.includes("riddle")) {
      return (
        <g>
          {/* Stick figure with a "thinking" pulse */}
          <circle cx="50" cy="35" r="12" stroke="#fff" strokeWidth="2" fill="none" />
          <path d="M50 47 L50 75 M50 55 L35 65 M50 55 L65 65 M50 75 L40 90 M50 75 L60 90" stroke="#fff" strokeWidth="2" />
          <circle cx="70" cy="25" r="3" fill="#0ff" className="animate-bounce" /> {/* "Idea" lightbulb effect */}
        </g>
      );
    }

    // 4. THE IMPOSSIBLE QUIZ (The "Failure" Bomb)
    if (gameTitle.includes("quiz")) {
      return (
        <g>
          <circle cx="50" cy="55" r="25" fill="#333" stroke="#000" strokeWidth="2" />
          {/* Fuse flickering */}
          <path d="M50 30 L55 15" stroke="#8b4513" strokeWidth="3" />
          <circle cx="55" cy="15" r="5" fill="#ff0" className="animate-ping" />
          <text x="50" y="65" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="bold">!?</text>
        </g>
      );
    }

    // 4. TETRIS (Falling Blocks)
    if (gameTitle.includes("tetris")) {
      return (
        <g>
          <rect x="40" y="10" width="20" height="20" fill="#0af" stroke="#000" className="animate-[bounce_3s_infinite]" />
          <rect x="20" y="70" width="20" height="20" fill="#f0a" stroke="#000" />
          <rect x="40" y="70" width="20" height="20" fill="#f0a" stroke="#000" />
          <rect x="60" y="70" width="20" height="20" fill="#f0a" stroke="#000" />
        </g>
      );
    }

    // 2. CHESS (Alternating board pattern)
    if (gameTitle.includes("chess")) {
      return (
        <g>
          <rect x="20" y="20" width="30" height="30" fill="#eee" />
          <rect x="50" y="20" width="30" height="30" fill="#333" />
          <rect x="20" y="50" width="30" height="30" fill="#333" />
          <rect x="50" y="50" width="30" height="30" fill="#eee" />
          <path d="M50 30 L45 70 L55 70 Z" fill="gold" className="animate-pulse" /> {/* Pawn/King silhouette */}
        </g>
      );
    }

    // 3. ANGRY BIRDS / BAD PIGGIES (Slingshot / Green Pig)
    if (gameTitle.includes("bird") || gameTitle.includes("pig")) {
      return (
        <g className="animate-bounce">
          <circle cx="50" cy="50" r="25" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2" /> {/* Piggy */}
          <circle cx="40" cy="45" r="4" fill="white" /><circle cx="60" cy="45" r="4" fill="white" />
          <ellipse cx="50" cy="55" r="8" fill="#81C784" />
        </g>
      );
    }

    // 4. TOMB OF THE MASK / SUBWAY (Fast movement)
    if (gameTitle.includes("tomb") || gameTitle.includes("mask")) {
      return (
        <g>
          <rect x="35" y="35" width="30" height="30" fill="#FFD700" className="animate-bounce" />
          <path d="M10 10 L30 30 M70 70 L90 90 M10 90 L30 70 M70 30 L90 10" stroke="yellow" strokeWidth="2" className="animate-ping" />
        </g>
      );
    }

    // 5. COOKING / PAPA'S ALTERNATIVE (Sizzling Pan)
    if (gameTitle.includes("cook") || gameTitle.includes("pizza") || gameTitle.includes("burger")) {
      return (
        <g>
          <rect x="20" y="60" width="60" height="5" rx="2" fill="#333" />
          <circle cx="40" cy="45" r="8" fill="#f44" className="animate-bounce" />
          <path d="M40 30 Q45 20 40 10 M50 30 Q55 20 50 10" stroke="#fff" opacity="0.4" className="animate-pulse" /> {/* Steam */}
        </g>
      );
    }

    if (gameTitle.includes("pac-man")) return <g className="animate-pulse"><path d="M50 50 L80 35 A25 25 0 1 0 80 65 Z" fill="#ff0" /><circle cx="55" cy="40" r="3" fill="black" /></g>;

    // Category Fallbacks
    if (category === "Flash") return <path d="M55 10 L35 50 L50 50 L45 90 L65 50 L50 50 Z" fill="#F7AD19" className="animate-pulse" />;
    if (category === "Emulated") return <g><rect x="20" y="35" width="60" height="30" rx="5" fill="#9933FF" /><circle cx="35" cy="50" r="5" fill="white" className="animate-ping" /><rect x="60" y="45" width="10" height="10" fill="white" /></g>;
    
    return <circle cx="50" cy="50" r="30" fill="none" stroke="#33CC33" strokeWidth="2" strokeDasharray="4 8" className="animate-spin" />;
  };

  return (
    <div className="game-screen relative flex items-center justify-center rounded-xl w-full aspect-video mb-4 overflow-hidden shadow-inner border border-slate-800 group-hover:border-blue-500 transition-colors">
      <svg viewBox="0 0 100 100" className="w-16 h-16 z-10">
        {getIconContent()}
      </svg>
    </div>
  );
};

const GameThumbnails = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data, error } = await supabase
          .from("games")
          .select("*")
          .order("title", { ascending: true });
        if (error) throw error;
        setGames(data || []);
      } catch (e) {
        console.error("Fetch Error:", e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const filteredGames = games.filter(g => 
    g.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center p-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Search Section */}
      <div className="max-w-md mx-auto px-4">
        <input
          type="text"
          placeholder="Search for a game..."
          className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 pb-20">
        {filteredGames.map((game) => (
          <a
            key={game.id}
            href={game.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 bg-white border border-slate-100 rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            <GameIcon category={game.category} title={game.title} />
            
            <div className="flex justify-between items-center mb-2">
              <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
                game.category === 'Flash' ? 'bg-orange-100 text-orange-600' : 
                game.category === 'Emulated' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'
              }`}>
                {game.category}
              </span>
            </div>
            
            <h3 className="font-bold text-slate-800 text-lg leading-tight truncate">
              {game.title}
            </h3>
            
            <div className="mt-4 flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform uppercase tracking-widest">
              Play Now →
            </div>
          </a>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-10 text-slate-400">
          No games found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default GameThumbnails;