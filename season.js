
const seasonData = {
    spring: {
        months: ["March", "April", "May"],
        backgroundImage: 'url("img/spring01.png")'
    },
    summer: {
        months: ["June", "July", "August"],
        backgroundImage: 'url("img/summer02.png")'
    },
    autumn: {
        months: ["September", "October", "November"],
        backgroundImage: 'url("img/autumn03.png")'
    },
    winter: {
        months: ["December", "January", "February"],
        backgroundImage: 'url("img/winter04.png")'
    }
};

// Function to get the current season based on the current month
function getCurrentSeason() {
    const currentMonth = new Date().getMonth(); // Get the current month (0-11)

    const monthToSeason = {
        0: 'winter', 1: 'winter', 2: 'spring', 3: 'spring', 4: 'spring',
        5: 'summer', 6: 'summer', 7: 'summer', 8: 'autumn', 9: 'autumn', 10: 'autumn', 11: 'winter'
    };

    return monthToSeason[currentMonth];
}

// Function to set the background based on the current season
function updateBackground() {
    const currentSeason = getCurrentSeason();
    const seasonInfo = seasonData[currentSeason];
    if (seasonInfo) {
        document.body.style.backgroundImage = seasonInfo.backgroundImage;
    }
}

// Automatically update the background on page load
window.addEventListener('load', () => {
    updateBackground(); // Set initial background based on the current season

    // Optionally, you can set an interval to check for season change (every day for example)
    setInterval(updateBackground, 86400000); // Update every 24 hours (in milliseconds)
});

// Function to hide all month displays
function clearDisplay() {
    const seasonDivs = document.querySelectorAll('[id^="season-months-"]');
    seasonDivs.forEach(div => div.innerHTML = '');
}

// Function to display the months for a given season and change background
function showSeasonMonths(season) {
    clearDisplay();

    const seasonInfo = seasonData[season.toLowerCase()];
    const seasonMonthsDiv = document.getElementById(`season-months-${season.toLowerCase()}`);
    if (seasonInfo) {
        seasonMonthsDiv.innerHTML = `<p><strong>${season.charAt(0).toUpperCase() + season.slice(1)}:</strong> ${seasonInfo.months.join(', ')} &nbsp;
        <a href="https://en.wikipedia.org/wiki/Season#:~:text=According%20to%20this%20definition%2C%20for,and%20winter%20on%201%20June." 
        style="text-decoration: none;">📝</a></p>`;
        document.body.style.backgroundImage = seasonInfo.backgroundImage;
    } else {
        seasonMonthsDiv.innerHTML = '<p>Invalid season selected.</p>';
    }
}

// Event listeners for the season elements
document.getElementById('spring').addEventListener('click', () => showSeasonMonths('spring'));
document.getElementById('summer').addEventListener('click', () => showSeasonMonths('summer'));
document.getElementById('autumn').addEventListener('click', () => showSeasonMonths('autumn'));
document.getElementById('winter').addEventListener('click', () => showSeasonMonths('winter'));

// Function to generate the live calendar
function generateCalendar() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const calendarDiv = document.getElementById("calendar");
    const currentMonth = new Date().getMonth(); // Get current month (0-11)

    const monthToSeason = {
        "January": "winter", "February": "winter", "March": "spring", "April": "spring", "May": "spring",
        "June": "summer", "July": "summer", "August": "summer", "September": "autumn", "October": "autumn", "November": "autumn", "December": "winter"
    };

    months.forEach((month, index) => {
        const monthDiv = document.createElement("div");
        monthDiv.textContent = month;

        // Highlight the current month
        if (index === currentMonth) {
            monthDiv.classList.add("highlight");
        }

        // Add event listener to show corresponding season when clicked
        monthDiv.addEventListener("click", () => showSeasonMonths(monthToSeason[month]));
        calendarDiv.appendChild(monthDiv);
    });
}

// Initialize the live calendar
generateCalendar();

// Additional Section for displaying live season
const seasonDisplayDiv = document.getElementById('current-season');
const currentSeason = getCurrentSeason();
const seasonInfo = seasonData[currentSeason];

// Display current season on the page
if (seasonDisplayDiv) {
    seasonDisplayDiv.innerHTML = `<p><strong> <b style="text-decoration: dashed underline 2px rgb(200, 50, 50);"> LIVE</b>
    Current Season:</strong> "${currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)}"</p>
    <p>Months: ${seasonInfo.months.join(', ')}</p>`;
}
// line: 118