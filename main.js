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
    auth.signInWithRedirect(provider);
});

// Handle the redirect result
auth.getRedirectResult().then((result) => {
    if (result.user) {
        console.log("Logged in via redirect:", result.user);
    }
}).catch((error) => {
    console.error("Error during sign in with redirect:", error);
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
        loadMessages();
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
        const timestamp = new Date().toLocaleString();
        const userId = auth.currentUser.uid;
        messagesRef.push({
            user: auth.currentUser.displayName,
            userId: userId,
            message: message,
            timestamp: timestamp
        });
        document.getElementById('messageInput').value = '';
    }
});

// Display messages with delete button
messagesRef.on('child_added', (snapshot) => {
    const messageData = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = `${messageData.user} (${messageData.timestamp}): ${messageData.message}`;
    
    // 如果消息发送者是当前用户，添加删除按钮
    if (messageData.userId === auth.currentUser.uid) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteMessage(snapshot.key);
        });
        messageElement.appendChild(deleteButton);
    }
    
    document.getElementById('messages').appendChild(messageElement);
});

// Delete message function
function deleteMessage(messageId) {
    messagesRef.child(messageId).once('value', (snapshot) => {
        const messageData = snapshot.val();
        if (messageData.userId === auth.currentUser.uid) {
            messagesRef.child(messageId).remove()
                .then(() => {
                    console.log('Message deleted successfully');
                    // Reload messages
                    loadMessages();
                })
                .catch((error) => {
                    console.error('Error deleting message:', error);
                });
        } else {
            console.error('You can only delete your own messages');
        }
    });
}

// Load messages
function loadMessages() {
    document.getElementById('messages').innerHTML = ''; // Clear messages
    messagesRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const messageData = childSnapshot.val();
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.textContent = `${messageData.user} (${messageData.timestamp}): ${messageData.message}`;
            
            // 如果消息发送者是当前用户，添加删除按钮
            if (messageData.userId === auth.currentUser.uid) {
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    deleteMessage(childSnapshot.key);
                });
                messageElement.appendChild(deleteButton);
            }
            
            document.getElementById('messages').appendChild(messageElement);
        });
    });
}

// Initial load messages
loadMessages();
