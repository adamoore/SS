document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const entries = {}; // Object to store entries for each date

    function generateCalendar(year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = new Date(year, month, 1).getDay();
        const startingDay = (firstDayOfWeek === 0) ? 6 : firstDayOfWeek - 1; // Adjust for Monday as the first day

        calendarContainer.innerHTML = '';

        // Display month name
        const monthElement = document.createElement('div');
        monthElement.className = 'month';
        monthElement.textContent = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month));
        calendarContainer.appendChild(monthElement);

        // Display days of the week starting from Monday
        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // Adjust the order
        for (let i = 0; i < daysOfWeek.length; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = daysOfWeek[i];
            calendarContainer.appendChild(dayElement);
        }

        // Display days of the month with entries
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${year}-${month + 1}-${day < 10 ? '0' : ''}${day}`;
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = day;

            // Check if there are entries for the current date
            if (entries[dateKey]) {
                const entryList = document.createElement('ul');
                entryList.className = 'entry-list';

                entries[dateKey].forEach(entry => {
                    const entryItem = document.createElement('li');
                    entryItem.textContent = entry;
                    entryList.appendChild(entryItem);
                });

                dayElement.appendChild(entryList);
            }

            // Add event listener to add entry when clicked
            dayElement.addEventListener('click', function() {
                const entry = prompt('Enter your entry:');
                if (entry) {
                    if (!entries[dateKey]) {
                        entries[dateKey] = [];
                    }
                    entries[dateKey].push(entry);
                    generateCalendar(year, month); // Refresh calendar
                }
            });

            if (day > startingDay) {
                calendarContainer.appendChild(dayElement);
            } else {
                calendarContainer.insertBefore(dayElement, calendarContainer.children[7 + startingDay]); // Insert before the first day of the week
            }
        }

        // Move Sunday to the right end of the page
        const sundayIndex = daysOfWeek.indexOf('Sun');
        const sundayElement = calendarContainer.children[sundayIndex + 1];
        sundayElement.style.gridColumn = `span ${7 - sundayIndex}`;
    }

    generateCalendar(currentYear, currentMonth);
});


