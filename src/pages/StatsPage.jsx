import { useEffect, useState } from "react";
import { Container, Typography, Box, Divider } from "@mui/material";

const StatsPage = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("shortUrls") || "[]");
    setUrls(all);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Shortened URL Statistics</Typography>
      {urls.map((url, i) => (
        <Box key={i} sx={{ mb: 3 }}>
          <Typography><strong>Short URL:</strong> <a href={url.shortUrl}>{url.shortUrl}</a></Typography>
          <Typography><strong>Original:</strong> {url.original}</Typography>
          <Typography><strong>Created:</strong> {new Date(url.createdAt).toLocaleString()}</Typography>
          <Typography><strong>Expires:</strong> {new Date(url.expiresAt).toLocaleString()}</Typography>
          <Typography><strong>Total Clicks:</strong> {url.clicks.length}</Typography>
          {url.clicks.map((click, index) => (
            <Box key={index} sx={{ ml: 2 }}>
              <Typography>• {new Date(click.time).toLocaleString()} | {click.source} | {click.location}</Typography>
            </Box>
          ))}
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Container>
  );
};

export default StatsPage;
