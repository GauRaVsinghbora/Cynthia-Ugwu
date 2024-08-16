let mincircle = document.querySelector(".mincircle");
var timeout;
const elmt = document.querySelectorAll(".elmt");



const scroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true
});
function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",(dets)=>{
        // console.log(dets.clientX);
        document.querySelector(".mincircle").style.transform= `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
function firstPageAnim(){
    var t1 = gsap.timeline();
    t1.from(".header",{
        y:'-10',
        duration: 1,
        opacity: 0,
        ease:Expo.easeInOut, 
    })
    .to(".boundaryEle",{
        y:0,
        duration:1,
        ease:Expo.ease,
        stagger: .2,
    })
    .from(".home-footer",{
        y:10,
        opacity:0,
        duration:1,
        ease:Expo.easeInOut,
        
    })
}
function mincircleSkew(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove",(dets)=>{
        clearTimeout(timeout)
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;
        
        xprev = dets.clientX;
        yprev = dets.clientY;

        xscale = gsap.utils.clamp(0.8, 1.5, xdiff);
        yscale = gsap.utils.clamp(0.8, 1.5, ydiff);
        // console.log(`${xscale},${yscale}`);
        // this will not work because  When multiple transformations are applied to an element in different parts of the code, the most recent transformation will override the previous one unless they are properly combined.
        //mincircle.style.transform = `scale(${xscale},${yscale})`;   

        circleMouseFollower(xscale,yscale);

        timeout = setTimeout(() => {
            document.querySelector(".mincircle").style.transform= `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        }, 100);
    })
}

mincircleSkew();
circleMouseFollower();
firstPageAnim();

function moveImage(){
    var rotate = 0;
    elmt.forEach(element => {
        element.addEventListener("mousemove",(dets)=>{
            // element.querySelector("img").style.display = "block";
            // console.log(dets.clientX,dets.clientY);
            // or
            var diffrol = dets.clientX - rotate;
            rotate = dets.clientX;

            var diff = (dets.clientY - element.getBoundingClientRect().top);
            console.log(diff);
            gsap.to(element.querySelector("img"),{
                opacity: 1,
                ease: Power1,
                top: diff,
                left: dets.clientX,
                rotate: gsap.utils.clamp(-20,20,diffrol*2),
            })
        })
    });
    elmt.forEach(element => {
        element.addEventListener("mouseleave",(dets)=>{
            // element.querySelector("img").style.display = "block";
            // console.log(dets.clientX,dets.clientY);
            // or
            gsap.to(element.querySelector("img"),{
                opacity: 0,
                ease: Power3,
            })
        })
    });
}
moveImage();