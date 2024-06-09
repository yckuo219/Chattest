const auth = firebase.auth();
const database = firebase.database();

const loginBox = document.querySelector('.login-box');
const logoutBox = document.querySelector('.logout-box');
const chatInputBox = document.querySelector('.chat-input-box');
const userName = document.getElementById('userName');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Login function
loginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
});

// Logout function
logoutBtn.addEventListener('click', () => {
    auth.signOut();
});

// Auth state observer
auth.onAuthStateChanged(user => {
    if (user) {
        loginBox.style.display = 'none';
        logoutBox.style.display = 'block';
        chatInputBox.style.display = 'block';
        userName.textContent = user.displayName;
        loadMessages();
    } else {
        loginBox.style.display = 'block';
        logoutBox.style.display = 'none';
        chatInputBox.style.display = 'none';
        messagesDiv.innerHTML = '';
    }
});

// Load messages from Firebase
function loadMessages() {
    database.ref('messages/').on('child_added', (snapshot) => {
        const message = snapshot.val();
        displayMessage(message);
    });
}

// Display message in the chat box
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = `${message.user}: ${message.text}`;
    messagesDiv.appendChild(messageElement);
}

// Send message
sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    const user = auth.currentUser;
    if (message && user) {
        const messageObj = {
            text: message,
            user: user.displayName,
            timestamp: Date.now()
        };
        database.ref('messages/').push(messageObj);
        messageInput.value = '';
    }
});
