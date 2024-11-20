window.onload = function () {

    // GSAP 라이브러리의 스크롤트리거를 등록
    gsap.registerPlugin(ScrollTrigger); 

    cursorFunc();
}
// 01 cursor event 
function cursorFunc() {
    var cursorBall = document.querySelector('.cursor-ball');
    var cursorBallSvg = document.querySelector('.cursor-ball svg');
    var cursorBallSvgCircle = document.querySelector('.cursor-ball svg circle');
    var cursorAble = document.querySelectorAll('.cursor-able');

    let pos = { 
        x: window.innerWidth / 2, 
        y: window.innerHeight / 2 
    };
    let mouse = { 
        x: pos.x, 
        y: pos.y 
    };
    const speed = 0.35;

    // 초기 커서 위치 설정
    gsap.set(cursorBall, {
        xPercent: -50, 
        yPercent: -50
    });
    
    const xSet = gsap.quickSetter(cursorBall, "x", "px");
    const ySet = gsap.quickSetter(cursorBall, "y", "px");
    
    // 마우스 이동 이벤트
    window.addEventListener("mousemove", (e) => {    
        mouse.x = e.x;
        mouse.y = e.y;  
    });
    
    // ticker로 부드러운 이동 처리
    gsap.ticker.add(() => {
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });
    
    // 특정 요소에 마우스 호버 효과 추가
    cursorAble.forEach((el)  => {
        // const cursorTxt = el.attr('data-cursor');

        el.addEventListener('mouseenter', () => {
            // if (cursorTxt !== null) {
            //     const textElement = document.createElement('div');
            //     textElement.className = 'text';
            //     textElement.innerText = cursorTxt;
            //     cursorBall.appendChild(textElement);

            //     cursorBall.computedStyleMap.mixBlendMode = 'unset';
            //     cursorBallSvgCircle.style.fill = '#121212';
            // }

            gsap.to(cursorBallSvg, {
                duration: 0.3,
                scale: 4
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(cursorBallSvg, {
                duration: 0.3,
                scale: 0.8
            })

            const textElement = cursorBall.querySelector('.text');
            if (textElement) {
                cursorBall.removeChild(textElement);
            }

            cursorBall.style.mixBlendMode = 'difference';
            cursorBall.style.fill = '#fff';

        })
      
    });   
}