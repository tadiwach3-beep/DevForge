const projects = [
    {
        id: "website",
        name: "Build Your First Website",
        description: "Create a simple responsive website using HTML and CSS.",
        difficulty: "Beginner",
        progress: 0,
tasks: [
    "Create the HTML structure",
    "Style the website with CSS",
    "Make the website responsive"
]
    },

    {
        id: "calculator",
        name: "Build a Calculator",
        description: "Create a working calculator using HTML, CSS and JavaScript.",
        difficulty: "Beginner",
        progress: 0,
tasks: [
    "Create the calculator layout",
    "Add number buttons",
    "Add JavaScript calculations",
    "Test the calculator"
]
    },

    {
        id: "to-do",
        name: "Build a To-Do App",
        description: "Create an interactive to-do list using JavaScript.",
        difficulty: "Beginner",
        progress: 0,
tasks: [
    "Create the HTML layout",
    "Add the task input",
    "Add JavaScript functionality",
    "Test the to-do list"
]
    }
];


const projectList = document.querySelector("#project-list");

if (projectList) {

    projects.forEach(function (project) {
            const savedProgress =
        localStorage.getItem(
            "devforge-" + project.id
        );

    let projectProgress = 0;

    if (savedProgress) {

        const completedTasks =
            JSON.parse(savedProgress);

        const completedCount =
            completedTasks.filter(
                function (completed) {
                    return completed === true;
                }
            ).length;

        projectProgress =
            Math.round(
                (completedCount / project.tasks.length) * 100
            );

    }

        projectList.innerHTML += `
         <div class="project-card">

            <div class="project-card-top">

                <span class="project-difficulty">
                ${project.difficulty}
            </span>

        </div>

        <h3>${project.name}</h3>

        <p class="project-description">
            ${project.description}
        </p>

        <div class="project-card-progress">

            <div class="progress-info">

                <span>Progress</span>

                    <strong>
                    ${projectProgress}%
                    </strong>

            </div>

            <div class="project-card-progress-bar">

                <div
                    style="width: ${projectProgress}%"
                ></div>

            </div>

        </div>

        <a
            href="project.html?id=${project.id}"
            class="project-button"
        >
            View Project →
        </a>

    </div>
        `;

    });

}
