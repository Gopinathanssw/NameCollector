import { useState } from "react";
import supabase from "../services/supabase";

function NameForm({ fetchNames }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("users").insert([
      {
        name: name.trim(),
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    fetchNames();
  };

  return (
    <div>
      <h2>Submit Your Name Here</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">{loading ? "Submitting..." : "Submit"}</button>
      </form>
    </div>
  );
}

export default NameForm;
