const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const now = new Date();
const timestamp = $('#timestamp');
const year = $('#year');
if (timestamp) {
  timestamp.textContent = `Dashboard refreshed ${now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
}
if (year) year.textContent = now.getFullYear();

const navToggle = $('.nav-toggle');
const nav = $('#site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach((element) => observer.observe(element));

const fallbackStories = [
  {
    title: 'AI agents are moving from demos to business workflows',
    url: 'https://news.ycombinator.com/',
    source: 'Trend Watch'
  },
  {
    title: 'MCP is becoming a key connector layer for AI tools',
    url: 'https://modelcontextprotocol.io/',
    source: 'MCP Watch'
  },
  {
    title: 'AI infrastructure demand keeps chips and data centers in focus',
    url: 'https://nvidianews.nvidia.com/',
    source: 'Infrastructure'
  }
];

function createNewsCard(story) {
  const source = story.source || story.author || 'Hacker News';
  const url = story.url || `https://news.ycombinator.com/item?id=${story.objectID}`;
  const title = story.title || story.story_title || 'Untitled story';
  const date = story.created_at ? new Date(story.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Latest';
  return `
    <article class="news-card">
      <small>${source} • ${date}</small>
      <h3>${title}</h3>
      <p>Open the story for full context, then add your own XTIANZ take.</p>
      <a class="text-link" href="${url}" target="_blank" rel="noopener">Read story →</a>
    </article>
  `;
}

async function loadNews() {
  const feed = $('#news-feed');
  const status = $('#news-status');
  if (!feed || !status) return;
  status.textContent = 'Loading public AI headlines...';
  const query = encodeURIComponent('AI OR artificial intelligence OR Nvidia OR OpenAI OR Anthropic OR MCP');
  const url = `https://hn.algolia.com/api/v1/search_by_date?query=${query}&tags=story&hitsPerPage=6`;
  try {
    const response = await fetch(url, { headers: { accept: 'application/json' } });
    if (!response.ok) throw new Error('News request failed');
    const data = await response.json();
    const stories = (data.hits || [])
      .filter((item) => item.title && (item.url || item.objectID))
      .slice(0, 6);
    feed.innerHTML = (stories.length ? stories : fallbackStories).map(createNewsCard).join('');
    status.textContent = stories.length ? 'Headlines refreshed' : 'Showing fallback headlines';
  } catch (error) {
    feed.innerHTML = fallbackStories.map(createNewsCard).join('');
    status.textContent = 'Live feed unavailable; showing fallback cards';
  }
}

const refreshButton = $('#refresh-news');
if (refreshButton) refreshButton.addEventListener('click', loadNews);
loadNews();

const signupForm = $('#signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = $('#email')?.value?.trim();
    const message = $('#signup-message');
    if (!message) return;
    if (!email) {
      message.textContent = 'Enter an email address first.';
      return;
    }
    localStorage.setItem('xtianz-demo-email', email);
    message.textContent = 'Demo saved locally. Connect this form to Beehiiv, ConvertKit, Mailchimp, or Formspree to collect real signups.';
    signupForm.reset();
  });
}
