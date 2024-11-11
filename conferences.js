// Conference data

/*
const deadlines = [
    {
        conference: "ICML 2025 Abstract",
        date: "2025/01/31",
        link: "https://icml.cc/"
    },
    {
        conference: "ICLR 2025",
        date: "2024/10/01",
        link: "https://iclr.cc/"
    },
];
*/

const csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSuC6XDI6ehiL-00t7rlcECkxT2-UYOI87tsUr0_NZzRRRdTZYeJjShbDKodkLC8zYwJ0L4jxY5MZav/pub?output=csv";

// Declare deadlines array globally
let deadlines = [];

// Fetch and parse CSV data
async function fetchConferenceDataCSV() {
    try {
        const response = await fetch(csvURL);
        const data = await response.text();
        
        deadlines = parseCSV(data); // Populate the global deadlines array
    } catch (error) {
        console.error("Error fetching data from CSV:", error);
    }
}

// Parse CSV text to extract only necessary fields
function parseCSV(data) {
    const lines = data.split("\n");
    const headers = lines[0].split(",");
    
    const conferenceIndex = headers.findIndex(header => header.trim().toLowerCase() === "conference name");
    const dateIndex = headers.findIndex(header => header.trim().toLowerCase() === "date");
    const linkIndex = headers.findIndex(header => header.trim().toLowerCase() === "link");
    
    const parsedDeadlines = [];

    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",");
        
        if (!row[conferenceIndex] || !row[dateIndex] || !row[linkIndex]) continue;
        
        // Normalize date format to YYYY-MM-DD
        const originalDate = row[dateIndex].trim();
        const normalizedDate = normalizeDate(originalDate);
        console.log(normalizedDate);

        const entry = {
            conference: row[conferenceIndex].trim(),
            date: normalizedDate,
            link: row[linkIndex].trim()
        };
        
        parsedDeadlines.push(entry);
    }

    return parsedDeadlines;
}

// Function to normalize date to YYYY-MM-DD
function normalizeDate(dateStr) {
    const [month, day, year] = dateStr.split("/").map(part => part.padStart(2, '0'));
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
}

// Call the function to load data on page load
fetchConferenceDataCSV();
