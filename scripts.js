const calendarContainer = document.getElementById("calendar-container");

// Define deadlines for specific dates

/*
const deadlines = [
    { date: "2025-01-30", conference: "ICML Abstract", link: "https://icml.cc/" },
    { date: "2024-10-01", conference: "ICLR", link: "https://iclr.cc/" },
];
*/

function updateCalendarWithDeadlines() {
    // Ensure deadlines are loaded
    if (deadlines.length === 0) {
        console.log("Deadlines data is not yet loaded.");
    }
}

// Call this after fetchConferenceDataCSV has populated deadlines
setTimeout(updateCalendarWithDeadlines, 1000);

const today = new Date();

// Function to normalize dates (set time to 00:00:00) for comparison
function normalizeDate(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);  // Set time to midnight for strict comparison
    return d;
}

let startMonth = today.getMonth() - 2;
let startYear = today.getFullYear();

let currentTooltip = null;

for (let i = 0; i < 12; i++) {
    let month = (startMonth + i) % 12;
    let year = startYear + Math.floor((startMonth + i) / 12);
    
    const monthDiv = document.createElement("div");
    monthDiv.className = "month";
    
    const header = document.createElement("h3");
    header.innerText = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
    monthDiv.appendChild(header);

    const weekdaysDiv = document.createElement("div");
    weekdaysDiv.className = "weekdays";
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const weekdayDiv = document.createElement("div");
        weekdayDiv.className = "weekday";
        weekdayDiv.innerText = day;
        weekdaysDiv.appendChild(weekdayDiv);
    });
    monthDiv.appendChild(weekdaysDiv);

    const daysContainer = document.createElement("div");
    daysContainer.className = "days";

    const firstDay = new Date(year, month, 1).getDay();
    for (let j = 0; j < firstDay; j++) {
        const emptyDiv = document.createElement("div");
        daysContainer.appendChild(emptyDiv);
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.innerText = day;

        const currentDate = new Date(year, month, day);
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        // const dateString = currentDate.toISOString().split("T")[0];  // Format date as YYYY-MM-DD
        
        // Highlight today's date
        if (normalizeDate(currentDate).getTime() === normalizeDate(today).getTime()) {
            dayDiv.classList.add("current-date");
        }

        // Check if the date has deadlines
        const dateDeadlines = deadlines.filter(d => d.date === dateString);
        if (dateDeadlines.length > 0) {
            // Mark the date with a deadline
            dayDiv.classList.add("deadline");

            // Check if the deadline has passed and highlight the date accordingly
            const isPastDeadline = normalizeDate(dateDeadlines[0].date) < normalizeDate(today);
            if (isPastDeadline) {
                dayDiv.classList.add("past-deadline");  // Mark the date as past deadline
            } else {
                dayDiv.classList.add("future-deadline");  // Mark the date as future deadline
            }

            // Create tooltip with multiple links if multiple conferences are on the same date
            const tooltip = document.createElement("span");
            tooltip.className = "tooltip";
            tooltip.innerHTML = dateDeadlines
                .map(d => `<a href="${d.link}" target="_blank">${d.conference}</a>`)
                .join("<br>");
            dayDiv.appendChild(tooltip);

            // Make the day clickable only if it has a deadline
            dayDiv.onclick = () => {
                if (currentTooltip && currentTooltip !== tooltip) {
                    currentTooltip.classList.remove("visible");
                }
                tooltip.classList.toggle("visible");
                currentTooltip = tooltip.classList.contains("visible") ? tooltip : null;
            };
        }

        daysContainer.appendChild(dayDiv);
    }
    
    monthDiv.appendChild(daysContainer);
    calendarContainer.appendChild(monthDiv);
}

// Hide the tooltip if clicking outside a day with a deadline
document.addEventListener("click", (event) => {
    if (currentTooltip && !event.target.closest(".day.deadline")) {
        currentTooltip.classList.remove("visible");
        currentTooltip = null;
    }
});

