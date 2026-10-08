import { useRef, useState } from "react";
import "./ImageUploader.css";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 5;

function ImageUploader({ onFileSelect }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  // File check karke parent ko bhejna
  const validateAndSelect = (file) => {
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG, PNG or WEBP images are allowed.");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_SIZE_MB} MB.`);
      return;
    }

    setError("");
    onFileSelect(file);
  };

  // Click karke file chunne par
  const handleChange = (e) => {
    validateAndSelect(e.target.files[0]);
    e.target.value = ""; // taaki same file dobara chun sako
  };

  // Drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSelect(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // iske bina drop kaam nahi karta
    setIsDragging(true);
  };

  return (
    <div>
      <div
        className={`uploader ${isDragging ? "dragging" : ""}`}
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current.click()}
      >
        <div className="uploader-icon">🍃</div>
        <p className="uploader-text">
          Click to select a leaf image or drag and drop it here
        </p>
        <small className="uploader-hint">JPG, PNG, WEBP (max {MAX_SIZE_MB} MB)</small>

        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleChange}
          hidden
        />
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default ImageUploader;