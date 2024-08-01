// Initial data array
const data = [
    { id: 1, label: 2, location: "Dolomitization unit", status: 2 },
    { id: 2, label: 1, location: "Pelletizing unit", status: 1 },
    { id: 3, label: 0, location: "Restroom", status: 2 },
];

// Possible values for location
const locations = [
    "Dolomitization unit",
    "Pelletizing unit",
    "Restroom",
    "Control room",
    "Maintenance area",
    "Storage",
    "Office",
    "Lab",
    "Parking lot",
    "Cafeteria"
];

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Adding 100 random objects to the data array
for (let i = 0; i < 200; i++) {
    const newObject = {
        id: data.length + 1 + i,
        label: getRandomInt(0, 2),
        location: locations[getRandomInt(0, locations.length - 1)],
        status: getRandomInt(1, 2),
    };
    data.push(newObject);
}

export default data