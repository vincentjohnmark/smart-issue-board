import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export default function CreateIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [assignedTo, setAssignedTo] = useState("");
  const [existingIssues, setExistingIssues] = useState([]);

  // Fetch recent issues for similarity check
  useEffect(() => {
    const fetchIssues = async () => {
      const q = query(
        collection(db, "issues"),
        orderBy("createdAt", "desc"),
        limit(20)
      );
      const snapshot = await getDocs(q);
      setExistingIssues(snapshot.docs.map(doc => doc.data()));
    };

    fetchIssues();
  }, []);

  const isSimilar = (newTitle, oldTitle) => {
    const a = newTitle.toLowerCase().split(" ");
    const b = oldTitle.toLowerCase().split(" ");
    const common = a.filter(word => b.includes(word));
    return common.length >= 2;
  };

  const checkSimilarity = () => {
    return existingIssues.filter(issue =>
      isSimilar(title, issue.title)
    );
  };

  const createIssue = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const similar = checkSimilarity();
    if (similar.length > 0) {
      const confirmCreate = window.confirm(
        "Similar issues already exist. Do you want to create this issue anyway?"
      );
      if (!confirmCreate) return;
    }

    await addDoc(collection(db, "issues"), {
      title,
      description,
      priority,
      status: "Open",
      assignedTo,
      createdBy: auth.currentUser.email,
      createdAt: serverTimestamp(),
    });

    setTitle("");
    setDescription("");
    setPriority("Low");
    setAssignedTo("");
  };

  return (
    <div className="create-issue">
      <div className="form-row">
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          placeholder="Assigned to (email)"
          value={assignedTo}
          onChange={e => setAssignedTo(e.target.value)}
        />
      </div>

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button onClick={createIssue}>Create Issue</button>
    </div>
  );
}
