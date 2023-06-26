document.addEventListener("DOMContentLoaded", () => {
    const projects = [
        {
            title: "Virtual Piano", link: "/Piano", description: "A virtual piano that can be played with the keyboard or a connected MIDI Piano.",
            image: "./assets/images/VirtualPiano.png", category: "webapp"
        },
        {
            title: "NASA Image Search", link: "/NASAImageSearch", description: "A web app that allows you to search for images from NASA's image API.",
            image: "./assets/images/NASAImageSearch.png", category: "webapp"
        },
        {
            title: "Conways Game Of Life", link: "/GameOfLife", description: "Simulation of Conways Game of Life with various presets and controls.",
            image: "./assets/images/GameOfLife.png", category: "webapp"
        },
        {
            title: "Counters", link: "/Counters", description: "A simple web app that allows you to keep track of multiple counters.",
            image: "./assets/images/Counters.png", category: "webapp"
        },
        {
            title: "Calculator", link: "/Calculator", description: "Very basic calculator application. Supports keyboard input.",
            image: "./assets/images/Calculator.png", category: "webapp"
        },
        // ...add more projects
    ];

    const themeToggle = document.getElementById("themeToggle");
    const dynamicMessage = document.getElementById("dynamicMessage");
    const projectsContainer = document.getElementById("projectsContainer");

    // Theme functions
    const saveThemeToLocalStorage = () => localStorage.setItem("theme", document.documentElement.dataset.theme);
    const getThemeFromLocalStorage = () => localStorage.getItem("theme");
    const switchTheme = () => {
        document.documentElement.dataset.theme = document.documentElement.dataset.theme === "dark" ? "" : "dark";
        saveThemeToLocalStorage();
    };

    // Set theme based on user preference or stored theme
    if ((window.matchMedia("(prefers-color-scheme: dark)").matches && !getThemeFromLocalStorage()) || getThemeFromLocalStorage() === "dark") {
        switchTheme();
    }
    themeToggle.addEventListener("click", switchTheme);

    document.documentElement.dataset.theme = getThemeFromLocalStorage() || "";
    function typeEffect(element, messages, period) {
        let currentMessageIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let currentTimeout;

        function type() {
            const currentMessage = messages[currentMessageIndex];
            const newText = isDeleting
                ? currentMessage.slice(0, currentCharIndex - 1)
                : currentMessage.slice(0, currentCharIndex + 1);
            element.textContent = newText;

            if (!isDeleting && currentCharIndex === currentMessage.length) {
                currentTimeout = setTimeout(() => {
                    isDeleting = true;
                    type();
                }, period);
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentMessageIndex = (currentMessageIndex + 1) % messages.length;
                type();
            } else {
                currentCharIndex += isDeleting ? -1 : 1;
                currentTimeout = setTimeout(type, isDeleting ? 60 : 120);
            }
        }

        type();

        return () => clearTimeout(currentTimeout);
    }

    const messages = [
        "Welcome to my portfolio!",
        "Check out my latest projects below.",
        "Quick note: This site is still a work in progress.",
        "Drink water! Stay hydrated!",
        "You can breathe through your nose and your mouth at the same time!",
        "Thanks for taking the time to explore my portfolio!",
        "A single strand of spaghetti is called a 'spaghetto'.",
        "Rats can't throw up.",
        "Oxford University is older than the Aztec Empire.",
        "The word 'bed' looks like a bed.",
        "Banging your head against a wall for one hour burns 150 calories.",
        "The average person falls asleep in 7 minutes.",
    ];
    const stopTypingEffect = typeEffect(dynamicMessage, messages, 2000);

    projects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.dataset.category = project.category;
        projectCard.innerHTML = `
        <div class="project-card__image-container">
            <img class="project-card__image" src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-card__content">
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__description">${project.description}</p>
            <a class="project-card__button" href="${project.link}" target="_blank">Visit Project</a>
        </div>
    `;
        projectsContainer.appendChild(projectCard);
        projectCard.querySelector(".project-card__image-container").addEventListener("click", () => {
            window.open(project.link, "_blank");
        });
    });

    // Cleanup function to stop typing effect when the page is unloaded
    window.addEventListener("beforeunload", stopTypingEffect);
});
