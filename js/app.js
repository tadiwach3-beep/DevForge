/* ================================================================
   DEVFORGE APP JAVASCRIPT
   ----------------------------------------------------------------
   This file controls interactive features on the DevForge website.

   Current features:
   1. Connect to Convex
   2. Handle waitlist form submission
   3. Save waitlist information to the database
   4. Show professional success modal
   5. Reset the form after successful submission
   ================================================================ */


/* ================================================================
   1. CONNECT TO CONVEX
   ----------------------------------------------------------------
   This is the Convex deployment that stores our waitlist data.

   DO NOT change this URL unless the Convex deployment changes.
   ================================================================ */

const CONVEX_URL =
    "https://careful-dogfish-959.eu-west-1.convex.cloud";

const client = new convex.ConvexClient(CONVEX_URL);


/* ================================================================
   2. FIND THE WAITLIST FORM
   ----------------------------------------------------------------
   We find the form from index.html so JavaScript can control
   what happens when the visitor clicks "Join Waitlist".
   ================================================================ */

const waitlistForm =
    document.querySelector(".waitlist-form");


/* ================================================================
   3. FIND THE SUCCESS MODAL
   ----------------------------------------------------------------
   These elements were added to index.html.

   successModal:
       The entire popup.

   successClose:
       The "Continue" button inside the popup.
   ================================================================ */

const successModal =
    document.querySelector("#success-modal");

const successClose =
    document.querySelector("#success-close");


/* ================================================================
   4. HANDLE WAITLIST SUBMISSION
   ================================================================ */

waitlistForm.addEventListener(
    "submit",
    async function (event) {

        /* Prevent the browser from refreshing the page */
        event.preventDefault();
        const submitButton =
    waitlistForm.querySelector("button");

submitButton.disabled = true;

submitButton.innerHTML =
    '<span class="button-spinner"></span> Joining waitlist...';


        /* --------------------------------------------------------
           Get information entered into the form
           -------------------------------------------------------- */

        const name =
            document.querySelector("#name").value;

        const email =
            document.querySelector("#email").value;

        const whatsapp =
            document.querySelector("#whatsapp").value;

        const interest =
            document.querySelector("#interest").value;


        /* --------------------------------------------------------
           Try to save the information to Convex
           -------------------------------------------------------- */

        try {

            await client.mutation(
                "waitlist:join",
                {
                    name: name,
                    email: email,
                    whatsapp: whatsapp || undefined,
                    interest: interest
                }
            );


            /* ----------------------------------------------------
               SUCCESS

               If Convex reaches this point, the information was
               successfully saved.

               Instead of using a basic browser alert, we now
               display our professional animated modal.
               ---------------------------------------------------- */

            successModal.classList.add("show");


            /* Reset the form after successful submission */

            waitlistForm.reset();

        }


        /* --------------------------------------------------------
           ERROR HANDLING
           -------------------------------------------------------- */

        catch (error) {

            console.error(
                "Waitlist error:",
                error
            );

          submitButton.disabled = false;

submitButton.innerHTML =
    "Join Waitlist";
          
            alert(
                "Something went wrong. Please try again."
            );

        }

    }
);


/* ================================================================
   5. CLOSE SUCCESS MODAL
   ----------------------------------------------------------------
   When the visitor clicks "Continue", remove the "show" class.

   CSS then handles the fade-out animation.
   ================================================================ */

successClose.addEventListener(
    "click",
    function () {

        successModal.classList.remove("show");

    }
);
