import RoomCard from "../components/RoomCard";

const rooms = [
  { id: "QUIZ123", name: "Fun Friday Quiz", players: 3, max: 6 },
  { id: "BRNSTM", name: "Brainstorm Battle", players: 5, max: 8 },
  { id: "LOL123", name: "Meme Mayhem", players: 2, max: 4 },
];

const RoomBrowserPage = () => {
  return (
    <div className="min-h-screen bg-[url('/paper-texture.jpg')] bg-cover p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-700 font-['Gloria_Hallelujah'] mb-6 text-center">
          🧩 Join a Room
        </h1>
        <p className="text-lg text-gray-800 font-['Fredoka'] text-center mb-10">
          Pick a room and start the fun!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map(({ id, name, players, max }) => (
            <RoomCard id={id} name={name} players={players} max={max} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default RoomBrowserPage;
