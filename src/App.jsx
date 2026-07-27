import { useEffect, useState } from "react";
import supabase from "./services/supabase";
import NameForm from "./components/NameForm";
import NameList from "./components/NameList";
import "./App.css";

function App() {
  const [names, setNames] = useState([]);

  const fetchNames = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setNames(data);
    }
  };

  useEffect(() => {
    fetchNames();
  }, []);

  return (
    <div className="container">
      <NameForm fetchNames={fetchNames} />

      <NameList names={names} />
    </div>
  );
}

export default App;
