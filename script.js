async function buscarClima() {
    const cidade = document.getElementById('cidade').value;

    if (!cidade) {
        alert('Por favor, digite uma cidade!');
        return;
    }

    // Passo 1: obter latitude e longitude da cidade via API do Open-Meteo (usando geocoding)
    const urlGeo = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`;

    try {
        const respostaGeo = await fetch(urlGeo);
        const dadosGeo = await respostaGeo.json();

        if (!dadosGeo.results || dadosGeo.results.length === 0) {
            throw new Error('Cidade não encontrada!');
        }

        const latitude = dadosGeo.results[0].latitude;
        const longitude = dadosGeo.results[0].longitude;
        const nomeCidade = dadosGeo.results[0].name;

        // Passo 2: buscar dados do clima
        const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;

        const respostaClima = await fetch(urlClima);
        const dadosClima = await respostaClima.json();

        const clima = dadosClima.current_weather;

        document.getElementById('resultado').innerHTML = `
            <h2>${nomeCidade}</h2>
            <p><strong>Temperatura:</strong> ${clima.temperature}°C</p>
            <p><strong>Vento:</strong> ${clima.windspeed} km/h</p>
            <p><strong>Condição:</strong> ${clima.weathercode === 0 ? 'Céu Limpo' : 'Clima Variado'}</p>
        `;
    } catch (error) {
        document.getElementById('resultado').innerHTML = `<p>${error.message}</p>`;
    }
}
