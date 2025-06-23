const apiKey = '9aaede8f';

async function buscar() {
  const query = document.getElementById('search').value.trim();
  if (!query) {
    alert('Digite o título de um filme');
    return;
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const ul = document.getElementById('resultado');
    ul.innerHTML = '';

    if (data.Response === 'False') {
      ul.innerHTML = `<li>${data.Error || 'Nenhum resultado encontrado.'}</li>`;
      return;
    }

    data.Search.slice(0, 5).forEach(filme => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${filme.Title}</strong> (${filme.Year})<br>
        <img src="${filme.Poster !== 'N/A' ? filme.Poster : ''}" width="100" alt="Poster">
      `;
      ul.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    alert('Erro ao buscar filmes');
  }
}

document.getElementById('btnBuscar').addEventListener('click', buscar);
