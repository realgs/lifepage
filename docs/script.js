const sidebarButton = document.querySelector('.nav__button');
const sidebar = document.querySelector('.sidebar');
const backdrop = document.querySelector('.backdrop');

sidebarButton.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar__open');
  backdrop.classList.toggle('backdrop__open');
})

backdrop.addEventListener('click', () => {
  sidebar.classList.remove('sidebar__open');
  backdrop.classList.remove('backdrop__open');
})
