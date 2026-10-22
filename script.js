 // FINDING ALL THE QUESTION CARDS
      const questions=document.querySelectorAll(".question-card")
    const backButton=document.querySelector("#back-qn")
    const nextButton=document.querySelector("#next-qn")
    const questionCounter=document.querySelector("#question-counter")
    const progressFill=document.querySelector("#progress-fill")
    const stepCaption=document.querySelector(".step-caption")
    const resultsContainer=document.getElementById("results-container")
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
    function calculateCareerMatches(){
    // STARTS EVERY CAREER WITH ZERO POINTS
    const scores={
        web:0,
        software:0,
        data:0,
        cyber:0
    }
    // DISPLAY OF RESULTS
const careerNames={
    web:"Web Developer",
    software:"Software Engineer",
    data:"Data Analyst",
    cyber:"Cybersecurity Analyst",
}

    // READS THE SELECTED ANSWER FROM EVERY QEUSTIONS
    questions.forEach(function(question){
        const selected=question.querySelector(`input[type="radio"]:checked`)
        if(selected&&scores[selected.value]!==undefined){
              scores[selected.value]++
        }
    })
    // CONVERT SCORES TO AN ARRAY AND SORT
let matches=Object.entries(scores).map(([id,score])=>({
    id:id,
    name:careerNames[id],
    score:score,
}))
// SORT HIGHEST SCORE FIRST
matches.sort((a,b)=>b.score-a.score)
// SAVE AND RETURN TOP 3
localStorage.setItem("pathFinderAnswers",JSON.stringify(scores))
localStorage.setItem("pathFinderResults",JSON.stringify(matches.slice(0,3)))
return matches.slice(0,3)
}

    // GO TO THE NEXT QUESTIONS
    if(nextButton){
    nextButton.addEventListener("click", function(){
        const currentCard=questions[currentQuestion]
        const selectedAnswer=currentCard ? currentCard.querySelector(`input[type="radio"]:checked`):null

        if(!selectedAnswer){
            alert("Please choose an answer before continuing.")
            return
        }
        if(currentQuestion<questions.length-1){
            currentQuestion++
            showQuestion()
        }else{
            alert("Great job! Next, we'll build you career results")
        
            // CALCULATING AND SAVING MATCHES
            const matches=calculateCareerMatches();
            // HIDE QUIZ CARD AND PROGRESS BAR
               const form=document.getElementById("pathfinder-form")
            if(form)form.style.display="none"
             const intro=document.querySelector(".pathfinder-intro")
            if(intro)intro.style.display="none"
                const progress=document.querySelector(".question-progress")
            if(progress)progress.style.display="none"

            // SHOW AND POPULATE RESULTS CONTAINER RIGHT ON THE PAGE
            if(resultsContainer){
                resultsContainer.style.display="block"
                resultsContainer.innerHTML=`
                <div class="question-card" style="text-align:center">
                <p class="eyebrow" style="color:#2dd4bf;font-size:1.8rem; font-weight:600;letter-spacing:2px;margin-bottom:8px;">YOUR MATCHES ARE IN!</p>
                <h1 style="font-size:2rem; color:#f0eaff;margin-bottom:8px;">Your Recommended Career Path</h1>
                <p class="question-description">Based on your interest, here are your top  matches:</p>
                <div class="results-list" style="display:flex;flex-direction:column; gap:15px;margin-top:20px">
                ${matches.map((match,idx)=>`
                    <div class="answer-option" style="display:flex; justify-content:space-between;align-items:center;">
                    <div class="answer-content" style="text-align:left;">
                    <span class="answer=title">${idx+1}.${match.name}</span>
                    <span class="answer-description">Match level based on your skills preference</span>
                    </div>
                    <span style="background:#2dd4bf;color:#111827;padding:6px 14px; border-radius:20px; font-weight:700; font-size:0.85rem">Top Match</span>
                      </div>
    
                    `).join('')}
                    </div>
                <button onclick="location.reload()" class="primary-but" style="margin-top:25px;">Retake Quiz</button>
                </div>`
                
            }
        
        }
    })
}
    // RETURN TO THE PREVIOUS QUESTION
    if(backButton){
           backButton.addEventListener("click",function(){
        if(currentQuestion>0){
            currentQuestion--
            showQuestion()
        }
    }) 
    }


// CONNECTING THE SIGN UP FORM WITH PATHFINDER
const signupForm=document.querySelector("#signup-form")
signupForm.addEventListener("submit",function(event){
    event.preventDefault()
    window.location.href="pathfinder.html"
})


