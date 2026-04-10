// Counter animation for elements with class `.counter`.
const counters = document.querySelectorAll('.counter');

function animateCounter(el) {
	const target = parseInt(el.dataset.target) || 0;

// Enable custom cat cursor site-wide on non-touch devices
document.addEventListener('DOMContentLoaded', () => {
	try {
		if (!('ontouchstart' in window)) {
			document.body.classList.add('cat-cursor-active');
		}
	} catch (e) {
		// silently fail if something unexpected happens
		console.warn('Cat cursor init failed', e);
	}
});
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
	const obsOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

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

// Simple carousel logic for .carousel-track
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
if (track && prevBtn && nextBtn) {
	const trackContainer = document.querySelector('.carousel-track-container');
	const slides = Array.from(track.querySelectorAll('.card'));
	let index = 0;
	let visible = 1;

	function updateVisibleCount() {
		const containerWidth = trackContainer.getBoundingClientRect().width;
		const slideWidth = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 20);
		visible = Math.max(1, Math.floor((containerWidth + 10) / slideWidth));
		if (index > slides.length - visible) index = Math.max(0, slides.length - visible);
	}

	function update() {
		const slideWidth = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 20);
		const moveX = index * slideWidth;
		track.style.transform = 'translateX(-' + moveX + 'px)';
		prevBtn.disabled = index === 0;
		nextBtn.disabled = index >= slides.length - visible;
	}

	window.addEventListener('resize', () => {
		updateVisibleCount();
		update();
	});

	prevBtn.addEventListener('click', () => {
		index = Math.max(0, index - 1);
		update();
	});

	nextBtn.addEventListener('click', () => {
		index = Math.min(slides.length - visible, index + 1);
		update();
	});

	// initialize
	updateVisibleCount();
	update();
}

