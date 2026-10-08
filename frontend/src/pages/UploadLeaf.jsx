import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import ImagePreview from "../components/ImagePreview";
import Loader from "../components/Loader";
import { predictImage } from "../services/api";
import "./UploadLeaf.css";

function UploadLeaf() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Jab user nayi image chune
  const handleFileSelect = (selectedFile) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl); // purani preview memory se hatao
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setError("");
  };

  // Image hata kar dobara chunne ke liye
  const handleRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl("");
    setError("");
  };

  // Predict button
  const handlePredict = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError("");

      const data = await predictImage(file);

      // Result page par bhejo, data "state" me jayega
      navigate("/result", {
        state: { prediction: data.prediction, previewUrl },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not get prediction. Make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <h1 className="page-title">Upload Leaf Image</h1>
      <p className="page-subtitle">
        Choose a clear, well-lit photo of a single leaf for the best result.
      </p>

      <div className="card">
        {!file ? (
          <ImageUploader onFileSelect={handleFileSelect} />
        ) : (
          <ImagePreview
            imageUrl={previewUrl}
            fileName={file.name}
            onRemove={handleRemove}
          />
        )}

        {file && (
          <div className="upload-actions">
            <button
              className="btn btn-primary"
              onClick={handlePredict}
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict Disease"}
            </button>
          </div>
        )}

        {loading && <Loader message="Analyzing your leaf image..." />}
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}

export default UploadLeaf;