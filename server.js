const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;
const apiKey = process.env.OPENWEATHERMAP_API_KEY;

app.use(express.static('public'));


app.get('/airquality/:lat/:lon', async (req, res) => {
  const { lat, lon } = req.params;
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution`, {
      params: {
        lat,
        lon,
        appid: apiKey
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Erro ao obter dados de qualidade do ar');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
