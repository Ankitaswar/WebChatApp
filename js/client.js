const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const username = prompt("Enter your name to join");

socket.emit('new-user-joined', username);

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // page do not reload 
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = '';
});

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left');
});

socket.on('leave', name => {
    append(`${name} left the chat`, 'left');
});




