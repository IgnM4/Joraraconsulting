const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/linkedin', async (req, res) => {
  try {
    const token = process.env.LINKEDIN_TOKEN;
    const orgId = process.env.LINKEDIN_ORG_ID;
    if (!token || !orgId) {
      return res.status(500).json({ error: 'Missing LinkedIn credentials' });
    }
    const url = `https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:organization:${orgId}&sharesPerOwner=3`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    if (!response.ok) throw new Error(`LinkedIn API error: ${response.status}`);
    const data = await response.json();
    const posts = data.elements.map(el => ({
      title: el.text?.text?.substring(0, 60) || 'Publicación',
      date: new Date(el.created.time).toLocaleDateString('es-CL', {
        year: 'numeric', month: 'long'
      }),
      summary: el.text?.text || ''
    }));
    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch LinkedIn posts' });
  }
});

app.use(express.static('.'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
