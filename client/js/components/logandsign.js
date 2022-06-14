// Log in as a parent code
let form = document.getElementById('log-in-form')
form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form)
    const data = {
        login: formData.get('login'),
        password: formData.get('password')
    }
    axios.post('/api/session/', data).then((response) => {
        console.log(response);
        window.location = '/'
    }).catch((err) => {
        console.log(err)
        let messageBox = document.getElementById('errors1');
        messageBox.textContent = err.response.data.message
    })
})

// Sign up as a parent code
const signUpButton = document.getElementById('sign-in-form');

signUpButton.addEventListener('submit', (event) => {
    event.preventDefault();
    const signFormData = new FormData(signUpButton)
    const data = {
        family: signFormData.get('familysign'),
        parent: signFormData.get('parentsign'),
        login: signFormData.get('loginsign'),
        pw: signFormData.get('passwordsign'),
        pw2: signFormData.get('passwordsign2')
    }
    if (data.pw == data.pw2 && data.family && data.login && data.parent) {
    console.log(data)
    axios.post('/api/users', data).then((response) => {
        console.log(response)
        if (response.status == 200) {
            let messageBox = document.getElementById('errors2'); 
            messageBox.textContent = "Your account has been made";
            window.location = '/login.html'
        } 
    }).catch((err) => {
        console.log(err)
        let messageBox = document.getElementById('errors2');
        messageBox.textContent = err.response.data.message

    })
    }
})
