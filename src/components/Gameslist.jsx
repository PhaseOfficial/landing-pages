// filepath: /e:/RCSLandings/landing_pages/src/components/Gameslist.jsx
import { useEffect, useState } from "react";
import { supabase } from '../lib/supabaseClient';
import CanvasThumbnail from './CanvasThumbnail';



const Gameslist = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase.from("gamelinks").select("*");
      if (error) {
        console.error("Error fetching games:", error);
      } else {
        console.log("Fetched games:", data); // Log the fetched data
        setGames(data);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {games.length === 0 ? (
        <p>No games available</p> // Display a message if no games are available
      ) : (
        games.map((game) => (
          <a key={game.id} href={game.url} target="_blank" rel="noopener noreferrer">
            <CanvasThumbnail gameName={game.name} />
          </a>
        ))
      )}
    </div>
  );
};

export default Gameslist;