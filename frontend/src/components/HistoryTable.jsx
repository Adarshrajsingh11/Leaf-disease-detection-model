import { SERVER_URL } from "../services/api";
import { formatDiseaseName, formatDate } from "../utils/formatters";
import "./HistoryTable.css";

function HistoryTable({ items, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="history-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Disease</th>
            <th>Confidence</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  src={`${SERVER_URL}${item.imageUrl}`}
                  alt="Leaf"
                  className="history-thumb"
                />
              </td>
              <td>{formatDiseaseName(item.predictedDisease)}</td>
              <td>{Number(item.confidence).toFixed(2)}%</td>
              <td>{formatDate(item.createdAt)}</td>
              <td>
                <button className="btn btn-danger" onClick={() => onDelete(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;