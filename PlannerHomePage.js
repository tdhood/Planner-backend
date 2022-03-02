let monthsList = [
    { name: "January", },
    { name: 'February', },
    { name: 'March' },
    { name: 'April' },
    { name: 'May' },
    { name: 'June' },
    { name: 'July' },
    { name: 'August' },
    { name: 'September' },
    { name: 'October' },
    { name: 'November' },
    { name: 'December' },
];

let habitsList = [
    { name: 'Exercise' },
    { name: 'Read' },
];

function showMonths() {

    let monthArea = document.getElementById('monthsList');
    let html = "";

    for (let i = 0; i < monthsList.length; i++) {
        let month = monthsList[i];
        let title = `<p>${month.name}</p>`
        html += `
            <div id="month-${i}">
            ${title}
            </div>`;
    }
    monthArea.innerHTML = html;
}

function showHabits() {

    let habitsArea = document.getElementById('habitsList');
    let html = '';

    for (let i = 0; i < habitsList.length; i++) {
        let habit = habitsList[i];
        let title = `<h3>${habit.name}<h/3>`
        html += `
        <div id="habit-${i}">
        ${title}
        </div>`;
    }
    habitsArea.innerHTML = html;
}

function addHabitToHabitList() {
    let newHabitAdded = document.getElementById('newHabit')
    habitsList.push({ name: newHabitAdded.value })
    showHabits();
}

showMonths();
showHabits();