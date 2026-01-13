import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import CreateIssue from "./CreateIssue";
import IssueList from "./IssueList";
import "../App.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Not logged in</p>;
  }

  return (
    <div className="container">
      <h2>Issue Board</h2>
      <p className="subtitle">Logged in as: {user.email}</p>


      <div className="section">
        <h3>CreateIssue</h3>
        <CreateIssue />
      </div>

      <div className="section">
        <IssueList />
      </div>
    </div>
  );
}
