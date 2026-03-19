// --- DOM Elements ---

const eventForm = document.getElementById("eventForm");
const eventTitle = document.getElementById("eventTitle");
const eventDate = document.getElementById("eventDate");
const eventCategory = document.getElementById("eventCategory");
const eventDescription = document.getElementById("eventDescription");
const clearAllBtn = document.getElementById("clearAllBtn");
const addSampleBtn = document.getElementById("addSampleBtn");
const eventContainer = document.getElementById("eventContainer");

// Take 2 sample events for Add sample event data
let sampleEvent = [
    {
        title: "web dev",
        date: "4-6-2026",
        category: "workshop",
        description: "ahgs h adg ihai dgjabds"
    },
    {
        title: "web dev2",
        date: "4-7-2026",
        category: "conference",
        description: "ahgs dsfchjh adg ihai dgjabds"
    }
]

// Add sample events
addSampleBtn.addEventListener("click", () => {
    sampleEvent.forEach(addEvent);
})

// --- Functions ---

// Create event card which contains the user data and we store it inside a div.
function createEventCard(eventData) {
    const card = document.createElement("div");
    card.className = "event-card"; //to add a class name dynamically

    card.innerHTML = `
        <button class="delete-btn">X</button>
        <h3>${eventData.title}</h3>
        <div>${eventData.date}</div>
        <span>${eventData.category}</span>
        <p>${eventData.description}</p>
    `;
        // return the card for the add event function
    return card
}
// Add the created event and append inside the event container
function addEvent(eventData) {
    // if empty-state is present then remove it when new card will be added
    const emptyState = document.querySelector(".empty-state");
    if (emptyState) emptyState.remove();

    eventContainer.appendChild(createEventCard(eventData));
}
// --- Event Listeners ---

// form handling using submit event
eventForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // eventData store the user given value

    const eventData = {
        title: eventTitle.value,
        date: eventDate.value,
        category: eventCategory.value,
        description: eventDescription.value,
    };

    addEvent(eventData);
    eventForm.reset();
});

// remove event from event container
eventContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const card = event.target.closest(".event-card");
        if (card) {
            card.remove();
        }
    }

    if (!eventContainer.querySelector(".event-card")) {
        eventContainer.innerHTML = `<div class="empty-state">No events yet, Add your first event!</div>`
    }
})

// Clear all events
clearAllBtn.addEventListener("click", () => {
    eventContainer.innerHTML = `<div class="empty-state">No events yet, Add your first event!</div>`
})


const keyDisplay = document.querySelector(".key-press span");


document.addEventListener("keydown", (event) => {
    const key = event.key;
    
    const keyDisplay = document.getElementById("key-press-display");
    if (keyDisplay) {
        keyDisplay.textContent = key === " " ? "Space" : key;
    }

    let targetListId = "";

    if (key.length === 1 && /[a-zA-Z]/.test(key)) {
        targetListId = "list-letters";
    } else if (key.length === 1 && /[0-9]/.test(key)) {
        targetListId = "list-numbers";
    } else {
        targetListId = "list-controls";
    }

    const targetList = document.getElementById(targetListId);
    if (targetList) {
        const newEntry = document.createElement("li");
        newEntry.textContent = key === " " ? "Space" : key;
        
        if (targetList.children.length >= 10) {
            targetList.removeChild(targetList.firstChild);
        }
        
        targetList.appendChild(newEntry);
    }
});

