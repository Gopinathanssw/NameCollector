import { useState } from "react";
import supabase from "../services/supabase";

function NameForm({ fetchNames }) {
  const [name, setName] = useState("");
  const [clubName, setClubName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !clubName.trim()) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("users").insert([
      {
        name: name.trim(),
        club_name: clubName.trim(),
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setClubName("");
    fetchNames();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter Club Name"
        value={clubName}
        onChange={(e) => setClubName(e.target.value)}
      />

      <br />
      <br />

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default NameForm;
