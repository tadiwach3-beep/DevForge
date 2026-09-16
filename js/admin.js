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
   LOAD ADMIN DATA
   ================================================================ */

loadWaitlistCount();