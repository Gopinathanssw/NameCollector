import { useState } from "react";
import supabase from "../services/supabase";

function NameForm({ fetchNames }) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [clubName, setClubName] = useState("");
  const [willing, setWilling] = useState("yes");
  const [staying, setStaying] = useState("yes");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !userName.trim() || !clubName.trim()) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("users").insert([
      {
        name: name.trim(),
        user_name: userName.trim(),
        club_name: clubName.trim(),
        willing_to_come: willing,
        staying: staying,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setUserName("");
    setClubName("");
    setWilling("yes");
    setStaying("yes");
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
          <label htmlFor="userName">Username</label>
          <input
            id="userName"
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
          <label>Are You Willing?</label>
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

        <div className="field-group">
          <label>STAY?</label>
          <div className="radio-group">
            <label
              className={`radio-option ${staying === "yes" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="staying"
                value="yes"
                checked={staying === "yes"}
                onChange={(e) => setStaying(e.target.value)}
              />
              Yes
            </label>
            <label
              className={`radio-option ${staying === "no" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="staying"
                value="no"
                checked={staying === "no"}
                onChange={(e) => setStaying(e.target.value)}
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
