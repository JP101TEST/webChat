async function login() {
    try {
        const response = await fetch('http://localhost:8000/loginRegister/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        });

        const result = await response.json();
        console.log(result);
        console.log(result[0]);

        // Loop for log all data in result[0]
        for (const key in result[0]) {
            if (Object.hasOwnProperty.call(result[0], key)) {
                const value = result[0][key];
                console.log(`${key}: ${value}`);
            }
        }

        //return true;
    } catch (error) {
        console.log('Connection failed:', error.message);
    }
}