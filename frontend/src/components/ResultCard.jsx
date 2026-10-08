import {
  formatDiseaseName,
  formatDate,
  isHealthy,
  getConfidenceLevel,
} from "../utils/formatters";
import "./ResultCard.css";

function ResultCard({ imageUrl, disease, confidence, createdAt }) {
  const healthy = isHealthy(disease);
  const level = getConfidenceLevel(confidence);

  return (
    <div className="card result-card">
      <img src={imageUrl} alt="Uploaded leaf" className="result-img" />

      <div className="result-info">
        <span className={`status-badge ${healthy ? "healthy" : "diseased"}`}>
          {healthy ? "✅ Healthy Leaf" : "⚠️ Disease Detected"}
        </span>

        <h2 className="result-disease">{formatDiseaseName(disease)}</h2>

        <div className="result-row">
          <span>Confidence</span>
          <strong>{Number(confidence).toFixed(2)}%</strong>
        </div>

        <div className="confidence-bar">
          <div
            className={`confidence-fill ${level.className}`}
            style={{ width: `${Math.min(confidence, 100)}%` }}
          ></div>
        </div>
        <p className={`confidence-label ${level.className}`}>{level.label}</p>

        {createdAt && (
          <p className="result-date">Predicted on {formatDate(createdAt)}</p>
        )}
      </div>
    </div>
  );
}

export default ResultCard;