import "./About.css";

const techStack = [
  { layer: "Frontend", tools: "React.js, React Router, Axios, CSS" },
  { layer: "Backend", tools: "Node.js, Express.js, Multer" },
  { layer: "Database", tools: "MongoDB, Mongoose" },
  { layer: "Deep Learning", tools: "Python, TensorFlow/Keras, NumPy, OpenCV" },
];

function About() {
  return (
    <div className="about">
      <h1 className="page-title">About Project</h1>
      <p className="page-subtitle">
        A web application that detects plant leaf diseases using deep learning.
      </p>

      <div className="card about-card">
        <h2>What does it do?</h2>
        <p>
          The user uploads an image of a leaf. The image is sent to the
          backend, which passes it to a trained deep learning model. The model
          predicts the disease along with a confidence score, and the result
          is saved so it can be viewed later in the History page.
        </p>
      </div>

      <div className="card about-card">
        <h2>Technologies Used</h2>
        <ul className="tech-list">
          {techStack.map((item) => (
            <li key={item.layer}>
              <strong>{item.layer}:</strong> {item.tools}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default About;