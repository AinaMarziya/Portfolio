// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Close menu when a link is clicked

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});


// ===============================
// LOAD PROJECTS FROM MONGODB
// ===============================

async function loadProjects() {

    try {

        const response = await fetch("/api/projects");

        if (!response.ok) {
            throw new Error("Failed to fetch projects");
        }

        const projects = await response.json();

        const container =
            document.getElementById("projectsContainer");

        container.innerHTML = "";


        projects.forEach((project, index) => {

            const card = document.createElement("div");

            card.className = "project-card";


            card.innerHTML = `

                <div class="project-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <h3>
                    ${project.title}
                </h3>

                <p>
                    ${project.description}
                </p>

                <div class="project-tech">

                    ${project.technologies
                        .map(tech => `<span>${tech}</span>`)
                        .join("")}

                </div>

                ${
                    project.githubLink
                    ? `
                        <a
                            href="${project.githubLink}"
                            class="project-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Project →
                        </a>
                    `
                    : ""
                }

            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.error(
            "Error loading projects:",
            error
        );

    }

}


// Run when page loads

loadProjects();