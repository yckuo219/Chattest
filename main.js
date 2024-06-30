// Initialize Auth and Database
const auth = firebase.auth();
const database = firebase.database();

// Function to display messages
function displayMessage(message) {
  const messagesDiv = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = `${message.user}: ${message.text}`;
  messagesDiv.appendChild(messageElement);
}

// Add real-time listener for messages
database.ref('messages').on('child_added', function(snapshot) {
  const message = snapshot.val();
  displayMessage(message);
});

// Function to send a message
document.getElementById('sendBtn').addEventListener('click', function() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;
  const user = firebase.auth().currentUser.displayName;
  database.ref('messages').push({
    user: user,
    text: message
  });
  messageInput.value = '';
});

// Login and Logout functionality
document.getElementById('loginBtn').addEventListener('click', function() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
});

document.getElementById('logoutBtn').addEventListener('click', function() {
  firebase.auth().signOut();
});

// Auth state listener
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('userName').textContent = user.displayName;
    document.querySelector('.login-box').style.display = 'none';
    document.querySelector('.logout-box').style.display = 'block';
    document.querySelector('.chat-input-box').style.display = 'block';
  } else {
    document.querySelector('.login-box').style.display = 'block';
    document.querySelector('.logout-box').style.display = 'none';
    document.querySelector('.chat-input-box').style.display = 'none';
  }
});
