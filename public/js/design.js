const l = document.querySelector('form')
const search = document.querySelector('#searchPlace1')
const mes = document.getElementById("message")

l.addEventListener('submit',(event)=>{
    event.preventDefault()  // it stops the website from reloading automatically.

    console.log('testing!')

    mes.style.display = "block";

    mes.innerHTML = 'loading...'
    

    fetch('/weather?address='+search.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                mes.innerHTML = data.error
            }
            else{
                mes.innerHTML = data.location+"\n\n"+data.forecast
            }
        })
    })
})