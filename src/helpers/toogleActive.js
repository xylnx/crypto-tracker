const toggleActive = (e) => {
  const children = e.target.parentElement.querySelectorAll('.toggle');
  children.forEach((child) => {
    if (child.classList.contains('active')) {
      child.classList.remove('active');
    }
    if (e.target.classList.contains('toggle')) e.target.classList.add('active');
  });
};

export { toggleActive };
