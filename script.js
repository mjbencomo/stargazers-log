const repoList = document.querySelector('#repo-list');

function formatStars(count) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(count);
}

function renderRepos(repositories) {
  repoList.innerHTML = repositories
    .map((repo) => {
      const name = repo.name || 'Unknown repo';
      const description = repo.description || 'No description provided.';
      const language = repo.language || 'Unknown';
      const stars = formatStars(repo.stargazers_count || 0);
      const date = new Date(repo.starred_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      return `
        <li class="repo-item">
          <a class="repo-link" href="${repo.html_url}" target="_blank" rel="noreferrer">
            ${name}
          </a>
          <p class="repo-description">${description}</p>
          <div class="repo-meta">
            <span class="repo-language"><span class="dot"></span>${language}</span>
            <span>⭐ ${stars}</span>
            <span>Starred ${date}</span>
          </div>
        </li>
      `;
    })
    .join('');
}

fetch('events.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  })
  .then((repositories) => {
    renderRepos(repositories);
  })
  .catch((error) => {
    repoList.innerHTML = `<li class="repo-item error">Unable to load starred repositories: ${error.message}</li>`;
  });
