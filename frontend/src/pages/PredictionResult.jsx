import { Link, useLocation } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import { SERVER_URL } from "../services/api";
import "./PredictionResult.css";

function PredictionResult() {
  const location = useLocation();
  const state = location.state; // UploadLeaf page ne yahan data bheja tha

  // Agar koi seedha /result kholde ya page refresh kare, to state nahi hoti
  if (!state || !state.prediction) {
    return (
      <div className="card no-result">
        <h2>No prediction to show</h2>
        <p>Please upload a leaf image first.</p>
        <Link to="/upload" className="btn btn-primary">
          Go to Upload
        </Link>
      </div>
    );
  }

  const { prediction, previewUrl } = state;

  // Preview wala link na ho to server wali saved image dikhao
  const imageUrl = previewUrl || `${SERVER_URL}${prediction.imageUrl}`;

  return (
    <div className="result-page">
      <h1 className="page-title">Prediction Result</h1>
      <p className="page-subtitle">Here is what our model found.</p>

      <ResultCard
        imageUrl={imageUrl}
        disease={prediction.predictedDisease}
        confidence={prediction.confidence}
        createdAt={prediction.createdAt}
      />

      <div className="result-actions">
        <Link to="/upload" className="btn btn-primary">
          Check Another Leaf
        </Link>
        <Link to="/history" className="btn btn-outline">
          View History
        </Link>
      </div>
    </div>
  );
}

export default PredictionResult;