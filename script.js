// Navigation, portfolio links and contact options work without JavaScript.
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Instagram inserts its own frames asynchronously; give each a descriptive name.
const portfolio = document.querySelector('.portfolio');
if (portfolio) {
  const labelFrames = () => {
    const frames = portfolio.querySelectorAll('iframe');
    frames.forEach((frame) => {
      const caption = frame.closest('figure').querySelector('h3').textContent;
      frame.title = caption + ' on Instagram';
    });
    return frames.length;
  };
  const observer = new MutationObserver(() => {
    if (labelFrames() === 3) observer.disconnect();
  });
  observer.observe(portfolio, { childList: true, subtree: true });
  if (labelFrames() === 3) observer.disconnect();
}
