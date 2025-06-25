"use strict";

const itemData = {
    item1: {
        name: 'Finalista 01',
        image: 'https://picsum.photos/seed/animal/250/200',
        photographer: 'John Doe',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        score: 42
    },
    item2: {
        name: 'Finalista 2',
        image: 'https://picsum.photos/seed/beach/250/200',
        photographer: 'Jane Smith',
        description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        score: 84
    },
    item3: {
        name: 'Finalista 3',
        image: 'https://picsum.photos/seed/mountain/250/200',
        photographer: 'Alice Johnson',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        score: 36
    }
};

// --- DOM Elements ---
const itemsSelect = document.getElementById('items');
const displayImage = document.getElementById('displayImage');
const photographerInput = document.getElementById('photographer');
const descriptionInput = document.getElementById('description');
const scoreInput = document.getElementById('score');
const increaseScoreBtn = document.getElementById('increaseScore');
const decreaseScoreBtn = document.getElementById('decreaseScore');

let currentSelectedItem = null; // To keep track of the currently selected item's data

// --- Functions ---

/**
 * Populates the select dropdown with items from itemData.
 */
function populateItemsSelect() {
    if (itemsSelect) {
        // Clear any existing options, except the default "Seleccione un valor"
        // (optional, if you're sure it's always clean or want to re-populate)
        // itemsSelect.innerHTML = '<option value="-1" disabled selected>Seleccione un valor</option>';

        for (const itemId in itemData) {
            if (itemData.hasOwnProperty(itemId)) {
                const item = itemData[itemId];
                const option = document.createElement('option');
                option.value = itemId;
                option.textContent = item.name;
                itemsSelect.appendChild(option);
            }
        }
    } else {
        console.error("Error: Elemento <select> con ID 'items' no encontrado.");
    }
}

/**
 * Updates the display fields (image, photographer, description, score)
 * based on the selected item.
 * @param {string} itemId - The ID of the item to display (e.g., 'item1').
 */
function updateDisplay(itemId) {
    const item = itemData[itemId];

    if (item) {
        currentSelectedItem = item; // Store the reference to the current item

        if (displayImage) displayImage.src = item.image;
        if (photographerInput) photographerInput.value = item.photographer;
        if (descriptionInput) descriptionInput.value = item.description;
        if (scoreInput) scoreInput.value = item.score; // Display the current score
    } else {
        // If no item is selected or an invalid ID is passed, clear fields
        currentSelectedItem = null;
        if (displayImage) displayImage.src = "https://picsum.photos/seed/jungle/250/250"; // Default image
        if (photographerInput) photographerInput.value = "";
        if (descriptionInput) descriptionInput.value = "";
        if (scoreInput) scoreInput.value = "0";
    }
}

/**
 * Handles the change event on the select dropdown.
 */
function handleSelectChange() {
    const selectedItemId = itemsSelect.value;
    if (selectedItemId !== "-1") { // Ignore the disabled default option
        updateDisplay(selectedItemId);
    } else {
        // If "Seleccione un valor" is re-selected, clear the display
        updateDisplay(null);
    }
}

/**
 * Increases the score of the currently selected item.
 */
function increaseScore() {
    if (currentSelectedItem) {
        currentSelectedItem.score++;
        if (scoreInput) scoreInput.value = currentSelectedItem.score;
        console.log(`Score for ${currentSelectedItem.name} increased to: ${currentSelectedItem.score}`);
    } else {
        console.warn("No item selected to increase score.");
    }
}

/**
 * Decreases the score of the currently selected item.
 */
function decreaseScore() {
    if (currentSelectedItem) {
        currentSelectedItem.score--;
        if (scoreInput) scoreInput.value = currentSelectedItem.score;
        console.log(`Score for ${currentSelectedItem.name} decreased to: ${currentSelectedItem.score}`);
    } else {
        console.warn("No item selected to decrease score.");
    }
}

// --- Event Listeners ---

// Listen for changes on the select dropdown
if (itemsSelect) {
    itemsSelect.addEventListener('change', handleSelectChange);
}

// Listen for clicks on the score buttons
if (increaseScoreBtn) {
    increaseScoreBtn.addEventListener('click', increaseScore);
}
if (decreaseScoreBtn) {
    decreaseScoreBtn.addEventListener('click', decreaseScore);
}

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    populateItemsSelect();
    // Optionally, you can automatically select and display the first item
    // if (itemsSelect.options.length > 1) { // Check if there are actual items besides the default
    //     itemsSelect.value = Object.keys(itemData)[0]; // Set the value to the first item's ID
    //     updateDisplay(itemsSelect.value); // Update display for the first item
    // }
});