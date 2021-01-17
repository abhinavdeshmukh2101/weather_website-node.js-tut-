const l = document.querySelector('form')
const search = document.querySelector('#searchPlace1')
const mes = document.getElementById("message")
let list = "<ul>"

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
                list = '<ul>'
                list+= '<li> location: '+data.place+'</li>'        
                list+= '<li> local time: '+data.time+'</li>'
                list+= "<li> Temperature(deg. C): "+data.temperature+'</li>'
                list+= "<li> Condition: "+data.cond+'</li>'
                list+= "<li> Humidity: "+data.humid +'</li>'
                list+= "<li> Wind: "+data.wind+'</li>'
                list+= "<li> Cloud: "+data.cloud+'</li>'
                list+= '</ul>'
                mes.innerHTML = list
            }
        })
    })
})