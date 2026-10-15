(() => {
  const buttons = [...document.querySelectorAll('[data-photo]')];
  const dialog = document.getElementById('lightbox');
  if (!dialog || !buttons.length) return;
  const image = document.getElementById('lightbox-image');
  const title = document.getElementById('lightbox-title');
  const caption = document.getElementById('lightbox-description');
  const count = document.getElementById('photo-count');
  const closeButton = document.getElementById('close-photo');
  let activeIndex = 0;
  let opener = null;
  function showPhoto(index) {
    activeIndex = (index + buttons.length) % buttons.length;
    const button = buttons[activeIndex];
    image.src = button.dataset.photo;
    image.alt = button.querySelector('img').alt;
    title.textContent = button.dataset.title;
    caption.textContent = button.dataset.caption;
    count.textContent = `${activeIndex + 1} / ${buttons.length}`;
  }
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    opener = button;
    showPhoto(index);
    dialog.showModal();
    document.body.classList.add('modal-open');
    closeButton.focus();
  }));
  closeButton.addEventListener('click', () => dialog.close());
  document.getElementById('previous-photo').addEventListener('click', () => showPhoto(activeIndex - 1));
  document.getElementById('next-photo').addEventListener('click', () => showPhoto(activeIndex + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(activeIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(activeIndex + 1); }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    opener?.focus();
  });
})();
