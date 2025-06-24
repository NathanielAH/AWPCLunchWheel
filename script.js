let wheel;
let restaurants = [];
let usedRestaurants = [];
let lastPick = null;

function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0,0,0,0);
    return d.toISOString().slice(0,10);
}

function checkWeek() {
    const nowMonday = getMonday(new Date());
    if (localStorage.weekStart !== nowMonday) {
        localStorage.weekStart = nowMonday;
        localStorage.usedRestaurants = JSON.stringify([]);
    }
    usedRestaurants = JSON.parse(localStorage.usedRestaurants || '[]');
}

function updateUsedList() {
    const list = document.getElementById('usedList');
    list.innerHTML = '';
    usedRestaurants.forEach(r => {
        const li = document.createElement('li');
        li.textContent = r;
        list.appendChild(li);
    });
}

function getRandomColor() {
    return `hsl(${Math.random()*360},70%,70%)`;
}

function setupWheel() {
    const segments = restaurants.map(r => ({fillStyle: getRandomColor(), text: r}));
    wheel = new Winwheel({
        canvasId: 'wheelCanvas',
        numSegments: segments.length,
        outerRadius: 220,
        textFontSize: 16,
        segments: segments,
        animation: {
            type: 'spinToStop',
            duration: 5,
            spins: 8,
            callbackFinished: announcePick
        }
    });
}

function loadMenu() {
    fetch('menu.txt').then(r => r.text()).then(text => {
        restaurants = text.split(/\r?\n/).map(t => t.trim()).filter(t => t);
        setupWheel();
        updateUsedList();
    });
}

function spin() {
    if (wheel.animation.spinning) return;
    const available = restaurants.filter(r => !usedRestaurants.includes(r));
    if (available.length === 0) {
        usedRestaurants = [];
        localStorage.usedRestaurants = JSON.stringify([]);
        updateUsedList();
        available.push(...restaurants);
    }
    const choice = available[Math.floor(Math.random()*available.length)];
    lastPick = choice;
    document.getElementById('respinBtn').disabled = false;
    const segmentIndex = restaurants.indexOf(choice) + 1;
    const stopAt = wheel.getRandomForSegment(segmentIndex);
    wheel.animation.stopAngle = stopAt;
    wheel.startAnimation();
}

function announcePick(indicatedSegment) {
    document.getElementById('selectedRestaurant').textContent = indicatedSegment.text;
    usedRestaurants.push(indicatedSegment.text);
    localStorage.usedRestaurants = JSON.stringify(usedRestaurants);
    updateUsedList();
}

function respin() {
    if (!lastPick) return;
    usedRestaurants = usedRestaurants.filter(r => r !== lastPick);
    localStorage.usedRestaurants = JSON.stringify(usedRestaurants);
    updateUsedList();
    lastPick = null;
    spin();
}

document.getElementById('spinBtn').addEventListener('click', spin);
document.getElementById('respinBtn').addEventListener('click', respin);

document.getElementById('currentDay').textContent = new Date().toLocaleDateString(undefined, {weekday:'long'});

checkWeek();
loadMenu();
