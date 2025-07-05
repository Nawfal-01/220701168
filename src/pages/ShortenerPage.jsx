import React, { useState } from "react";
import {
  Box, Button, Grid, TextField, Typography, Container
} from "@mui/material";
import { isValidURL } from "../utils/validators";
import { logEvent } from "../middleware/logger";

const ShortenerPage = () => {
  const [inputs, setInputs] = useState([
    { url: "", validity: "", shortcode: "" }
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const addField = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const generateShortcode = () =>
    Math.random().toString(36).substring(2, 8);

  const handleSubmit = () => {
    const now = new Date();
    let newResults = [];

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];

      if (!isValidURL(input.url)) {
        alert(`Invalid URL at row ${i + 1}`);
        return;
      }

      const validity = parseInt(input.validity) || 30;
      const expiry = new Date(now.getTime() + validity * 60000);
      let shortcode = input.shortcode || generateShortcode();

      const existing = JSON.parse(localStorage.getItem("shortUrls") || "[]");
      if (existing.find(item => item.shortcode === shortcode)) {
        alert(`Shortcode "${shortcode}" already in use!`);
        return;
      }

      const shortUrl = `http://localhost:3000/${shortcode}`;
      const result = {
        original: input.url,
        shortUrl,
        shortcode,
        createdAt: now.toISOString(),
        expiresAt: expiry.toISOString(),
        clicks: [],
      };

      newResults.push(result);
      logEvent("URL_SHORTENED", "Shortened a URL", result);
    }

    const allData = [...(JSON.parse(localStorage.getItem("shortUrls") || "[]")), ...newResults];
    localStorage.setItem("shortUrls", JSON.stringify(allData));
    setResults(newResults);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shorten URLs
      </Typography>

      {inputs.map((input, idx) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Long URL"
              fullWidth
              value={input.url}
              onChange={(e) => handleChange(idx, "url", e.target.value)}
              sx={{
                '& label.Mui-focused': { color: '#333' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ccc' },
                  '&:hover fieldset': { borderColor: '#aaa' },
                  '&.Mui-focused fieldset': { borderColor: '#333' },
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Validity (mins)"
              fullWidth
              value={input.validity}
              onChange={(e) => handleChange(idx, "validity", e.target.value)}
              sx={{
                '& label.Mui-focused': { color: '#333' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ccc' },
                  '&:hover fieldset': { borderColor: '#aaa' },
                  '&.Mui-focused fieldset': { borderColor: '#333' },
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Custom Shortcode"
              fullWidth
              value={input.shortcode}
              onChange={(e) => handleChange(idx, "shortcode", e.target.value)}
              sx={{
                '& label.Mui-focused': { color: '#333' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ccc' },
                  '&:hover fieldset': { borderColor: '#aaa' },
                  '&.Mui-focused fieldset': { borderColor: '#333' },
                }
              }}
            />
          </Grid>
        </Grid>
      ))}

      <Box display="flex" justifyContent="flex-start" sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          onClick={addField}
          disabled={inputs.length >= 5}
          sx={{
            borderColor: "#444",
            color: "#444",
            '&:hover': {
              backgroundColor: "#f2f2f2",
              borderColor: "#222"
            }
          }}
        >
          Add Another URL
        </Button>

        <Button
          variant="contained"
          sx={{
            ml: 2,
            backgroundColor: "#444",
            color: "#fff",
            '&:hover': {
              backgroundColor: "#222"
            }
          }}
          onClick={handleSubmit}
        >
          Shorten
        </Button>
      </Box>

      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Shortened Links:</Typography>
          {results.map((r, i) => (
            <Typography key={i} sx={{ mt: 1 }}>
              {r.original} → <a href={r.shortUrl}>{r.shortUrl}</a> (Expires:{" "}
              {new Date(r.expiresAt).toLocaleString()})
            </Typography>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default ShortenerPage;
