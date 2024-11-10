const map = L.map('map').setView([-19.7472, -47.9381], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);


fetch('/airquality/-19.7472/-47.9381')
  .then(response => response.json())
  .then(data => {
    const aqi = data.list[0].main.aqi;
    const pollutants = data.list[0].components;

    const marker = L.marker([-19.7472, -47.9381], { draggable: true })
      .addTo(map)
      .bindPopup(`Qualidade do Ar (AQI): ${aqi}`)
      .openPopup();

    marker.on('dragend', function (e) {
      const position = marker.getLatLng();
      fetch(`/airquality/${position.lat}/${position.lng}`)
        .then(response => response.json())
        .then(data => {
          const updatedAqi = data.list[0].main.aqi;
          const updatedPollutants = data.list[0].components;

          marker.setPopupContent(`Qualidade do Ar (AQI): ${updatedAqi}`).openPopup();

  
          const updatedLabels = ['CO (Monóxido de Carbono)', 'NO (Monóxido de Nitrogênio)', 'NO2 (Dióxido de Nitrogênio)', 'O3 (Ozônio)', 'SO2 (Dióxido de Enxofre)', 'PM2.5 (Partículas finas)', 'PM10 (Partículas grossas)', 'NH3 (Amônia)'];
          const updatedValues = Object.values(updatedPollutants);

          chart.data.labels = updatedLabels;
          chart.data.datasets[0].data = updatedValues;
          chart.update();
        });
    });


    const labels = ['CO', 'NO', 'NO2', 'O3', 'SO2', 'PM2.5', 'PM10', 'NH3'];
    const values = Object.values(pollutants);


    const ctx = document.getElementById('airQualityChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Concentração de Poluentes (μg/m³)',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    });
  });
