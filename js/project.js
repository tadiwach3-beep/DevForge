/* ================================================================
   DEVFORGE PROJECT PAGE
   ================================================================
   This file controls an individual project page.

   It:
   1. Finds the selected project from the URL
   2. Displays the project information
   3. Creates the project task list
   4. Loads saved task progress
   5. Tracks completed tasks
   6. Saves progress when tasks change
   7. Calculates project progress
   ================================================================ */


/* ================================================================
   1. GET PROJECT ID
   ================================================================ */

const params =
    new URLSearchParams(window.location.search);

const projectId =
    params.get("id");


/* ================================================================
   2. FIND THE PROJECT
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
   ================================================================ */

const taskCheckboxes =
    document.querySelectorAll(".task-checkbox");


/* ================================================================
   7. FIND THE PROGRESS TEXT
   ================================================================ */

const progressText =
    document.querySelector("#project-progress");


/* ================================================================
   8. LOAD SAVED PROGRESS
   ----------------------------------------------------------------
   localStorage remembers information in the browser.

   We use the project ID as part of the storage key so each
   project gets its own saved progress.
   ================================================================ */

const savedProgress =
    localStorage.getItem(
        "devforge-" + projectId
    );


/* ================================================================
   9. RESTORE SAVED TASKS
   ----------------------------------------------------------------
   If the learner has previously completed tasks, restore those
   checkbox states.
   ================================================================ */

if (savedProgress) {

    const completedTasks =
        JSON.parse(savedProgress);

    taskCheckboxes.forEach(function (checkbox, index) {

        checkbox.checked =
            completedTasks[index] === true;

    });

}


/* ================================================================
   10. UPDATE PROJECT PROGRESS
   ----------------------------------------------------------------
   Counts completed tasks and converts them into a percentage.
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


    /* ============================================================
       SAVE PROGRESS
       ------------------------------------------------------------
       Convert the checkbox states into an array and save them.
       ============================================================ */

    const taskStates =
        Array.from(taskCheckboxes).map(
            function (checkbox) {

                return checkbox.checked;

            }
        );


    localStorage.setItem(
        "devforge-" + projectId,
        JSON.stringify(taskStates)
    );

}


/* ================================================================
   11. LISTEN FOR TASK CHANGES
   ----------------------------------------------------------------
   Whenever a checkbox changes, save the progress and update the
   percentage.
   ================================================================ */

taskCheckboxes.forEach(function (checkbox) {

    checkbox.addEventListener(
        "change",
        updateProgress
    );

});


/* ================================================================
   12. INITIAL PROGRESS
   ----------------------------------------------------------------
   Calculate progress after loading any saved task states.
   ================================================================ */

updateProgress();