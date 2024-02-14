import {select, carusel, search, burger, feedbackForm} from './scripts.js'

window.addEventListener('DOMContentLoaded', function(){

    select()
    carusel()
    search()
    burger()
    feedbackForm()
})

// window.addEventListener('resize', (e) => {
//   carusel()
// });


// alert(window.getComputedStyle(document.querySelector('.fullscreen__carusel')).gridTemplateColumns.replace(/\S/gi,'').length)