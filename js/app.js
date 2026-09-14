const waitlistForm = document.querySelector(".waitlist-form");

waitlistForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const whatsapp = document.querySelector("#whatsapp").value;
    const interest = document.querySelector("#interest").value;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("WhatsApp:", whatsapp);
    console.log("Interest:", interest);

    alert("You're on the DevForge waitlist!");
});