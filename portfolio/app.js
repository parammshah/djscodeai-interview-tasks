// Load projects dynamically
fetch("assets/projects.json")
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById("projects-container");
    projects.forEach(proj => {
      const card = document.createElement("div");
      card.classList.add("project-card");
      card.innerHTML = `
        <h3>${proj.title}</h3>
        <p>${proj.description}</p>
        ${proj.link ? `<a href="${proj.link}" target="_blank" class="btn">View</a>` : ""}
      `;
      container.appendChild(card);
    });
  });
