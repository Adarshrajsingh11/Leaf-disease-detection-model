import "./ImagePreview.css";

function ImagePreview({ imageUrl, fileName, onRemove }) {
  return (
    <div className="preview">
      <img src={imageUrl} alt="Selected leaf" className="preview-img" />
      <p className="preview-name">{fileName}</p>
      <button className="btn btn-outline" onClick={onRemove}>
        Choose Another Image
      </button>
    </div>
  );
}

export default ImagePreview;