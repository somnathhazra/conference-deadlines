const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function getCurrentMonthInfo() {
    const now = new Date();
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    return {
        startYear: twoMonthsAgo.getFullYear(),
        startMonth: twoMonthsAgo.getMonth(),
        currentYear: now.getFullYear(),
        currentMonth: now.getMonth(),
        currentDay: now.getDate()
    };
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

function isToday(year, month, day) {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year;
}

function getConferencesForDate(year, month, day) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return conferences.filter(conf => conf.deadline === dateStr);
}

function createCalendarIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>`;
}

function closeAllTooltips() {
    document.querySelectorAll('.deadline-tooltip.active').forEach(tooltip => {
        tooltip.classList.remove('active');
    });
}

function handleTooltipClick(event) {
    event.stopPropagation();
}

function createMonthCard(year, month, isCurrentMonth) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const monthCard = document.createElement('div');
    monthCard.className = `month-card${isCurrentMonth ? ' current' : ''}`;

    const monthHeader = document.createElement('div');
    monthHeader.className = 'month-header';
    monthHeader.innerHTML = `
        <span class="month-title">${months[month]} ${year}${isCurrentMonth ? ' (Current)' : ''}</span>
        ${createCalendarIcon()}
    `;

    const calendar = document.createElement('div');
    calendar.className = 'calendar';

    // Add weekday headers
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const weekday = document.createElement('div');
        weekday.className = 'weekday';
        weekday.textContent = day;
        calendar.appendChild(weekday);
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day';
        calendar.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        const confs = getConferencesForDate(year, month, day);
        const isCurrentDay = isToday(year, month, day);
        
        // Build class list for the day cell
        const classList = ['day'];
        if (confs.length > 0) classList.push('has-deadline');
        if (confs.length > 1) classList.push('has-multiple');
        if (isCurrentDay) classList.push('today');
        
        dayCell.className = classList.join(' ');
        dayCell.textContent = day;

        if (confs.length > 0) {
            const tooltip = document.createElement('div');
            tooltip.className = 'deadline-tooltip';
            tooltip.addEventListener('click', handleTooltipClick);
            
            // Create a wrapper for the conference links
            const linksWrapper = document.createElement('div');
            linksWrapper.className = 'deadline-links';
            
            confs.forEach(conf => {
                const link = document.createElement('a');
                link.href = conf.url;
                link.target = '_blank';
                link.className = 'deadline-link';
                link.textContent = conf.name;
                linksWrapper.appendChild(link);
            });
            
            tooltip.appendChild(linksWrapper);

            if (confs.length > 1) {
                const count = document.createElement('div');
                count.className = 'deadline-count';
                count.textContent = `${confs.length} deadlines on this date`;
                tooltip.appendChild(count);
            }

            dayCell.appendChild(tooltip);
            
            // Add click event handler
            dayCell.addEventListener('click', (event) => {
                event.stopPropagation();
                closeAllTooltips();
                tooltip.classList.add('active');
            });
        }

        calendar.appendChild(dayCell);
    }

    monthCard.appendChild(monthHeader);
    monthCard.appendChild(calendar);
    return monthCard;
}

function initializeCalendar() {
    const grid = document.getElementById('calendarGrid');
    const { startYear, startMonth, currentYear, currentMonth } = getCurrentMonthInfo();

    let year = startYear;
    let month = startMonth;

    for (let i = 0; i < 12; i++) {
        if (month > 11) {
            month = 0;
            year++;
        }

        const isCurrentMonth = year === currentYear && month === currentMonth;
        grid.appendChild(createMonthCard(year, month, isCurrentMonth));
        month++;
    }

    // Add click event listener to document to close tooltips when clicking outside
    document.addEventListener('click', closeAllTooltips);
}

// Initialize the calendar when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCalendar);
