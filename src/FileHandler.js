// const submitQuestion = async ()=>{
//     const optionsToPost = []
//     if(option1!== "" && option1!==null){
//       optionsToPost.push(option1)
//     }
//     if(option2!== "" && option2!==null){
//       optionsToPost.push(option2)
//     }
//     if(option3!== "" && option3!==null){
//       optionsToPost.push(option3)
//     }
//     if(option4!== "" && option4!==null){
//       optionsToPost.push(option4)
//     }
//     if(option5!== "" && option5==null){
//       optionsToPost.push(option5)
//     }
//     if(option6!== "" && option6!==null){
//       optionsToPost.push(option6)
//     }
//     try {
//       try {
//         await fetch(
//           subject === "Polity" ?
//           '/setPolityQuestion' :
//           subject === "Economy" ?
//           '/setEconomyQuestion' :
//           subject === "History" ?
//           '/setHistoryQuestion' :
//           subject === "Geography" ?
//           '/setGeographyQuestion' :
//           subject === "General Knowledge" ?
//           '/setGkQuestion' :
//           subject === "Current Affairs" ?
//           '/setCurrentAffairsQuestions':
//           '/test'
//           ,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                question : question,
//                subquestion: [],
//               //  options : [option1,option2,option3,option4],
//                options : optionsToPost,
//                answer : answer,
//                explanation : explanation
//               })

//         }).then(response => response.json()).then(data => data.success ?  alert(data.message):alert(data.error));
        
//       }
//       catch (err) {
//         alert(err)
//       }
//     }
//     catch (err_1) {
//       alert(err_1)
//     }
//    }