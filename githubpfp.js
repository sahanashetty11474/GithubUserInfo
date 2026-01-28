const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
  try {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserCard(respData);
    getRepos(username);
    console.log(respData);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

async function getRepos(username) {
  try {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();
    console.log(respData);
    addReposToCard(respData);
  } catch (error) {
    console.error("Error fetching repos:", error);
  }
}

function createUserCard(user) {
  const cardHTML = `
          <div class="card">
            <div>
              <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
              <h2>${user.name || 'N/A'}</h2>
              <p class="username">@${user.login}</p>
              <p class="bio">${user.bio || 'No bio available'}</p>
              
              <div class="stats">
                <div class="stat">
                  <span class="stat-value">${user.followers}</span>
                  <span class="stat-label">Followers</span>
                </div>
                <div class="stat">
                  <span class="stat-value">${user.following}</span>
                  <span class="stat-label">Following</span>
                </div>
                <div class="stat">
                  <span class="stat-value">${user.public_repos}</span>
                  <span class="stat-label">Repos</span>
                </div>
                <div class="stat">
                  <span class="stat-value">${user.public_gists}</span>
                  <span class="stat-label">Gists</span>
                </div>
              </div>

              <div class="details">
                ${user.location ? `<p><strong>📍 Location:</strong> ${user.location}</p>` : ''}
                ${user.company ? `<p><strong>🏢 Company:</strong> ${user.company}</p>` : ''}
                ${user.blog ? `<p><strong>🔗 Website:</strong> <a href="${user.blog}" target="_blank">${user.blog}</a></p>` : ''}
                ${user.twitter_username ? `<p><strong>𝕏 Twitter:</strong> <a href="https://twitter.com/${user.twitter_username}" target="_blank">@${user.twitter_username}</a></p>` : ''}
                <p><strong>📅 Joined:</strong> ${new Date(user.created_at).toLocaleDateString()}</p>
              </div>
              
              <h4>Top Repositories:</h4>
              <div id="repos" class="repos"></div>
            </div>
          </div>`;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;
      reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
