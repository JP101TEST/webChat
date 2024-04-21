async function register(data) {
    try {
        const response = await fetch('http://localhost:8000/loginRegister/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);
        return true;
    } catch (error) {
        console.log('Connection failed:', error.message);
    }
}