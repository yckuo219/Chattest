// Firebase 初始化
firebase.initializeApp(firebaseConfig);

// 获取 DOM 元素
const loginBox = document.querySelector('.login-box');
const logoutBox = document.querySelector('.logout-box');
const userName = document.getElementById('userName');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

// 监听登录按钮点击事件
loginBtn.addEventListener('click', async () => {
  try {
    // 使用 Google 身份验证提供程序进行登录
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  } catch (error) {
    console.error(error.message);
  }
});

// 监听登出按钮点击事件
logoutBtn.addEventListener('click', async () => {
  try {
    // 登出用户
    await firebase.auth().signOut();
  } catch (error) {
    console.error(error.message);
  }
});

// 监听发送按钮点击事件
sendBtn.addEventListener('click', async () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    try {
      // 向数据库中添加消息
      await firebase.database().ref('messages').push({
        text: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
      // 清空输入框
      messageInput.value = '';
    } catch (error) {
      console.error(error.message);
    }
  }
});

// 监听认证状态变化事件
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // 用户已登录
    loginBox.style.display = 'none';
    logoutBox.style.display = 'block';
    userName.textContent = user.displayName;
  } else {
    // 用户未登录
    loginBox.style.display = 'block';
    logoutBox.style.display = 'none';
    userName.textContent = '';
  }
});

// 添加数据库监听器，实时接收新消息
firebase.database().ref('messages').on('child_added', (snapshot) => {
  const message = snapshot.val();
  const messageElement = document.createElement('div');
  messageElement.textContent = `${message.text} (from ${message.sender})`;
  messagesContainer.appendChild(messageElement);
});

// Three.js 初始化
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// 调整渲染器大小以适应窗口大小变化
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
