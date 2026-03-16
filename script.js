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

