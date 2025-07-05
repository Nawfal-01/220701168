import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { logEvent } from "../middleware/logger";

const RedirectPage = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const allUrls = JSON.parse(localStorage.getItem("shortUrls") || "[]");
    const urlData = allUrls.find(item => item.shortcode === shortcode);

    if (!urlData) {
      alert("Invalid or expired link.");
      return;
    }

    const now = new Date();
    const expiry = new Date(urlData.expiresAt);

    if (now > expiry) {
      alert("This link has expired.");
      return;
    }

    // Log click
    urlData.clicks.push({
      time: now.toISOString(),
      source: document.referrer || "direct",
      location: "Unknown", // You can enhance this later
    });

    localStorage.setItem("shortUrls", JSON.stringify(allUrls));

    logEvent("URL_CLICKED", "Redirected to original URL", { shortcode });

    window.location.href = urlData.original;
  }, [shortcode]);

  return null;
};

export default RedirectPage;
