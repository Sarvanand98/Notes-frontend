import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { API_BASE } from "../constant/api"

function maskEmail(email) {
  if (!email) return "";
  const [user, domain] = email.split("@");
  const maskedUser = user.replace(/./g, "x");
  const domainParts = domain.split(".");
  const maskedDomain = domainParts[0].replace(/./g, "x") + "." + domainParts.slice(1).join(".");
  return `${maskedUser}@${maskedDomain}`;
}

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      setError("");
      try {
        
        const userRes = await fetch(`${API_BASE}/notes/getUserInfo`, {
          credentials: "include"
        });
        const userData = await userRes.json();
        if (!userRes.ok) throw new Error(userData.message || "User fetch failed");
        setUser(userData);

        
        const notesRes = await fetch(`${API_BASE}/notes`, {
          credentials: "include"
        });
        const notesData = await notesRes.json();
        if (!notesRes.ok) throw new Error(notesData.message || "Notes fetch failed");
        setNotes(notesData);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  
  const handleSignOut = () => {
    navigate("/logout");
  };

  
  const handleCreateNote = async () => {
    if (!noteText.trim()) return;
    setError("");
    try {
      const res = await fetch(`${API_BASE}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: noteText })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Create note failed");
      setNotes([...notes, data]);
      setNoteText("");
    } catch (err) {
      setError(err.message);
    }
  };

  
  const handleDeleteNote = async (id) => {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/notes/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete note failed");
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 px-2 bg-gradient-to-br from-blue-100 via-white to-teal-100">
      
      <div className="w-full max-w-md flex justify-between items-center mb-12">
        <div className="flex items-center gap-2 ">
          <img src="/icon.png" alt="Logo" className="w-7 h-7" />
          <span className="font-bold text-xl mx-5">Dashboard</span>
        </div>
        <button
          className="text-blue-600 underline text-base hover:text-blue-800 mr-2"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      
      <div className=" w-full max-w-md rounded-lg p-5 mb-6 bg-white shadow-lg border border-gray-200" >
        <div className="font-bold text-2xl mb-2">
          Welcome, {user?.name} !
        </div>
        <div className="text-gray-700 text-base">
          Email: {maskEmail(user?.email)}
        </div>
      </div>
      
      <input
        type="text"
        className="w-full max-w-md px-4 py-3 border rounded-lg mb-6 focus:ring-2 focus:ring-blue-400 text-lg"
        placeholder="Enter note..."
        value={noteText}
        onChange={e => setNoteText(e.target.value)}
      />
      <button
        className="w-full max-w-md bg-blue-600 text-white py-3 rounded-lg font-semibold mb-4 hover:bg-blue-700 transition"
        onClick={handleCreateNote}
        disabled={!noteText.trim()}
      >
        Create Note
      </button>

      
      <div className="w-full max-w-md">
        <div className="font-semibold text-xl mb-3">Notes</div>
        <div
          className="flex flex-col gap-4 overflow-y-auto"
          style={{ maxHeight: "300px" }} 
        >
          {notes.map(note => (
            <div
              key={note._id}
              className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-lg px-5 py-4"
            >
              <span className="text-lg">{note.content}</span>
              <button
                className="text-gray-500 hover:text-red-600 transition"
                onClick={() => handleDeleteNote(note._id)}
                title="Delete"
              >
                <RiDeleteBin6Line />

              </button>
            </div>
          ))}
        </div>
      </div>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
};

export default Dashboard;