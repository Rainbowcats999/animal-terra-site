const counters = document.querySelectorAll('.stat h1');

counters.forEach(counter => {

let target = counter.innerText;
target = parseInt(target);

let count = 0;

let update = () => {

count += Math.ceil(target/100);

if(count < target){
counter.innerText = count + "+";
requestAnimationFrame(update);
}else{
counter.innerText = target + "+";
}

}

update();

});

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

