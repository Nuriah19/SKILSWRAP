 // FINDING ALL THE QUESTION CARDS
     const questions=document.querySelectorAll(".question-card")
    const backButton=document.querySelector("#back-qn")
    const nextButton=document.querySelector("#next-qn")
    const questionCounter=document.querySelector("#question-counter")
    const progressFill=document.querySelector("#progress-fill")
    const stepCaption=document.querySelector(".step-caption")
    let currentQuestion=0

    // SHOW THE CORRECT QUESTION
    function showQuestion(){
        questions.forEach((question,index)=>{
        if(index===currentQuestion){
            question.style.display="block"
        }else{
            question.style.display="none"
        }
        })
        // UPDATE FOR THE TOP QN COUNTER TEXT
    if(questionCounter){
        questionCounter.textContent=`QUESTIONS ${currentQuestion + 1} OF ${questions.length}`
    }
    // UPDATE THE PROGRESS BAR WIDTH PERCENTAGE
    if(progressFill){
        const progressPercentage=((currentQuestion +1)/questions.length)*100
        progressFill.style.width=`${progressPercentage}%`
    }
    // UPDATE FOR THE BOTTOM STEP CAPTION
  if(stepCaption){
    stepCaption.textContent=`step${currentQuestion + 1} of your journey`
  }
    // ENABLING THE BACK BUTTON 
    if(backButton){
        backButton.style.display=currentQuestion=== 0? "none": "inline-block"
    }
    // CHANGE NEXT BUTTON TEXT TO SEE MY RESULTS 
    if(nextButton){
        nextButton.textContent=currentQuestion===questions.length-1? "See My Results":"Next"
    }
    }

    // GO TO THE NEXT QUESTIONS
    nextButton.addEventListener("click", function(){
        const selectedAnswer=questions[currentQuestion].querySelector(`input[type="radio"]:checked`)
    // [ console.log("Questions found",questions.length)
    //  console.log("Current questions",currentQuestion)
    //  console.log("Question element",questions[currentQuestion])]

        if(!selectedAnswer){
            alert("Please choose an answer before continuing.")
            return
        }
        if(currentQuestion<questions.length-1){
            currentQuestion++
            showQuestion()
        }else{
            alert("Great job! Next, we'll build you career results")
        }
    })
    // RETURN TO THE PREVIOUS QUESTION
    if(backButton){
           backButton.addEventListener("click",function(){
        if(currentQuestion>0){
            currentQuestion--
            showQuestion()
        }
    }) 
    }

