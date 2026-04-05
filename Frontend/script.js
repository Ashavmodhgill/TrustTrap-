 
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

if (registerBtn && loginBtn) {
  registerBtn.addEventListener('click', () => {
    container.classList.add("active");
  });
  loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
  });
} 
const slider = document.getElementById('slider');

if (slider) {
  const cards = document.querySelectorAll('.card');
  const totalCards = cards.length;
  let index = 1;

  function showSlide(i) {
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${i * 100}%)`;
  }

  setInterval(() => {
    index++;
    showSlide(index);
    if (index === totalCards - 1) {
      setTimeout(() => {
        slider.style.transition = "none";
        index = 1;
        slider.style.transform = `translateX(-${index * 100}%)`;
      }, 500);
    }
  }, 4000);

  document.querySelector('.prev').addEventListener('click', () => {
    index--;
    if (index < 0) index = totalCards - 2;
    showSlide(index);
  });

  document.querySelector('.next').addEventListener('click', () => {
    index++;
    showSlide(index);
    if (index === totalCards - 1) {
      setTimeout(() => {
        slider.style.transition = "none";
        index = 1;
        slider.style.transform = `translateX(-${index * 100}%)`;
      }, 500);
    }
  });
}

const SYSTEM_PROMPT = `You are TrustTrap's AI Shopping Assistant — a helpful, friendly product advisor for Indian consumers. 
Your job is to help users find the best electronics products (phones, laptops, earphones, TVs, accessories, etc.) within their budget.

Rules:
- Always respond in a warm, helpful, conversational tone
- Suggest 2-4 specific product recommendations with realistic Indian market prices in ₹
- Mention key specs briefly for each product
- Always mention why each product is good value
- Ask follow-up questions to understand the user's needs better if needed
- Keep responses concise but informative
- Use relevant emojis to make responses friendly
- If the user mentions a budget, strictly recommend products within that budget
- Format product suggestions clearly with name, price, and 1-2 key highlights`;

let chatHistory = [];
let isLoading = false;

function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

function hideWelcome() {
    const welcome = document.getElementById('welcome');
    if (welcome) welcome.remove();
}

function addMessage(role, content) {
    hideWelcome();
    const messages = document.getElementById('messages');

    const msg = document.createElement('div');
    msg.className = `msg ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.innerHTML = role === 'bot'
        ? '<i class="fa-solid fa-wand-magic-sparkles"></i>'
        : '<i class="fa-solid fa-user"></i>';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = formatMessage(content);

    msg.appendChild(avatar);
    msg.appendChild(bubble);
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function formatMessage(text) {
    // Bold **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Line breaks
    text = text.replace(/\n/g, '<br>');
    return text;
}

function showTyping() {
    hideWelcome();
    const messages = document.getElementById('messages');
    const typing = document.createElement('div');
    typing.className = 'msg bot';
    typing.id = 'typing';
    typing.innerHTML = `
        <div class="msg-avatar"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
        <div class="msg-bubble">
            <div class="typing"><span></span><span></span><span></span></div>
        </div>`;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById('typing');
    if (t) t.remove();
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text || isLoading) return;

    input.value = '';
    input.style.height = 'auto';
    isLoading = true;
    document.getElementById('sendBtn').disabled = true;

    addMessage('user', text);
    chatHistory.push({ role: 'user', content: text });

    showTyping();

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                system: SYSTEM_PROMPT,
                messages: chatHistory
            })
        });

        const data = await response.json();
        const reply = data.content?.map(b => b.text || '').join('') || 'Sorry, I could not get a response. Please try again.';

        removeTyping();
        addMessage('bot', reply);
        chatHistory.push({ role: 'assistant', content: reply });

    } catch (err) {
        removeTyping();
        addMessage('bot', '⚠️ Something went wrong. Please check your connection and try again.');
    }

    isLoading = false;
    document.getElementById('sendBtn').disabled = false;
    document.getElementById('userInput').focus();
}

