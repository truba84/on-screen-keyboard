let one = document.querySelector('.one');
let input = document.querySelector('input');
let backspace = document.querySelector('#backspace');
let btns = document.querySelectorAll('.btn')
let dataReverse = document.querySelector('[data-reverse]')
let capsLock = document.querySelector('[data-сaps-lock]');
let letters = [...document.querySelectorAll('[data-letter]')];
let symbols = [...document.querySelectorAll('[data-alphanumeric]')];
let reverseEnRU = document.querySelector('[data-reverse]');
let oneBlockArr = ['!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+'];
let oneBlockArrEn = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];
let alphanumeric = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '='];

let arrRu = [
        'ё',
        'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 
        'ф', 'ы', 'в', 'а', 'п' ,'р' , 'о', 'л', 'д', 'ж', 'э', 
        'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', '.', '\\' 

]

let arrEn = [
    '`',
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 
    'a', 's', 'd', 'f', 'g' ,'h' , 'j', 'k', 'l', ';', '\'', 
    'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/' 
]

letters.forEach((el, index) => {
    el.textContent = arrRu[index]
})

window.addEventListener('click', function(event) {
    if(event.target.hasAttribute('data-alphanumeric') 
        || 
        event.target.hasAttribute('data-letter')
        ||
        event.target.hasAttribute('data-com')
        ||
        event.target.hasAttribute('data-at')) 
    {
        input.value += event.target.innerHTML;
                
    }else if(event.target.hasAttribute('data-space')) {
        input.value += event.target.dataset.space;    
    }     
})


window.addEventListener('mousedown', handleMouseDownSet)

window.addEventListener('mouseup', handleMouseUpSet)

backspace.addEventListener('mousedown', handleMouseDownDel)

backspace.addEventListener('mouseup', handleMouseUp)


reverseEnRU.addEventListener('click',reverse)

capsLock.addEventListener('click', () => {
    if(!capsLock.className.split(' ').includes('caps')) {
        capsLock.classList.add('caps')
        letters.forEach((el, i) => {            
            el.textContent = el.textContent.toUpperCase()
            
        })
        one.querySelectorAll('.btn').forEach((elem, index) => {
            if(elem.hasAttribute('data-alphanumeric')) {
                elem.textContent = oneBlockArr[index - 1]
                    if(dataReverse.textContent == 'ru' && elem.hasAttribute('data-alphanumeric')) {
                        elem.textContent = oneBlockArrEn[index - 1]
                        btns.forEach(el => {
                            if(el.textContent == '`') {
                                el.textContent = '~'
                            }else if(el.textContent == '[') {
                                el.textContent = '{'
                            }else if(el.textContent == ']') {
                                el.textContent = '}'
                            }
                            else if(el.textContent == '\\') {
                                el.textContent = '|'
                            }
                        })
                }
            }
        })
    }else{
        capsLock.classList.remove('caps')
        one.querySelectorAll('.btn').forEach((elem, index) => {
            if(elem.hasAttribute('data-alphanumeric')) {
                elem.textContent = alphanumeric[index - 1]
            }
            btns.forEach(el => {
                if(el.textContent == '~') {
                    el.textContent = '`'
                }else if(el.textContent == '{') {
                    el.textContent = '['
                }else if(el.textContent == '}') {
                    el.textContent = ']'
                }
                else if(el.textContent == '|') {
                    el.textContent = '\\'
                }
            })
        })

        letters.forEach(el => el.textContent = el.textContent.toLowerCase())
    }
})



function reverse(e){
   if(this.textContent =='en') {
    this.textContent = 'ru';
    document.getElementById('1').remove();
    document.getElementById('2').remove();
    document.querySelector('.four').classList.add('four__active');

    letters.forEach((el, index) => el.textContent = arrEn[index])
    

    if(capsLock.className.split(' ').includes('caps') && dataReverse.textContent == 'ru'){

        letters.forEach(el => el.textContent = el.textContent.toUpperCase())                     
        
        symbols.forEach((s, i) => s.textContent = oneBlockArrEn[i])
    }

    
    
   }else{
    this.textContent = 'en';
    document.querySelector('.four').classList.remove('four__active');

    let blocks = `
                <div class="btn" id="1" data-letter>.</div>
                <div class="btn" id="2" data-letter>\\</div>
                `;    

    document.querySelector('.four').insertAdjacentHTML('beforeend', blocks);  

    letters.forEach((el, index) => el.textContent = arrRu[index])

    if(capsLock.className.split(' ').includes('caps') && dataReverse.textContent == 'en'){

        letters.forEach((el, i) => el.textContent = el.textContent.toUpperCase())

        symbols.forEach((s, i) => s.textContent = oneBlockArr[i])
    }

   }
}



let timerIdDel;
let isDel;
let isDownDel = false;



function handleMouseDownDel(){  
    input.value = input.value.slice(0, -1);
    isDownDel = true;  
    
    timerIdDel = setTimeout(() => {
        isDel = setInterval(longPress,200)
        
    },400) 
    clearInterval(isDel)
}


function handleMouseUp(){ 
    isDownDel = false;
    return;
}

function longPress() {
    if(isDownDel){
        input.value = input.value.slice(0, -1);
    }    
}


let pressTimer;
let timerId;
let isDownSet = false;


function handleMouseDownSet(event){     
    
    isDownSet = true;

    if(isDownSet) {
        timerId = setTimeout(()=>{
            pressTimer = setInterval(() => {
                if(event.target.hasAttribute('data-alphanumeric') 
                    || 
                    event.target.hasAttribute('data-letter')
                    ||
                    event.target.hasAttribute('data-com')
                    ||
                    event.target.hasAttribute('data-at')) 
                {
                    input.value += event.target.innerHTML;
                            
                }else if(event.target.hasAttribute('data-space')) {
                    input.value += event.target.dataset.space;    
                } 
            },300)
        },400)
                
    }
        
}

function handleMouseUpSet(){ 
    clearTimeout(timerId)
    clearInterval(pressTimer) 
    isDownSet = false;
    return false;
}


