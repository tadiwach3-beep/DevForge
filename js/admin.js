
/* ================================================================
   DEVFORGE ADMIN DASHBOARD
   ================================================================ */

const CONVEX_URL =
    "https://careful-dogfish-959.eu-west-1.convex.cloud";



/* ================================================================
   CONNECT TO CONVEX
   ================================================================ */

const client =
    new convex.ConvexClient(CONVEX_URL);



/* ================================================================
   TOTAL WAITLIST
   ================================================================ */

async function loadWaitlistCount() {

    try {

        const totalWaitlist =
            await client.query(
                "admin:getWaitlistCount"
            );

        document.querySelector(
            "#admin-total-waitlist"
        ).textContent =
            totalWaitlist;

    } catch (error) {

        console.error(
            "Could not load waitlist count:",
            error
        );

    }

}



/* ================================================================
   NEW THIS WEEK
   ================================================================ */

async function loadWeeklySignups() {

    try {

        const weeklySignups =
            await client.query(
                "admin:getWeeklySignups"
            );

        document.querySelector(
            "#admin-weekly-signups"
        ).textContent =
            weeklySignups;

    } catch (error) {

        console.error(
            "Could not load weekly signups:",
            error
        );

    }

}



/* ================================================================
   LOAD ADMIN DATA
   ================================================================ */


/* ================================================================
   NEW THIS MONTH
   ================================================================ */

async function loadMonthlySignups() {

    try {

        const monthlySignups =
            await client.query(
                "admin:getMonthlySignups"
            );

        document.querySelector(
            "#admin-monthly-signups"
        ).textContent =
            monthlySignups;

    } catch (error) {

        console.error(
            "Could not load monthly signups:",
            error
        );

    }

}


/* ================================================================
   TOP LEARNING INTEREST
   ================================================================ */

async function loadTopInterest() {

    try {

        const topInterest =
            await client.query(
                "admin:getTopInterest"
            );

        document.querySelector(
            "#admin-top-interest"
        ).textContent =
            topInterest;

    } catch (error) {

        console.error(
            "Could not load top interest:",
            error
        );

    }

}

loadWaitlistCount();

loadWeeklySignups();

loadMonthlySignups();

loadTopInterest();


/* ================================================================
let adminLearners = [];

   LEARNERS
   ================================================================ */

async function loadLearners() {

    try {

        const learners =
            await client.query(
                "admin:getLearners"
            );

        adminLearners = learners;

        renderLearners(learners);

    } catch (error) {

        console.error(
            "Could not load learners:",
            error
        );

    }

}



/* ================================================================
   LEARNER SEARCH
   ================================================================ */



function renderLearners(learners) {

    const container =
        document.querySelector(
            "#admin-learners-list"
        );


    if (!container) {

        return;

    }


    if (!learners.length) {

        container.innerHTML = `
            <div class="admin-empty-state">

                <div class="admin-empty-icon">
                    ♙
                </div>

                <strong>
                    No learners found
                </strong>

                <span>
                    Try another name, email, or interest.
                </span>

            </div>
        `;

        return;

    }


    container.innerHTML =
        learners.map(function (learner) {

            const date =
                new Date(
                    learner.createdAt
                ).toLocaleDateString(
                    "en-ZA",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );


            return `
                <div class="admin-learner-row">

                    <div class="admin-learner-main">

                        <strong>
                            ${learner.name}
                        </strong>

                        <span>
                            ${learner.email}
                        </span>

                    </div>


                    <div class="admin-learner-interest">

                        <span>
                            Interest
                        </span>

                        <strong>
                            ${learner.interest}
                        </strong>

                    </div>


                    <div class="admin-learner-whatsapp">

                        <span>
                            WhatsApp
                        </span>

                        <strong>
                            ${learner.whatsapp}
                        </strong>

                    </div>


                    <div class="admin-learner-date">

                        <span>
                            Joined
                        </span>

                        <strong>
                            ${date}
                        </strong>

                    </div>

                </div>
            `;

        }).join("");

}


const learnerSearch =
    document.querySelector(
        "#admin-learners-search"
    );


if (learnerSearch) {

    learnerSearch.addEventListener(
        "input",
        function () {

            const search =
                learnerSearch.value
                    .trim()
                    .toLowerCase();


            const filteredLearners =
                adminLearners.filter(
                    function (learner) {

                        return (

                            learner.name
                                .toLowerCase()
                                .includes(search)

                            ||

                            learner.email
                                .toLowerCase()
                                .includes(search)

                            ||

                            learner.interest
                                .toLowerCase()
                                .includes(search)

                            ||

                            learner.whatsapp
                                .toLowerCase()
                                .includes(search)

                        );

                    }
                );


            renderLearners(
                filteredLearners
            );

        }
    );

}
