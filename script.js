// Counter animation for elements with class `.counter`.
const counters = document.querySelectorAll('.counter');

function animateCounter(el) {
	const target = parseInt(el.dataset.target) || 0;
	const suffix = el.dataset.suffix || '';
	let count = 0;
	const step = Math.max(1, Math.ceil(target / 100));

	function update() {
		count += step;
		if (count < target) {
			el.textContent = count + suffix;
			requestAnimationFrame(update);
		} else {
			el.textContent = target + suffix;
		}
	}

	update();
}

// Start counters when the stats section comes into view.
const statsSection = document.querySelector('.stats');
if ('IntersectionObserver' in window && statsSection) {
	const statsObserver = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				counters.forEach(c => animateCounter(c));
				obs.unobserve(entry.target);
			}
		});
	}, { root: null, threshold: 0.25 });

	statsObserver.observe(statsSection);
} else {
	// Fallback: animate immediately
	counters.forEach(c => animateCounter(c));
}

// Fade-in cards on scroll using IntersectionObserver
const cards = document.querySelectorAll('.card');

if ('IntersectionObserver' in window && cards.length) {
	const obsOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.15
	};

	const observer = new IntersectionObserver((entries, observerRef) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observerRef.unobserve(entry.target);
			}
		});
	}, obsOptions);

	cards.forEach(card => observer.observe(card));
} else {
	// Fallback: make cards visible if IntersectionObserver isn't supported
	cards.forEach(card => card.classList.add('visible'));
}

