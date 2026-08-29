const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');
const messages = document.querySelector('#messages');
const chatList = document.querySelector('#chat-list');
const chatSearch = document.querySelector('#chat-search');
const typingIndicator = document.querySelector('#typing-indicator');
const emojiButton = document.querySelector('#emoji-button');
const emojiPopover = document.querySelector('#emoji-popover');
const themeToggle = document.querySelector('#theme-toggle');
const toast = document.querySelector('#toast');
const sidebar = document.querySelector('#sidebar');
const chatTitle = document.querySelector('#chat-title');
const chatStatus = document.querySelector('#chat-status');

let toastTimeout;
let replyTimeout;

function scrollToLatest() {
  messages.scrollTop = messages.scrollHeight;
}

function getCurrentTime() {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date());
}

function showToast(text) {
  clearTimeout(toastTimeout);
  toast.textContent = text;
  toast.classList.add('show');
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

function createMessage(text, direction = 'outgoing') {
  const article = document.createElement('article');
  article.className = `message ${direction}`;

  if (direction === 'incoming') {
    const avatar = document.createElement('div');
    avatar.className = 'avatar avatar-maya message-avatar';
    avatar.textContent = 'MC';
    article.append(avatar);
  }

  const wrap = document.createElement('div');
  wrap.className = 'bubble-wrap';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  const time = document.createElement('time');
  time.textContent = getCurrentTime();

  if (direction === 'outgoing') {
    const receipt = document.createElement('span');
    receipt.className = 'read-receipt';
    receipt.textContent = ' ✓✓';
    time.append(receipt);
  }

  wrap.append(bubble, time);
  article.append(wrap);
  messages.insertBefore(article, typingIndicator);
  scrollToLatest();
}

function simulateReply() {
  clearTimeout(replyTimeout);
  typingIndicator.hidden = false;
  scrollToLatest();
  replyTimeout = setTimeout(() => {
    typingIndicator.hidden = true;
    createMessage('Got it — that sounds great! I’m looking forward to seeing the update.');
  }, 1400);
}

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text) {
    messageInput.focus();
    return;
  }

  createMessage(text);
  messageInput.value = '';
  emojiPopover.hidden = true;
  simulateReply();
});

emojiButton.addEventListener('click', () => {
  emojiPopover.hidden = !emojiPopover.hidden;
});

emojiPopover.addEventListener('click', (event) => {
  if (event.target.tagName !== 'BUTTON') return;
  messageInput.value += event.target.textContent;
  messageInput.focus();
  emojiPopover.hidden = true;
});

document.querySelector('#attach-file').addEventListener('click', () => {
  showToast('Attachment picker would open here.');
});

document.querySelector('#new-chat').addEventListener('click', () => {
  showToast('New conversation started.');
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  showToast(document.body.classList.contains('dark') ? 'Dark mode enabled' : 'Light mode enabled');
});

chatSearch.addEventListener('input', () => {
  const query = chatSearch.value.trim().toLowerCase();
  document.querySelectorAll('.chat-preview').forEach((chat) => {
    chat.hidden = !chat.textContent.toLowerCase().includes(query);
  });
});

chatList.addEventListener('click', (event) => {
  const chat = event.target.closest('.chat-preview');
  if (!chat) return;

  document.querySelectorAll('.chat-preview').forEach((item) => item.classList.remove('active'));
  chat.classList.add('active');
  chatTitle.textContent = chat.dataset.name;
  chatStatus.innerHTML = chat.dataset.status === 'Online' ? '<i></i> Online' : chat.dataset.status;
  messageInput.placeholder = `Message ${chat.dataset.name.split(' ')[0]}...`;
  sidebar.classList.remove('open');
  showToast(`Opened ${chat.dataset.name}`);
});

document.querySelector('#open-sidebar').addEventListener('click', () => sidebar.classList.add('open'));
document.querySelector('#close-sidebar').addEventListener('click', () => sidebar.classList.remove('open'));

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    chatSearch.focus();
  }
  if (event.key === 'Escape') {
    emojiPopover.hidden = true;
    sidebar.classList.remove('open');
  }
});

scrollToLatest();
