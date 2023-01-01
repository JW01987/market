
let slideIndex = 1;

$('.slide_next_button').click(() => {
    if (slideIndex == 3) {
        $('.slide-box').css('transform', `translateX(0vw)`)
        slideIndex = 1;
        return
    }
    $('.slide-box').css('transform', `translateX(-${slideIndex}00vw)`)
    slideIndex += 1
})
$('.slide_prev_button').click(() => {
    if (slideIndex == 1) {
        $('.slide-box').css('transform', `translateX(-200vw)`)
        slideIndex = 3;
        return
    }
    $('.slide-box').css('transform', `translateX(${2 - slideIndex}00vw)`)
    slideIndex -= 1
})