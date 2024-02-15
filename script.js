gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
})

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        start: "0% 0%",
        pin: true,
        // pinSpacing: false,
        end: "+=1500",
        // markers: true,
        scrub: 1.5
    }
})

tl.to("#page1 h1:nth-child(1)", {
    y: -300,
}, "anim")
tl.to("#page1 h1:nth-child(3)", {
    y: 300,
}, "anim")
tl.to("#page1 h1:nth-child(2)", {
    color: 'aqua',
    scale: 1.1
}, "anim")


var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page2",
        scroller: "#main",
        start: "5% 0%",
        pin: true,
        // pinSpacing: false,
        end: "+=2000",
        // markers: true,
        scrub: 1.5
    }
})

gsap.set("#page2 #left", {
    xPercent: 40,
    yPercent: 0,
});

tl2.to("#page2 #left", {
        xPercent: 0,
        scale: 1,
    })
    .to("#page2 #right", {
        opacity: 1,
    }, "someLabel");



var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page3",
        scroller: "#main",
        start: "5% 0%",
        pin: true,
        // pinSpacing: false,
        end: "+=2000",
        // markers: true,
        scrub: 1.5
    }
})

tl3.to("#page3 #left", {
    xPercent: -10,
}, "animation");
tl3.to("#page3 #right", {
    xPercent: 10,
}, "animation");

var tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page6",
        scroller: "#main",
        start: "5% 0%",
        pin: true,
        // pinSpacing: false,
        end: "+=4000",
        // markers: true,
        scrub: 1.5
    }
})

gsap.set("#page6 #center #left h1:nth-child(1)", {
    xPercent: 0,
    yPercent: 140,
})
gsap.set("#page6 #center #left h1:nth-child(3)", {
    xPercent: 0,
    yPercent: -240,
})


tl4.to("#page6 #center #left h1:nth-child(1)", {
    opacity: 0,
})
tl4.to("#page6 #center #left h1:nth-child(2)", {
    opacity: 1,
})
tl4.to("#page6 #center #left h1:nth-child(2)", {
    opacity: 0,
})
tl4.to("#page6 #center #left h1:nth-child(3)", {
    opacity: 1,
})


const tiltContainer = document.querySelector('.tilt-container');
const tiltElement = document.getElementById('tilt-element');

let mouseX = 0;
let mouseY = 0;

tiltContainer.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = -(e.clientY / window.innerHeight - 0.5);

    updateTilt();
});

function updateTilt() {
    const tiltX = mouseY * 20; // Adjust the tilt angle based on your preference
    const tiltY = mouseX * 20; // Adjust the tilt angle based on your preference

    tiltElement.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
}

tiltContainer.addEventListener('mouseleave', () => {
    tiltElement.style.transform = 'rotateX(0deg) rotateY(0deg)';
});