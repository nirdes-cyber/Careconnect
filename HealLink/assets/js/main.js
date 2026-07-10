const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute(
        "class",
        isOpen ? "ri-close-line" : "ri-menu-4-line"
    );
});

navLinks.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-4-line");
});

const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
    ...scrollRevealOption,
    origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
    ...scrollRevealOption,
    delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
    ...scrollRevealOption,
    delay: 1000,
});
ScrollReveal().reveal(".header__content p", {
    ...scrollRevealOption,
    delay: 1500,
});
ScrollReveal().reveal(".header__btn", {
    ...scrollRevealOption,
    delay: 2000,
});
ScrollReveal().reveal(".header__socials li", {
    ...scrollRevealOption,
    delay: 2500,
    interval: 500,
});

// Footer date 
document.getElementById("year").textContent = new Date().getFullYear();

// code helping in the ai bot

const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const messages = document.getElementById("chat-messages");

const botReplies = [
    {
        keywords: ["hello", "hi", "hey"],
        reply: "Hello 👋 Welcome to CareConnect. How can I help you today?"
    },
    {
        keywords: ["careconnect", "what is careconnect"],
        reply: "CareConnect is an anonymous mental health support platform where users can safely share their concerns and receive guidance from verified psychologists."
    },
    {
        keywords: ["anonymous", "privacy", "identity"],
        reply: "Your personal identity is protected. Posts are displayed anonymously while your account remains securely verified."
    },
    {
        keywords: ["psychologist", "doctor", "counsellor", "counselor"],
        reply: "Verified psychologists review anonymous posts and provide professional guidance through the platform."
    },
    {
        keywords: ["appointment", "book"],
        reply: "You can book an appointment with an available psychologist after logging into your CareConnect account."
    },
    {
        keywords: ["register", "signup", "account"],
        reply: "Click the Register button on the homepage, complete your details, verify your identity, and you can start using CareConnect."
    },
    {
        keywords: ["depressed", "sad", "stress", "anxiety", "worried", "alone"],
        reply: "I'm sorry you're having a difficult time. You don't have to go through it alone. CareConnect lets you anonymously share your concerns with verified psychologists who can provide professional support."
    },
    {
        keywords: ["thank"],
        reply: "You're welcome 😊 I'm always here to help you navigate CareConnect."
    }
];

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const userText = input.value.trim();

    if (userText === "") return;

    addMessage(userText, "user");

    input.value = "";

    setTimeout(() => {
        const reply = getReply(userText.toLowerCase());
        addMessage(reply, "bot");
    }, 700);

});

function getReply(text) {

    for (let item of botReplies) {

        for (let key of item.keywords) {

            if (text.includes(key)) {
                return item.reply;
            }

        }

    }

    return "I couldn't understand your question. You can ask me about CareConnect, anonymous posting, psychologists, appointments, privacy, or registration.";

}

function addMessage(text, sender) {

    const div = document.createElement("div");

    div.className = sender === "user" ? "user-message" : "bot-message";

    div.innerHTML = text;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
}
// faq
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

const question=item.querySelector(".faq-question");

question.addEventListener("click",()=>{

faqItems.forEach(faq=>{

if(faq!==item){
faq.classList.remove("active");
}

});

item.classList.toggle("active");

});

});




