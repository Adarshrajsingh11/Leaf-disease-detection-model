import { Link } from "react-router-dom";
import "./Home.css";

const steps = [
  { icon: "📤", title: "Upload", text: "Select a clear photo of a leaf from your computer." },
  { icon: "🧠", title: "Analyze", text: "A deep learning model analyzes the leaf image." },
  { icon: "✅", title: "Get Result", text: "See the predicted disease and the confidence score." },
];

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">Detect Leaf Diseases in Seconds 🌿</h1>
        <p className="hero-text">
          Upload a photo of a plant leaf and our AI model will identify the
          disease, so you can take action before it spreads.
        </p>
        <div className="hero-buttons">
          <Link to="/upload" className="btn btn-primary">
            Upload Leaf Image
          </Link>
          <Link to="/history" className="btn btn-outline">
            View History
          </Link>
        </div>
      </section>

      <section className="steps">
        <h2 className="steps-title">How it works</h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div className="card step-card" key={step.title}>
              <div className="step-icon">{step.icon}</div>
              <h3>
                {index + 1}. {step.title}
              </h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;