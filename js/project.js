/* ================================================================
   DEVFORGE PROJECT PAGE
   ================================================================
   This file controls an individual project page.

   It:
   1. Finds the selected project from the URL
   2. Displays the project information
   3. Creates the project task list
   4. Tracks completed tasks
   5. Calculates project progress
   ================================================================ */


/* ================================================================
   1. GET PROJECT ID
   ----------------------------------------------------------------
   Example URL:

   project.html?id=website

   The code below gets "website" from the URL.
   ================================================================ */

const params =
    new URLSearchParams(window.location.search);

const projectId =
    params.get("id");


/* ================================================================
   2. FIND THE PROJECT
   ----------------------------------------------------------------
   We search the projects array from projects.js and find the
   project whose ID matches the ID in the URL.
   ================================================================ */

const project =
    projects.find(function (project) {

        return project.id === projectId;

    });


/* ================================================================
   3. DISPLAY PROJECT INFORMATION
   ================================================================ */

document.querySelector("#project-name").textContent =
    project.name;

document.querySelector("#project-description").textContent =
    project.description;

document.querySelector("#project-difficulty").textContent =
    project.difficulty;


/* ================================================================
   4. FIND THE TASK LIST
   ================================================================ */

const taskList =
    document.querySelector("#project-tasks");


/* ================================================================
   5. CREATE THE TASK CHECKBOXES
   ----------------------------------------------------------------
   Every task in projects.js becomes a checkbox on the page.
   ================================================================ */

project.tasks.forEach(function (task) {

    taskList.innerHTML += `
        <label>
            <input
                type="checkbox"
                class="task-checkbox"
            >

            ${task}

        </label>

        <br>
    `;

});


/* ================================================================
   6. FIND THE CHECKBOXES
   ----------------------------------------------------------------
   Now that the checkboxes have been created, we can find them.
   ================================================================ */

const taskCheckboxes =
    document.querySelectorAll(".task-checkbox");


/* ================================================================
   7. FIND THE PROGRESS TEXT
   ================================================================ */

const progressText =
    document.querySelector("#project-progress");


/* ================================================================
   8. UPDATE PROJECT PROGRESS
   ----------------------------------------------------------------
   This function counts how many tasks are completed and converts
   that number into a percentage.

   Example:

   1 completed ÷ 3 total × 100 = 33%
   ================================================================ */

function updateProgress() {

    let completedTasks = 0;


    /* Count completed tasks */

    taskCheckboxes.forEach(function (checkbox) {

        if (checkbox.checked) {

            completedTasks++;

        }

    });


    /* Calculate percentage */

    const progress =
        Math.round(
            (completedTasks / taskCheckboxes.length) * 100
        );


    /* Display percentage */

    progressText.textContent =
        progress + "%";

}


/* ================================================================
   9. LISTEN FOR TASK CHANGES
   ----------------------------------------------------------------
   Whenever a learner checks or unchecks a task, recalculate the
   project progress.
   ================================================================ */

taskCheckboxes.forEach(function (checkbox) {

    checkbox.addEventListener(
        "change",
        updateProgress
    );

});


/* ================================================================
   10. INITIAL PROGRESS
   ----------------------------------------------------------------
   Calculate the progress when the page first loads.
   ================================================================ */

updateProgress();