// index.js

// 1. Import Express
const express = require('express');

// 2. Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middleware to parse JSON bodies
// This is crucial for reading the 'data' array from the request
app.use(express.json());

// 4. Define the POST endpoint for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        // Extract the 'data' array from the request body
        const { data } = req.body;

        // --- Basic Input Validation ---
        if (!Array.isArray(data)) {
            return res.status(400).json({ 
                is_success: false, 
                error: "Invalid input: 'data' must be an array." 
            });
        }

        // --- Personal Information (as per requirements) ---
        const user_id = "yash_raj_21082002"; // Format: full_name_ddmmyyyy
        const email = "yr0909@srmist.edu.in";
        const roll_number = "RA2011003010909";

        // --- Logic Implementation ---
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string = "";

        // Iterate over the input data array
        data.forEach(item => {
            // Check if the item is a number (as a string)
            if (!isNaN(item) && !/[a-zA-Z]/.test(item)) {
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item.toString());
                } else {
                    odd_numbers.push(item.toString());
                }
            } 
            // Check if the item is an alphabet or a string of alphabets
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabet_string += item;
            } 
            // Otherwise, it's a special character
            else {
                special_characters.push(item);
            }
        });

        // Logic for the concatenated and reversed alternating caps string
        let reversed_alphabets = alphabet_string.split('').reverse().join('');
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if (i % 2 !== 0) { // Odd index (second character, fourth, etc.)
                concat_string += reversed_alphabets[i].toUpperCase();
            } else { // Even index
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }
        // Correction based on example: "ByA" -> first is upper, second lower. Let's adjust.
        // "ayb" -> "bya" -> B y A. Let's re-implement based on example.
        concat_string = "";
         for (let i = 0; i < reversed_alphabets.length; i++) {
            if (i % 2 === 0) { // Even index (0, 2, 4...)
                concat_string += reversed_alphabets[i].toUpperCase();
            } else { // Odd index (1, 3, 5...)
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }


        // --- Construct the final response object ---
        const response = {
            is_success: true,
            user_id,
            email,
            roll_number,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        };

        // Send the successful response
        return res.status(200).json(response);

    } catch (error) {
        // --- Graceful Error Handling ---
        // If anything goes wrong in the try block, this will catch it
        return res.status(500).json({
            is_success: false,
            error: error.message
        });
    }
});

// 5. Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
