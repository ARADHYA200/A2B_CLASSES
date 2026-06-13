function StudentCard({ s }) {
  return (
    <div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-xl"
    >
      <h3 className="text-xl font-bold text-blue-300">
        {s.FIRST_NAME} {s.LAST_NAME}
      </h3>

      <p className="text-gray-300 mt-2">📍 {s.CITY}</p>
    </div>
  );
}

export default StudentCard;