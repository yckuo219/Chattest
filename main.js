// Authentication elements
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');
const loginBox = document.querySelector('.login-box');
const logoutBox = document.querySelector('.logout-box');
const chatInputBox = document.querySelector('.chat-input-box');

// Firebase Auth and Database references
const auth = firebase.auth();
const database = firebase.database();
const messagesRef = database.ref('messages');

// Sign in with Google
loginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
});

// Sign out
logoutBtn.addEventListener('click', () => {
    auth.signOut();
});

// Auth state changes
auth.onAuthStateChanged(user => {
    if (user) {
        loginBox.style.display = 'none';
        logoutBox.style.display = 'block';
        chatInputBox.style.display = 'block';
        userName.textContent = user.displayName;
    } else {
        loginBox.style.display = 'block';
        logoutBox.style.display = 'none';
        chatInputBox.style.display = 'none';
        userName.textContent = '';
    }
});

// Send message
document.getElementById('sendBtn').addEventListener('click', () => {
    const message = document.getElementById('messageInput').value;
    if (message) {
        messagesRef.push({
            user: auth.currentUser.displayName,
            message: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        document.getElementById('messageInput').value = '';
    }
});

// Display messages
messagesRef.on('child_added', (snapshot) => {
    const messageData = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = `${messageData.user}: ${messageData.message}`;
    document.getElementById('messages').appendChild(messageElement);
});