function sendQuick(text) {
    document.getElementById('userInput').value = text;
    sendMessage();
}

function newChat() {
    chatHistory = [];
    const messages = document.getElementById('messages');
    messages.innerHTML = `
        <div class="welcome" id="welcome">
            <div class="welcome-icon">✦</div>
            <h1>Hi! I'm your AI Shopping Guide</h1>
            <p>Tell me what product you're looking for and your budget — I'll find the best options available on TrustTrap for you.</p>
            <div class="welcome-chips">
                <button class="chip" onclick="sendQuick('Best phone under ₹10,000')">📱 Phone under ₹10K</button>
                <button class="chip" onclick="sendQuick('Laptop for students under ₹40,000')">💻 Student laptop</button>
                <button class="chip" onclick="sendQuick('Best earbuds under ₹3,000')">🎧 Earbuds under ₹3K</button>
                <button class="chip" onclick="sendQuick('Smart TV under ₹20,000')">📺 Smart TV</button>
                <button class="chip" onclick="sendQuick('Gaming accessories under ₹5,000')">🎮 Gaming gear</button>
            </div>
        </div>`;
    closeSidebar();
}

function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('overlay').classList.add('show');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
} 
        /* ── PRODUCT MODAL LOGIC ── */

        var categoryEmoji = {
            'Smartphones': '📱',
            'Laptops': '💻',
            'Accessories': '🎧',
            'Storage': '💾',
        };

        // Wire up all .product cards
        document.querySelectorAll('.product').forEach(function(card) {
            card.addEventListener('click', function(e) {
                // Don't open modal if a button inside the card was clicked
                if (e.target.tagName === 'BUTTON') return;

                openModal({
                    name:        card.dataset.name        || 'Unnamed Product',
                    price:       card.dataset.price       || '—',
                    category:    card.dataset.category    || 'General',
                    description: card.dataset.description || 'No description available.',
                    image:       card.dataset.image       || ''
                });
            });
        });

        function openModal(data) {
            // Populate fields
            document.getElementById('modal-name').textContent     = data.name;
            document.getElementById('modal-price').textContent    = data.price;
            document.getElementById('modal-category').textContent = data.category;
            document.getElementById('modal-desc').textContent     = data.description;

            // Emoji fallback
            var emoji = categoryEmoji[data.category] || '📦';
            document.getElementById('modal-emoji').textContent    = emoji;
            document.getElementById('modal-emoji').style.display  = 'block';

            // Handle pre-set image URL
            var img = document.getElementById('modal-img');
            if (data.image && data.image.trim() !== '') {
                img.src = data.image;
                img.style.display = 'block';
                document.getElementById('modal-emoji').style.display = 'none';
                document.getElementById('modal-url').textContent = data.image;
            } else {
                img.src = '';
                img.style.display = 'none';
                document.getElementById('modal-url').textContent = 'No image uploaded yet';
            }

            // Reset file input
            document.getElementById('file-input').value = '';

            // Show overlay
            document.getElementById('overlay').classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('overlay').classList.remove('open');
            document.body.style.overflow = '';
        }

        // Close on overlay background click
        document.getElementById('overlay').addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeModal();
        });

        // Handle shopkeeper image upload
        function handleImageUpload(e) {
            var file = e.target.files[0];
            if (!file) return;

            var reader = new FileReader();
            reader.onload = function(ev) {
                var src = ev.target.result;
                var img = document.getElementById('modal-img');
                img.src = src;
                img.style.display = 'block';
                document.getElementById('modal-emoji').style.display = 'none';

                // Show filename in URL box (in a real app this would be the server URL after upload)
                var displayName = file.name.length > 48
                    ? file.name.substring(0, 48) + '…'
                    : file.name;
                document.getElementById('modal-url').textContent = 'local: ' + displayName;
            };
            reader.readAsDataURL(file);
        }
    
