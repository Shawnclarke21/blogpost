const loginformhandler = async (event) => {
    event.preventDefault();
   
    const name = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();

    if (name && password) {
        const response = await fetch('api/user/login', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("Check your Username or Password");
        }
    }
};


document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        loginformhandler(event);
    }
});



document.querySelector('#loginSubmit').addEventListener('click', loginformhandler);
