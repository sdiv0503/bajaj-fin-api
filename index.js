const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        if (!req.body || !('data' in req.body)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid request: The 'data' key is missing from the request body."
            });
        }

        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ 
                is_success: false, 
                error: "Invalid input: 'data' must be an array." 
            });
        }

        const user_id = "divyansh_sharma"; 
        const email = "divyansh.sharma2022b@vitstudent.ac.in";
        const roll_number = "22BIT0080";

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string = "";

        data.forEach(item => {
            const itemStr = String(item);

            if (/^[a-zA-Z]+$/.test(itemStr)) {
                alphabets.push(itemStr.toUpperCase());
                alphabet_string += itemStr;
            } 
            else if (/^-?\d+$/.test(itemStr)) {
                const num = parseInt(itemStr, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(itemStr);
                } else {
                    odd_numbers.push(itemStr);
                }
            } 
            else {
                special_characters.push(itemStr);
            }
        });

        let reversed_alphabets = alphabet_string.split('').reverse().join('');
        
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversed_alphabets[i].toUpperCase();
            } else {
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }

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

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            is_success: false,
            error: `An internal server error occurred: ${error.message}`
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
