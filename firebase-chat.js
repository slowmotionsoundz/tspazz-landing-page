import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// TODO: Replace the following with your app's Firebase project configuration
// See instructions in firebase-vercel-instructions.md
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Placeholder mode for visual testing until configured
const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatName = document.getElementById('chat-name');
const chatInput = document.getElementById('chat-input');

// Initialize Firebase if configured
let app, db, messagesRef;
if (isConfigured) {
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
    }
} else {
    // Show offline placeholder UI immediately if not configured
    setTimeout(() => {
        chatMessages.innerHTML = `
            <div class="chat-message" style="margin: auto; background: var(--primary); opacity: 0.9;">
                <p style="font-weight: bold; margin-bottom: 0.5rem;">System Notice</p>
                <p>Firebase is not yet configured. The form below will simulate a local chat, but will not be saved or broadcast to other users.</p>
            </div>
            <div class="chat-message">
                <div class="chat-message-name">TSpazzFan99</div>
                <div>Yoo the new music video is insane 🔥🔥</div>
            </div>
            <div class="chat-message">
                <div class="chat-message-name">MusicMan23</div>
                <div>Waiting on tour dates!</div>
            </div>
        `;
    }, 1000);
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
        if (isConfigured) {
            // Push to Firebase
            push(messagesRef, {
                name: name,
                text: text,
                timestamp: serverTimestamp()
            });
        } else {
            // UI simulation fallback
            renderMessage(name, text);
        }
        chatInput.value = '';
    }
});
