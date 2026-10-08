import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HistoryTable from "../components/HistoryTable";
import Loader from "../components/Loader";
import { getHistory, deleteHistoryItem } from "../services/api";
import "./History.css";

function History() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Page khulte hi history lao (sirf ek baar)
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setItems(Array.isArray(data) ? data : data.history || []);
      } catch (err) {
        setError("Could not load history. Make sure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Delete: pehle confirm, phir server se hatao, phir screen se
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this prediction?")) return;

    try {
      await deleteHistoryItem(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError("Could not delete the item. Please try again.");
    }
  };

  return (
    <div className="history-page">
      <h1 className="page-title">Prediction History</h1>
      <p className="page-subtitle">All your previous leaf scans in one place.</p>

      <div className="card">
        {loading && <Loader message="Loading history..." />}

        {error && <p className="error-text">{error}</p>}

        {!loading && !error && items.length === 0 && (
          <div className="history-empty">
            <p>No predictions yet.</p>
            <Link to="/upload" className="btn btn-primary">
              Upload Your First Leaf
            </Link>
          </div>
        )}

        {!loading && items.length > 0 && (
          <HistoryTable items={items} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default History;