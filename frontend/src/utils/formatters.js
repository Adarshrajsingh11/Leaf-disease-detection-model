// "Tomato___Late_blight" -> "Tomato Late blight"
export const formatDiseaseName = (name = "") =>
  name.replace(/_+/g, " ").replace(/\s+/g, " ").trim();

// Class ke naam me "healthy" hai ya nahi
export const isHealthy = (name = "") => name.toLowerCase().includes("healthy");

// Date ko readable banana
export const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

// Confidence (0-100) ke hisaab se label aur CSS class
export const getConfidenceLevel = (confidence) => {
  if (confidence >= 80) return { label: "High confidence", className: "high" };
  if (confidence >= 50) return { label: "Medium confidence", className: "medium" };
  return { label: "Low confidence", className: "low" };
};