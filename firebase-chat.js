import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// TODO: Replace the following with your app's Firebase project configuration
// See instructions in firebase-vercel-instructions.md
const firebaseConfig = {
    apiKey: "AIzaSyCLwzAq9_mzcLtpQwdpRgdDK5KN8kUB4v8",
    authDomain: "tspazz-site.firebaseapp.com",
    databaseURL: "https://tspazz-site-default-rtdb.firebaseio.com",
    projectId: "tspazz-site",
    storageBucket: "tspazz-site.firebasestorage.app",
    messagingSenderId: "325381494010",
    appId: "1:325381494010:web:53348938df24b0fb5f2543"
};

const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatName = document.getElementById('chat-name');
const chatInput = document.getElementById('chat-input');

// Initialize Firebase
let app, db, messagesRef;
try {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    messagesRef = ref(db, 'messages');
    chatMessages.innerHTML = ''; // Clear loading text
    
    // Listen for new messages
    onChildAdded(messagesRef, (data) => {
        const messageData = data.val();
        renderMessage(messageData.name, messageData.text);
    });
} catch (e) {
    console.error("Firebase Initialization Error:", e);
    chatMessages.innerHTML = `
        <div class="chat-message" style="margin: auto; background: var(--primary); opacity: 0.9;">
            <p style="font-weight: bold; margin-bottom: 0.5rem;">Connection Error</p>
            <p>Could not connect to Firebase. Check console for details.</p>
        </div>
    `;
}

function renderMessage(name, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message');

    // Protect against XSS
    const nameEl = document.createElement('div');
    nameEl.classList.add('chat-message-name');
    nameEl.textContent = name;

    const textEl = document.createElement('div');
    textEl.textContent = text;

    msgDiv.appendChild(nameEl);
    msgDiv.appendChild(textEl);

    chatMessages.appendChild(msgDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = chatName.value.trim();
    const text = chatInput.value.trim();

    if (name && text) {
        // Push to Firebase
        push(messagesRef, {
            name: name,
            text: text,
            timestamp: serverTimestamp()
        });
        chatInput.value = '';
    }
});
