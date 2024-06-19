document.querySelector('.header-item').addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxMovement = 15;
    const dx = (x / rect.width) * maxMovement;
    const dy = (y / rect.height) * maxMovement;
    this.style.transform = `translate(${dx}px, ${dy}px)`;
});