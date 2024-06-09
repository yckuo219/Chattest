<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Chat Application</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .chat-box { width: 300px; margin: 20px auto; }
        .message { border-bottom: 1px solid #ccc; padding: 5px 0; }
        .login-box, .logout-box, .chat-input-box { display: none; }
    </style>
</head>
<body>
    <div class="chat-box">
        <h1>Chat Application</h1>
        <div class="login-box">
            <button id="loginBtn">Login with Google</button>
        </div>
        <div class="logout-box">
            <p>Welcome, <span id="userName"></span>!</p>
            <button id="logoutBtn">Logout</button>
        </div>
        <div id="messages"></div>
        <div class="chat-input-box">
            <input type="text" id="messageInput" placeholder="Type a message">
            <button id="sendBtn">Send</button>
        </div>
    </div>

    <!-- Firebase JS SDK -->
    <script type="module" src="config.js"></script>
    <script type="module" src="main.js"></script>
</body>
</html>
