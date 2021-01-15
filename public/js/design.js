console.log('On client side!')

const l = document.querySelector('form')
const search = document.querySelector('#searchPlace1')
const mes1 = document.querySelector('#message-1')
const mes2 = document.querySelector('#message-2')

l.addEventListener('submit',(event)=>{
    event.preventDefault()

    console.log('testing!')

    mes1.textContent = 'loading...'
    mes2.textContent = ''

    fetch('/weather?address='+search.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                mes1.textContent = data.error
            }
            else{
                mes1.textContent = data.location
                mes2.textContent = data.forecast
            }
        })
    })
})