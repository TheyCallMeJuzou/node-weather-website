console.log('Client side javascript file is loaded!')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') // # to target an id -> p message-1
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
messageOne.textContent= ''
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault() // prevent default behaviour to refresh browser
    const location = search.value
    messageOne.textContent='Loading data...'
    messageTwo.textContent=''
    messageThree.textContent=''
    messageFour.textContent=''
    //     fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        } else{
            messageOne.textContent='Location: ' + data.location
            messageTwo.textContent='Temperature: ' + data.temperature
            messageThree.textContent='Feels like: ' + data.feelslike
            messageFour.textContent='Humidity: ' + data.humidity
        }
        
    })
})
})