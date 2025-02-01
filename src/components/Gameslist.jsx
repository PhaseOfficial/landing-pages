import { useEffect, useState } from "react";
import { supabase } from '../lib/supabaseClient';

const GameThumbnails = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const { data, error } = await supabase.from("gamelinks").select("*");
            if (error) {
                console.error("Error fetching games:", error);
            } else {
                setGames(data);
            }
        };
        fetchGames();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {games.map((game) => (
                <a key={game.id} href={game.url} target="_blank" rel="noopener noreferrer">
                    <CanvasThumbnail gameName={game.name} />
                </a>
            ))}
        </div>
    );
};

const CanvasThumbnail = ({ gameName }) => {
    const canvasRef = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        // Set canvas size
        canvas.width = 200;
        canvas.height = 100;

        // Background color
        ctx.fillStyle = "#222";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Text settings
        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(gameName, canvas.width / 2, canvas.height / 2);
    }, [gameName]);

    return <canvas ref={canvasRef} />;
};

export default GameThumbnails;
