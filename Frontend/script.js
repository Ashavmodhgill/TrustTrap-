 
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
    
    // ── Load shopkeeper data from registration form (or use demo data) ──
    function loadShopData() {
        const saved = JSON.parse(localStorage.getItem('shopData') || '{}');
        const shopName  = saved.shopName  || 'AshavDeep Gill\'s Electronics Hub';
        const ownerName = saved.ownerName || 'AshavDeep Gill';
        const email     = saved.email     || 'AshavDeepGill213@shop.com';
        const phone     = saved.phone     || '+91 98765 43210';
        const address   = saved.address   || 'Shop No. 14, Main Market, Tran Taran, Punjab';

        // Profile header
        document.getElementById('dispShopName').textContent = shopName;
        document.getElementById('dispOwner').textContent = ownerName;

        // Sidebar
        document.getElementById('siShopName').textContent = shopName;
        document.getElementById('siOwner').textContent = ownerName;
        document.getElementById('siEmail').textContent = email;
        document.getElementById('siPhone').textContent = phone;
        document.getElementById('siAddress').textContent = address;

        // Avatar initials
        const parts = ownerName.split(' ');
        const initials = parts.map(p => p[0]).join('').toUpperCase().slice(0,2);
        document.getElementById('avatarInitials').textContent = initials;

        // City tag
        const city = address.split(',').slice(-2).join(',').trim();
        document.getElementById('dispCity').textContent = city || address;
    }

    loadShopData();
    loadProducts();

    // ── AVATAR CHANGE ──
    function changeAvatar(input) {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            const img = document.getElementById('avatarImg');
            img.src = e.target.result;
            img.style.display = 'block';
            document.getElementById('avatarInitials').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    // ── SCROLL TO UPLOAD ──
    function scrollToUpload() {
        document.getElementById('uploadSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ── STEPS ──
    let currentStep = 1;
    const totalSteps = 4;

    function goStep(n) {
        // Mark done steps
        for (let i = 1; i <= totalSteps; i++) {
            const tab = document.getElementById('step' + i + 'tab');
            const panel = document.getElementById('panel' + i);
            tab.classList.remove('active', 'done');
            panel.classList.remove('active');
            if (i < n) tab.classList.add('done');
        }
        document.getElementById('step' + n + 'tab').classList.add('active');
        document.getElementById('panel' + n).classList.add('active');
        currentStep = n;
    }

    // ── CHAR COUNT ──
    function updateCount(inputId, countId, max) {
        const val = document.getElementById(inputId).value.length;
        document.getElementById(countId).textContent = val + '/' + max;
    }

    // ── CONDITION SELECT ──
    let selectedCondition = 'New';
    function selectCond(btn, val) {
        document.querySelectorAll('.cond-opt').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedCondition = val;
    }

    // ── TAGS ──
    let tags = [];
    function addTag(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const input = document.getElementById('tagInput');
        const val = input.value.trim();
        if (!val || tags.includes(val)) { input.value = ''; return; }
        tags.push(val);
        input.value = '';
        renderTags();
    }

    function removeTag(tag) {
        tags = tags.filter(t => t !== tag);
        renderTags();
    }

    function renderTags() {
        const wrap = document.getElementById('tagsWrap');
        const input = document.getElementById('tagInput');
        // remove old pills
        wrap.querySelectorAll('.tag-pill').forEach(p => p.remove());
        tags.forEach(tag => {
            const pill = document.createElement('span');
            pill.className = 'tag-pill';
            pill.innerHTML = `${tag}<button onclick="removeTag('${tag}')"><i class="fa-solid fa-xmark"></i></button>`;
            wrap.insertBefore(pill, input);
        });
    }

    // ── IMAGES ──
    let uploadedImgs = [];

    function handleImgs(files) {
        const space = 8 - uploadedImgs.length;
        Array.from(files).slice(0, space).forEach(file => {
            if (!file.type.startsWith('image/')) return;
            if (file.size > 5 * 1024 * 1024) { showToast('⚠️ ' + file.name + ' over 5MB'); return; }
            uploadedImgs.push(file);
        });
        renderImgs();
    }

    function renderImgs() {
        const grid = document.getElementById('imgGrid');
        grid.innerHTML = '';
        uploadedImgs.forEach((file, i) => {
            const reader = new FileReader();
            reader.onload = e => {
                const item = document.createElement('div');
                item.className = 'img-thumb';
                item.innerHTML = `
                    <img src="${e.target.result}" alt="">
                    ${i === 0 ? '<span class="cover-badge">Cover</span>' : ''}
                    <button class="rm" onclick="removeImg(${i})"><i class="fa-solid fa-xmark"></i></button>`;
                grid.appendChild(item);
            };
            reader.readAsDataURL(file);
        });
    }

    function removeImg(i) { uploadedImgs.splice(i, 1); renderImgs(); }

    function dzOver(e) { e.preventDefault(); document.getElementById('imgZone').classList.add('drag'); }
    function dzLeave(e) { document.getElementById('imgZone').classList.remove('drag'); }
    function dzDrop(e) {
        e.preventDefault();
        document.getElementById('imgZone').classList.remove('drag');
        handleImgs(e.dataTransfer.files);
    }

      
    // ── PUBLISH PRODUCT ──
    let products = [];

    function publishProduct() {
        const name  = document.getElementById('pName').value.trim();
        const cat   = document.getElementById('pCat').value;
        const price = document.getElementById('pPrice').value;
        const desc  = document.getElementById('pDesc').value.trim();

        if (!name)           { showToast('⚠️ Enter a product name'); goStep(1); return; }
        if (!cat)            { showToast('⚠️ Select a category'); goStep(1); return; }
        if (!price || +price <= 0) { showToast('⚠️ Enter a valid price'); goStep(1); return; }
        if (desc.length < 10) { showToast('⚠️ Add a product description'); goStep(1); return; }
        if (uploadedImgs.length === 0) { showToast('⚠️ Upload at least one image'); goStep(3); return; }

        const reader = new FileReader();
        reader.onload = e => {
            const product = {
                id: Date.now(),
                name, cat, price,
                discount: document.getElementById('pDiscount').value,
                brand: document.getElementById('pBrand').value,
                desc,
                condition: selectedCondition,
                coverImg: e.target.result,
                status: 'pending'
            };

            products.unshift(product);
            saveProducts();
            renderProducts();
            showToast('✅ Product published! Live within 24h.');
            resetForm();
            setTimeout(() => {
                document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
            }, 600);
        };

        reader.readAsDataURL(uploadedImgs[0]);
    }

    function resetForm() {
        ['pName','pPrice','pDiscount','pBrand','pDesc','pModel','pStock','pSpec1','pSpec2','pSpec3','pSpec4','pSpec5','pSpec6','pVideo','pNotes'].forEach(id => {
            document.getElementById(id).value = '';
        });
        document.getElementById('pCat').value = '';
        tags = []; renderTags();
        uploadedImgs = []; renderImgs();
        selectedCondition = 'New';
        document.querySelectorAll('.cond-opt').forEach((b,i) => b.classList.toggle('selected', i===0));
        goStep(1);
    }

    // ── PERSIST PRODUCTS ──
    function saveProducts() {
        try { localStorage.setItem('ttProducts', JSON.stringify(products)); } catch(e) {}
    }

    function loadProducts() {
        try { products = JSON.parse(localStorage.getItem('ttProducts') || '[]'); } catch(e) { products = []; }
        renderProducts();
    }

    const EMOJIS = { 'Smartphones':'📱','Laptops':'💻','Accessories':'🎧','Earphones & Headphones':'🎧','Smartwatches':'⌚','Tablets':'📟','Cameras':'📷','Smart TVs':'📺','Gaming':'🎮','Other Electronics':'🔌' };

    function renderProducts() {
        const grid = document.getElementById('productGrid');
        const empty = document.getElementById('emptyMsg');
        document.getElementById('statProducts').textContent = products.length;

        if (products.length === 0) {
            grid.innerHTML = '';
            grid.appendChild(empty);
            empty.style.display = 'block';
            return;
        }

        empty.style.display = 'none';
        grid.innerHTML = '';

        products.forEach(p => {
            const card = document.createElement('div');
            card.className = 'prod-card';
            const emoji = EMOJIS[p.cat] || '📦';
            const discounted = p.discount && +p.discount < +p.price;
            card.innerHTML = `
                <div class="prod-img" style="${p.coverImg ? `background-image:url('${p.coverImg}');background-size:cover;background-position:center;` : ''}">
                    ${!p.coverImg ? emoji : ''}
                    <span class="prod-status ${p.status}">${p.status === 'pending' ? '⏳ Pending' : '✅ Live'}</span>
                </div>
                <div class="prod-body">
                    <div class="prod-name">${p.name}</div>
                    <div class="prod-price">₹${Number(p.price).toLocaleString('en-IN')}${discounted ? ` <span style="font-size:0.7rem;color:var(--text-muted);text-decoration:line-through;font-weight:400">₹${Number(p.price).toLocaleString('en-IN')}</span>` : ''}</div>
                    <div class="prod-cat">${p.cat} · ${p.condition}</div>
                </div>`;
            grid.appendChild(card);
        });
    }

    // ── TOAST ──
    function showToast(msg) {
        document.getElementById('toastMsg').textContent = msg;
        const t = document.getElementById('toast');
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3200);
    }
