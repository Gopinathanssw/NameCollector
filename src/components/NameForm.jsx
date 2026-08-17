import { useState } from "react";
import supabase from "../services/supabase";

const CLUBS = [
  { value: "millinieal", label: "MILLINIEAL" },
  { value: "genx", label: "GENX" },
  { value: "lambo", label: "LAMBO" },
  { value: "mooning", label: "MOONING" },
];

function NameForm({ fetchNames }) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [clubName, setClubName] = useState("");
  const [willing, setWilling] = useState("yes");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("error");

  const showToast = (message, type = "error") => {
    setToast(message);
    setToastType(type);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !userName.trim() || !clubName) {
      showToast("Please complete all required fields.");
      return;
    }

    setLoading(true);

    // Check if username already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("user_name", userName.trim())
      .maybeSingle();

    if (checkError) {
      setLoading(false);
      showToast("Unable to verify username. Please try again.");
      return;
    }

    if (existingUser) {
      setLoading(false);
      showToast("This username is already registered.");
      return;
    }

    // Insert new participant
    const { error } = await supabase.from("users").insert([
      {
        name: name.trim(),
        user_name: userName.trim(),
        club_name: clubName,
        willing_to_come: willing,
      },
    ]);

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        showToast("This username is already registered.");
      } else {
        showToast("Unable to submit your registration.");
      }

      return;
    }

    showToast("Registration completed successfully!", "success");

    // Reset form
    setName("");
    setUserName("");
    setClubName("");
    setWilling("yes");

    fetchNames();
  };

  return (
    <div className="form-card">
      {/* Toast */}
      {toast && (
        <div
          className={`toast-message ${
            toastType === "success" ? "toast-success" : "toast-error"
          }`}
          role="alert"
        >
          <span className="toast-icon">
            {toastType === "success" ? "✓" : "!"}
          </span>

          <span>{toast}</span>
        </div>
      )}

      <h1 className="form-title">MILLINIEAL's RELATIONSHIP PROGRAM</h1>

      <p className="form-date">2nd AUG 2026</p>

      <form onSubmit={handleSubmit} className="name-form">
        {/* Name */}
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

        {/* Username */}
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

        {/* Club */}
        <div className="field-group">
          <label htmlFor="clubName">Club</label>

          <select
            id="clubName"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
          >
            <option value="">Select club</option>

            {CLUBS.map((club) => (
              <option key={club.value} value={club.value}>
                {club.label}
              </option>
            ))}
          </select>
        </div>

        {/* Willing */}
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

        {/* Submit */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default NameForm;
