// Configuration for API URLs
const config = {
  API_BASE_URL:
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "https://sosign-backend.onrender.com", // Production backend URL as fallback
};

export default config;
