export const host =
  process.env.NODE_ENV === "production"
    ? "https://api.0228.kr"
    : "http://localhost:3060";
