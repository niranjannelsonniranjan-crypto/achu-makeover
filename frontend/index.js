// Simple static file server for Vercel deployment
// This file exists only to satisfy Vercel's entrypoint requirement
// The actual frontend is static HTML files

module.exports = (req, res) => {
  res.status(200).send('Frontend is deployed as static files. Use the HTML files directly.');
};
