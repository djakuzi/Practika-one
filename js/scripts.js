     //select 
export const select = function() {

        const select = document.querySelector('.select') 
    
        function selectChangeMouse(event){
    
             const target = event.target
    
             const ul = document.querySelector('.select__ul')
             const lang = document.querySelector('.header__lang--change')
    
            if(target.tagName == 'LI') {
                lang.innerHTML = target.dataset.value + ''
                selectCancel()
            }
    
            if(target.tagName == 'BUTTON'){        
                ul.style.animation = '1s selectOpen forwards'
                select.classList.toggle('open')
            }
    
            select.addEventListener('pointerleave', selectCancel)
    
            function selectCancel(){
                ul.style.animation = '1s selectCancel forwards'
                setTimeout( () => select.classList.toggle('open'), 1000)  // 2000 seconds for animation cancelSelect
                select.removeEventListener('pointerleave', selectCancel)
            }
        }

        function selectChangeTouch(event){

            select.removeEventListener('removestart', selectChangeTouch)

            const target = event.target
            const ul = document.querySelector('.select__ul')
            const lang = document.querySelector('.header__lang--change')
    
            if(target.tagName == 'LI') {
                lang.innerHTML = target.dataset.value + ''
                selectCancel()
            }
    
            if(target.tagName == 'BUTTON'){        
                ul.style.animation = '1s selectOpen forwards'
                select.classList.toggle('open')
            }
    
            function selectCancel(){
                ul.style.animation = '1s selectCancel forwards'
                setTimeout( () => select.classList.toggle('open'), 1000)  // 2000 seconds for animation cancelSelect
            }
        }
    
        select.addEventListener('mousedown', selectChangeMouse)

        select.addEventListener('touchstart', selectChangeTouch)
    }

     // carusel
export const carusel = function(){
    
    // fs, Fs = fullScreen (tag section in html)

    const prevFs = document.querySelector('#fullscreen_prev')
    const nextFs = document.querySelector('#fullscreen_next')
    const lengthFs = document.querySelectorAll('.fullscreen__carusel div').length / 2
    const caruselFs = document.querySelector('.fullscreen__carusel')

    let positionFs = 0

     // nw, Nw - news (tag section in html)
    const prevNw = document.querySelector('#news_prev')
    const nextNw = document.querySelector('#news_next')
    const lengthNw = document.querySelectorAll('.news__box').length
    const caruselNw = document.querySelector('.news__carusel')
 
    let positionNw = 0
    let countNw = document.body.offsetWidth > 768 ? 3 : document.body.offsetWidth <= 768 ? 2 : 1 // check size screen, that show and count quantity of visibility contnet
    let roundNw = 0
    let widthNw = document.querySelector('.news__box').offsetWidth + parseInt(window.getComputedStyle(caruselNw).gap) // gap of grid-box + width element

    function getValueTranslateNw(){

        widthNw = document.querySelector('.news__box').offsetWidth + parseInt(window.getComputedStyle(caruselNw).gap)

        let res = countNw * roundNw * widthNw
        console.log(res, roundNw)
        // console.log(res,-(widthNw * (lengthNw - countNw)))
        if(res > 0) {
            roundNw = 0
            res = 0
        } else if(res < -(widthNw * (lengthNw - countNw))){
            roundNw += 1
            res = -(widthNw * (lengthNw - countNw))
        }

        // console.log(res)
        caruselNw.style.translate = res + 'px';
    }

    window.addEventListener('resize', (e) => {

        const widthBody = document.body.offsetWidth

        if(widthBody > 768) {
            countNw = 3
            caruselNw.style.translate = '0px'
        }
        if(widthBody <= 768) {
            countNw = 2
            caruselNw.style.translate = '0px'
        }
        if(widthBody <= 460) {
            countNw = 1
            caruselNw.style.translate = '0px'
        }

        getValueTranslateNw()

    });

    function prev(event){ //prev button for different carousels

        const target = event.target
        const cl = target.parentElement.id

        function choiceCarusel(cl){

            if(cl == 'fullscreen_prev'){
                 const widthFs = document.querySelector('.fullscreen__carusel--one').offsetWidth

                 positionFs += 100

                positionFs = Math.min(positionFs, 0)
                caruselFs.style.translate = positionFs + '%'
            }

             if(cl == 'news_prev'){
                roundNw += 1
                getValueTranslateNw()

            }
        }

        choiceCarusel(cl)
    }

    function next(event){ //next button for different carousel

        const target = event.target
        const cl = target.parentElement.id

        function choiceCarusel(cl){

            if(cl == 'fullscreen_next'){

                const widthFs = document.querySelector('.fullscreen__carusel--one').offsetWidth
                
                positionFs -= 100
                positionFs = Math.max(positionFs, -100 * (lengthFs - 1))
                caruselFs.style.translate = positionFs + '%'

            }

            if(cl == 'news_next'){
                roundNw -= 1
                getValueTranslateNw()

            }
        }

        choiceCarusel(cl)
    }


    prevFs.addEventListener('click', prev)
    nextFs.addEventListener('click', next)
    
    prevNw.addEventListener('click', prev)
    nextNw.addEventListener('click', next)
}

     //searchForm
