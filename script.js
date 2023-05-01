document.addEventListener("DOMContentLoaded", function () {
    const projects = [
        {
            name: "Piano",
            url: "https://tilmanper.github.io/Piano/"
        }
        // Add more projects here
    ];

    const projectsContainer = document.getElementById("projects");

    projects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.innerHTML = `<a href="${project.url}" target="_blank">${project.name}</a>`;
        projectsContainer.appendChild(projectDiv);
    });
});
