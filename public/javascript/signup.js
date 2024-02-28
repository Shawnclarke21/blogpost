

const signupformhandler = async (event) => {
    event.preventDefault();
    
    const email = document.querySelector('#createEmail').value.trim();
    const username = document.querySelector('#createName').value.trim();
    const password = document.querySelector('#createPassword').value.trim();
    
    if (email && username && password) {
        const response = await fetch('/api/user/', {
            method: 'POST',
            body: JSON.stringify({ email, username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.status);
        }
    }
};

document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        signupformhandler(event);
    }
});

document.querySelector('#signupSubmit').addEventListener('click', signupformhandler);