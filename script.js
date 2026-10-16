// Player information
let health = 50;
let inventory = [];

// Story scenes
const scenes = {

    // Scene 1
    start: {
        title: "Prisoners' Quarters",
        character: "Narrator",
        text: "You wake up in a dark dungeon. You do not remember your past. The air is cold and the walls are broken. You have 50 HP. There are two paths in front of you.",

        choices: [
            {
                text: "Climb to the Promenade",
                next: "promenade"
            },
            {
                text: "Jump into the Toxic Sewers",
                next: "sewers",
                action: function() {
                    updateHealth(-50);
                }
            }
        ]
    },

    // Scene 2
    promenade: {
        title: "Promenade of the Condemned",
        character: "Narrator",
        text: "You walk into a long hallway. An armored guard is standing in front of you. You also see a small path next to the wall. You must choose what to do.",

        choices: [
            {
                text: "Fight the guard",
                next: "fight",
                action: function() {
                    updateHealth(-50);
                }
            },
            {
                text: "Sneak through the side path",
                next: "ramparts",
                action: function() {
                    addItem("Old Key");
                }
            }
        ]
    },

    // Scene 3
    sewers: {
        title: "Toxic Sewers",
        character: "Narrator",
        text: "You jump into the dark sewers. The water is full of poison. You do not have any special protection. You lose 50 HP and cannot survive. GAME OVER!",

        choices: [
            {
                text: "Try Again",
                next: "start",
                action: function() {
                    restartGame();
                }
            }
        ]
    },

    // Scene 4
    fight: {
        title: "Fight the Guard",
        character: "Narrator",
        text: "You fight the armored guard. After a difficult battle, you finally defeat him. But you are badly hurt. You lose 50 HP. GAME OVER!",

        choices: [
            {
                text: "Try Again",
                next: "start",
                action: function() {
                    restartGame();
                }
            }
        ]
    },

    // Scene 5
    ramparts: {
        title: "The Ramparts",
        character: "Narrator",
        text: "You find an old key on the side path and take it. After walking for a long time, you reach the top of a tall wall. You see a locked treasure chest. You wonder what is inside.",

        choices: [
            {
                text: "Open the treasure chest",
                action: openChest
            }
        ]
    },

    // Scene 6
    victory: {
        title: "Victory!",
        character: "Narrator",
        text: "You now have a Warrior Sword and more HP. You feel stronger and ready for new challenges. You continue your adventure. Congratulations! YOU WIN!",

        choices: [
            {
                text: "Play Again",
                next: "start",
                action: function() {
                    restartGame();
                }
            }
        ]
    }
};


// Update the story scene
function updateScene(sceneName) {

    const scene = scenes[sceneName];

    const title = document.getElementById("page-title");
    const character = document.getElementById("page-character");
    const text = document.getElementById("page-text");
    const choices = document.getElementById("choices");

    title.textContent = scene.title;
    character.textContent = scene.character;
    text.textContent = scene.text;

    choices.innerHTML = "";

    scene.choices.forEach(function(choice) {

        const button = document.createElement("button");

        button.textContent = choice.text;

        button.onclick = function() {

            if (choice.action) {
                choice.action();
            }

            if (choice.next) {
                updateScene(choice.next);
            }
        };

        choices.appendChild(button);
    });
}


// Update HP
function updateHealth(amount) {

    health = health + amount;

    if (health < 0) {
        health = 0;
    }

    document.getElementById("health-display").textContent = health;
}


// Add an item to inventory
function addItem(item) {

    if (!inventory.includes(item)) {
        inventory.push(item);
    }

    updateInventory();
}


// Update inventory display
function updateInventory() {

    const display = document.getElementById("inventory-display");

    display.innerHTML = "";

    inventory.forEach(function(item) {

        const li = document.createElement("li");

        li.textContent = item;

        display.appendChild(li);
    });
}


// Conditional: check for the key
function openChest() {

    const message = document.getElementById("message-display");

    if (inventory.includes("Old Key")) {

        addItem("Warrior Sword");

        updateHealth(20);

        message.textContent = "You opened the chest! You found a Warrior Sword and gained 20 HP.";

        // Change the choice to continue
        const choices = document.getElementById("choices");

        choices.innerHTML = "";

        const button = document.createElement("button");

        button.textContent = "Continue";

        button.onclick = function() {
            updateScene("victory");
        };

        choices.appendChild(button);

    } else {

        message.textContent = "The chest is locked. You need a key.";

    }
}


// Restart game
function restartGame() {

    health = 50;
    inventory = [];

    document.getElementById("health-display").textContent = health;
    document.getElementById("message-display").textContent = "";

    updateInventory();

    updateScene("start");
}


// Start the game
updateScene("start");