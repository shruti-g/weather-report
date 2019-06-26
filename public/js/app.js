const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.querySelector("#message_1")
const messageTwo=document.querySelector("#message_2")
const messageThree=document.querySelector("#message_3")
const messageFour=document.querySelector("#message_4")
const messageFive=document.querySelector("#message_5")
const messageSix=document.querySelector('#message_6')

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  const location=search.value
  messageOne.textContent="Please wait..."
  messageTwo.textContent=""
  messageThree.textContent=""
  messageFour.textContent=""
  messageFive.textContent=""
  messageSix.textContent=""

  fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
      if(data.error){
        messageOne.textContent=data.error
      }else{
        messageOne.textContent=data.location
        messageTwo.textContent='Currently ' + data.forecast.temperature
        messageThree.textContent=data.forecast.summary
        messageFour.textContent=data.forecast.precipitation
        messageFive.textContent=data.forecast.Minimum_temp
        messageSix.textContent=data.forecast.Maximum_temp
      }
    })
  })
})

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000);
}
