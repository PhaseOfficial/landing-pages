import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Adjust path to your supabase config

const GameThumbnails = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .order("title", { ascending: true });

      if (error) {
        console.error("Error fetching games:", error);
      } else {
        setGames(data);
      }
      setLoading(false);
    };

    fetchGames();
  }, []);

  if (loading) return <p className="text-center">Loading g@mes...</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {games.map((game) => (
        <a
          key={game.id}
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 border rounded-lg hover:shadow-lg transition-shadow bg-white"
        >
          <h3 className="font-bold text-lg text-gray-800">{game.title}</h3>
          <span className="text-xs uppercase tracking-widest text-blue-500 font-semibold">
            {game.category}
          </span>
        </a>
      ))}
    </div>
  );
};

export default GameThumbnails;