import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function IssueList() {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, snapshot => {
      setIssues(
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
    });
    return () => unsub();
  }, []);

  const updateStatus = async (issue, newStatus) => {
    if (issue.status === "Open" && newStatus === "Done") {
      alert("Move issue to In Progress before marking it Done.");
      return;
    }
    await updateDoc(doc(db, "issues", issue.id), { status: newStatus });
  };

  const filteredIssues = issues.filter(issue => {
    return (
      (statusFilter === "All" || issue.status === statusFilter) &&
      (priorityFilter === "All" || issue.priority === priorityFilter)
    );
  });

  const statusBadge = status => {
    if (status === "Open") return "badge badge-open";
    if (status === "In Progress") return "badge badge-progress";
    return "badge badge-done";
  };

  return (
    <div>
      <h3>Issues</h3>

      <div className="filters">
        <select onChange={e => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select onChange={e => setPriorityFilter(e.target.value)}>
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {filteredIssues.length === 0 && (
        <p className="empty">No issues found.</p>
      )}

      {filteredIssues.map(issue => (
        <div className="issue" key={issue.id}>
          <div className="issue-header">
            <span className="issue-title">{issue.title}</span>
            <span className={statusBadge(issue.status)}>
              {issue.status}
            </span>
          </div>

          <div className="issue-meta">
            <span>Priority: {issue.priority}</span><br></br>
            <span>Assigned to: {issue.assignedTo}</span>
          </div>

          <select
            value={issue.status}
            onChange={e => updateStatus(issue, e.target.value)}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
      ))}
    </div>
  );
}