export const search = function(){

    const searchBtn = document.querySelector('.menu__form--search')
    const searchForm = document.querySelector('.menu__form')
    const input = searchForm.text

    function searchFormOpen(event){
        event.preventDefault()

        input.classList.toggle('open')
        input.value = ''
        input.focus()

        function searchFormClose(event){

            input.classList.toggle('open')
            searchForm.removeEventListener('pointerleave', searchFormClose)
            
        }

        searchForm.addEventListener('pointerleave', searchFormClose)
      
      
    }

    // searchForm.addEventListener('pointerenter', searchFormEnterLeave)

    searchBtn.addEventListener('click', searchFormOpen)
}

export const burger = function(){

    // bg - burger
    const bg = document.querySelector('.burger')
    const bgMenu = document.querySelector('.header__menu')
    const close = document.querySelector('.header__close')
    const body = document.querySelector('body')
    const blur = document.querySelector('.burger_blur_screen')



    function burgerOpen(event){

        bgMenu.classList.add('open')
        body.classList.add('open')
        blur.classList.add('open')
        
        blur.style.animation = '1s fullBlur forwards'
        bgMenu.style.animation = '1s burgerOpen forwards'

        function burgerClose(event){
            body.classList.remove('open')

            blur.style.animation = '1s closeBlur forwards'
            bgMenu.style.animation = '1s burgerClose forwards'

            setTimeout( () =>  {
                blur.classList.remove('open')
                bgMenu.classList.remove('open')
            }, 1000)
            
            close.removeEventListener('click', burgerClose)
        }

        close.addEventListener('click', burgerClose)

    }

    bg.addEventListener('click', burgerOpen)


}

export const feedbackForm = function(){

    // feedback - fd or Fd

    const fd = document.querySelector('.feedback__form')
    const btnFd = document.querySelector('.feedback__form-button')
    const nameFd = document.querySelectorAll('.feedback__form-input')[0]
    const phoneFd = document.querySelectorAll('.feedback__form-input')[1]
    const textInfo = document.querySelector('.feedback__form-text')

    const questionFd = document.querySelector('.feedback__form-textarea')

    async function submitOrChecked(event){

        event.preventDefault()

        let checked =  []

        for (let el of document.querySelector('.feedback__form--box').children){

            // if(el.value == ''){
            //     el.classList.add('open')

            //     el.addEventListener('input',(e)=>{    // delete class open ipnput or textarea
            //         if(e.target.value.length != ''){
            //             e.target.classList.remove('open')
            //         }
            //     }) 

            //     checked.push(false)
            // } 
            checked.push(true)


        }

        if (checked.every( el => el)){

            for (let el of document.querySelector('.feedback__form--box').children){
                el.value = ''
            }
            
            let formData = new FormData(fd)
            
            let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: formData,
            });

            let result = await response.json();
            result = result.id

            btnFd.style.animation = '1s fdButtonOpen forwards'
            btnFd.innerHTML = 'Ваш запрос был отправлен под номером: ' + result 
            textInfo.innerHTML = 'через 10 секунд вы снова сможете задать вопрос'
            setTimeout( ()=> {
                btnFd.style.animation = '1s fdButtonClose forwards'
                btnFd.innerHTML = 'Отправить'
            }, 10000)

            // let response = await fetch('https://jsonplaceholder.typicode.com/posts')

            // let commits = await response.json()

            // console.log(commits[0].body)

        }

    }

    function formatPhone(event){
        let num = event.target.value
        console.log(num)
        if(num.length == 11){
            event.target.value = '+7(' + num[1] + num[2] + num[3] + ')' + "-" + num[4] + num[5] + num[6] + "-" + num[7] + num[8] + "-" + num[9] + num[10]
        }

        
    }

    function formatName(event){

        function upperName(str){
            return str.split(' ').map( el => el[0].toUpperCase() + el.slice(1,el.length)).join()
        }

        const value = event.target.value
        console.log(value.replace(/\S/gi, '').length)
        console.log(value.split(' '))
        if(value.replace(/\S/gi, '').length == 3){
            event.target.value = upperName(value.slice(0, value.length-1))
        } else {
             event.target.value = upperName(value)
        }


    }

    fd.addEventListener('submit', submitOrChecked)
    phoneFd.addEventListener('input', formatPhone)
    nameFd.addEventListener('input',formatName)
    

}


