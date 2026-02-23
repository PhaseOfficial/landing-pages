import Navbar from "../components/Navbar";
import GameThumbnails from "../components/Gameslist";
import Footer from "../components/footer";
import SEO from "../components/SEO";

function App() {
  return (
    <div className="min-h-screen flex mt-16 flex-col">
      <SEO 
        title="Games" 
        description="Play classic and modern web games hosted on Red Cup Series. Enjoy a curated library of games for maximum speed and fun."
      />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
            RED CUP SERIES<span className="text-blue-600">GAMES</span>
          </h1>
          <p className="text-gray-600 text-lg">
            A curated library of classic and modern web games. 
            All games are hosted on our dedicated subdomain for maximum speed.
          </p>
        </div>

        <section className="mt-8">
          <GameThumbnails />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;