const formatData = questionData => {
    console.log(questionData);
  const result = questionData.map((item) => { //6 yek lop rosh mizanim 
      const questionObject = { question: item.question };//6-1 yek objekt dorost mikonim 
      const answers = [...item.incorrect_answers];//6-2 javab nadorost azash copy migirim be ravesh spreed
      const correctAnswerIndex = Math.floor(Math.random() * 4);// 6-3 yek adad random ijad mikonim 
      answers.splice(correctAnswerIndex, 0, item.correct_answer); // 6-4 be ravesh splice mahal shoro correct Index ,0ta hazf beshe  , chizi ke jay gozin ebshe javab dorost
      questionObject.answers = answers; // 6-5 to habon moteghayere objekt ijad kon ke hamon answers hast 
      questionObject.correctAnswerIndex = correctAnswerIndex; //6-6 baz ye objekt ijad kon ke index javabe doroste 
      return questionObject// 6-7 objekt marbot be soalem ke sorate soal toshe array javabha v index javabe dorost 
    });
    return result
  };

  export default formatData //chon hamino faghat darim az default estefade mikonim  