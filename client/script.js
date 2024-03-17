// Axios Login
const axiosClientLogin = axios.create({
    baseURL: 'http://localhost:8000/api/users/auth'
})

axiosClientLogin.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

axiosClientLogin.interceptors.response.use((response) => {
    return response
}, (error) => {

    try {
        const { response } = error
        if(response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN')
        } 
    } catch (error) {
        console.log(error);
    }

    throw error
})


// Axios Todos
const axiosClientTodos = axios.create({
    baseURL: 'http://localhost:8000/api/todo'
})

axiosClientTodos.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

// Elements
const loginBtn = document.getElementById('login')
const logoutBtn = document.getElementById('logout')
const todosBtn = document.getElementById('getTodos')
let todosContainer = document.getElementById('todos-container')


// Login Function
const handleLogin = async () => {
    try {
        let emailValue = document.getElementById('email').value
        let passwordValue = document.getElementById('password').value
        const { data } = await axiosClientLogin.post('/login', {
            email: emailValue,
            password: passwordValue
        });
        console.log(data);
        localStorage.setItem('ACCESS_TOKEN', data.token);
        emailValue = ''
        passwordValue = ''
        location.reload()
       
    } catch (error) {
        console.error(error);
    }
};


// Logout Function
const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN')
    location.reload();
}

// Handle Todo Function
const handleTodos = () => {
    axiosClientTodos.get('/all')
    .then(({data}) => {
        let todosHTML = ''
        data.map((elem) => {
            todosHTML += `
            <h2>${elem.name}</h2>
            <p>${elem.body}</p>
            `
        })
        todosContainer.innerHTML = todosHTML;
    })
    .catch((error) => {
        console.error('Error fetching todos:', error);
    });
}

// Login
loginBtn.addEventListener('click', handleLogin)

// Logout
logoutBtn.addEventListener('click', handleLogout)

// Request All Todos
todosBtn.addEventListener('click', handleTodos)