import { useState } from "react";
import supabase from "../services/supabase";

function NameForm({ fetchNames }) {
  const [name, setName] = useState("");
  const [clubName, setClubName] = useState("");
  const [willing, setWilling] = useState("yes");
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
        willing_to_come: willing,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setClubName("");
    setWilling("yes");
    fetchNames();
  };

  return (
    <div className="form-card">
      <h1 className="form-title">35th GENX REVIEW MEET</h1>
      <p className="form-date">2nd AUG 2026</p>
      <p className="form-subtitle">Enter your name and club to join the list</p>

      <form onSubmit={handleSubmit} className="name-form">
        <div className="field-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="clubName">Club name</label>
          <input
            id="clubName"
            type="text"
            placeholder="Enter club name"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
          />
        </div>

        <div className="field-group">
          <label>Willing to come</label>
          <div className="radio-group">
            <label
              className={`radio-option ${willing === "yes" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="willing"
                value="yes"
                checked={willing === "yes"}
                onChange={(e) => setWilling(e.target.value)}
              />
              Yes
            </label>
            <label
              className={`radio-option ${willing === "no" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="willing"
                value="no"
                checked={willing === "no"}
                onChange={(e) => setWilling(e.target.value)}
              />
              No
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default NameForm;