// 
export const pushHeaderFeedbackFooter = function(){ //script for loading header footer feedback  in HTML site

    const body = document.querySelector('body')
    const main = document.querySelector('main')

    body.insertAdjacentHTML('afterbegin', '<header class="header"><div class="container"><div class="header__inside"><button class="burger"> <span class="burger__line"></span><span class="burger__line"></span><span class="burger__line"></span></button><a class="header__logo" href="" ><img src="./logo/logo.svg" alt="логотип"></a><div class="header__container"><div class="header__menu"><button class="header__close"><img src="./img/headerClose.svg"></button><nav class="nav"><ul class="nav__list"><li class="nav__item"><a href="" class="nav__link"> О компании</a></li><li class="nav__item"><a href="" class="nav__link">Вакансии</a></li><li class="nav__item"><a href="" class="nav__link">Новости</a></li><li class="nav__item"><a href="" class="nav__link">Контакты</a></li></ul></nav><h1 class="header__phone">8 (86138) 6-34-03, 6-34-06</h1><h1 class="header__email">sale@semm.ru</h1><h1 class="header__timetable">пн-пт 8:00-17:00, перерыв 12:00-13:00, сб-вс: выходной</h1></div><h1 class="header__timetable1">пн-пт 8:00-17:00, перерыв 12:00-13:00, сб-вс: выходной</h1><h1 class="header__email">sale@semm.ru</h1><div class="header__box3"><div class="box3__inner"><div class="header__lang"><button class="header__lang--ru">Ru</button><div class="header__lang--line"></div><button class="header__lang--change">En</button></div><div class="select"><button class="select__button">Выбор языка</button><ul class="select__ul"><li data-value="En">Английский</li><li data-value="Zh">Китайский</li><li data-value="Ar">Арабский</li></ul></div></div><h1 class="header__phone">8 (86138) 6-34-03, 6-34-06</h1></div></div></div></div></header>')
    body.insertAdjacentHTML('afterbegin', '<div class="burger_blur_screen"></div>')
    main.insertAdjacentHTML('beforeend',  '<section class="feedback"><div class="container"><h1 class="feedback__title">Свяжитесь с нами</h1><form name="feedback" action="" class="feedback__form"><div class="feedback__form--box"><input name="" type="text" class="feedback__form-input" placeholder="ФИО"><input type="text" class="feedback__form-input" placeholder="Телефон"><input type="email" class="feedback__form-input" placeholder="E-mail"><textarea  placeholder="Введите ваш запрос" class="feedback__form-textarea"></textarea></div><p class="feedback__form-text">Нажимая на кнопку вы даете согласие на обработку персональных данных</p> <button class="feedback__form-button">Отправить</button></form></div></section>')
    body.insertAdjacentHTML('beforeend', '<footer class="footer"><div class="container"><div class="footer__inner"><img src="./logo/logo.svg" alt=""><nav class="footer__nav"><li class="footer__li"><a href="" class="footer__link">О компании </a></li><li class="footer__li"><a href="" class="footer__link">Каталог продукции </a></li><li class="footer__li"><a href="" class="footer__link">Услуги</a></li><li class="footer__li"><a href="" class="footer__link">Вакансии</a></li><li class="footer__li"><a href="" class="footer__link">Новости</a></li><li class="footer__li"><a href="" class="footer__link">Контакт</a></li></nav><nav class="footer__nav"><li class="footer__li"><a href="" class="footer__link">Элеваторное Оборудование</a></li><li class="footer__li"><a href="" class="footer__link">Котлы  </a></li><li class="footer__li"><a href="" class="footer__link">Металлоконструкции</a></li><li class="footer__li"><a href="" class="footer__link">Запчасти на элеваторное оборудование</a></li><li class="footer__li"><a href="" class="footer__link">Трубы</a></li><li class="footer__li"><a href="" class="footer__link">Дымовые dодонапорные башни</a></li></nav><nav class="footer__nav"><li class="footer__li"><a href="" class="footer__link">Котел-утилизатор</a></li><li class="footer__li"><a href="" class="footer__link">Скреперный транспортёр для уборки навоза</a></li><li class="footer__li"><a href="" class="footer__link">Планетарный бетоносмеситель</a></li><li class="footer__li"><a href="" class="footer__link">Подъемники</a></li><li class="footer__li"><a href="" class="footer__link">Тележки</a></li><li class="footer__li"><a href="" class="footer__link">Неликвиды</a></li</nav></div><div class="footer__info"><div><img src="./img/mapFooter.svg" alt=""><h1 class="footer__text">Адрес: 352382, Краснодарский край, <br>г. Кропоткин, ул. Пушкина, 79</h1></div><div><img src="./img/phoneFooter.svg" alt=""><h1 class="footer__text">Тел./Факс: 8(86138) 6-34-03, 6-34-06<br>E-mail: sale@semm.ru</h1></div><div><img src="./img/clockFooter.svg" alt=""><h1 class="footer__text">Режим работы: пн-пт 8:00-17:00<br> перерыв 12:00-13:00, сб-вс: выходной</h1></div</div></div><div class="footer__fullscreen"><div class="container"><h1 class="footer__start">© АО "Элеватормельмаш" 2014 г.</h1><h1>Разработка и маркетинг - WebCanape</h1><h1>Политика конфиденциальности</h1></div></div></footer>')

}
