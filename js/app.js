```js
const CONVEX_URL = "https://careful-dogfish-959.eu-west-1.convex.cloud";

const client = new convex.ConvexClient(CONVEX_URL);

const waitlistForm = document.querySelector(".waitlist-form");

waitlistForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const whatsapp = document.querySelector("#whatsapp").value;
    const interest = document.querySelector("#interest").value;

    try {
        await client.mutation("waitlist:join", {
            name: name,
            email: email,
            whatsapp: whatsapp || undefined,
            interest: interest
        });

        alert("You're on the DevForge waitlist!");

        waitlistForm.reset();

    } catch (error) {
        console.error("Waitlist error:", error);

        alert("Something went wrong. Please try again.");
    }
});
```
