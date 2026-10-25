// Simple entrypoint for Vercel
// The actual frontend is static HTML files

module.exports = (req, res) => {
  // For API calls, this shouldn't be used
  if (req.url.startsWith('/api')) {
    res.status(404).json({ error: 'API not found - use the Render backend' });
    return;
  }
  
  // For static files, Vercel will serve them
  res.status(200).send('Frontend deployed successfully');
};
