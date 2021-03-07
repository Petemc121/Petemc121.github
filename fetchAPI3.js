fetch( 'https://api.coronavirus.data.gov.uk/v1/data?' +
'filters=areaType=nation;areaName=england&' +
'structure={"date":"date", "cumCases":"cumCasesByPublishDate", "new":"newCasesByPublishDate"}')
.then(response => {
  if(!response.ok) {
    throw Error("ERROR")
  }
  return response.json()
  
})
.then(data => {
  console.log(data)
    xArray = []
    yArray = []
  function pushData(array, value) {
    for(i=0;i<data.data.length;i++) {
    newArray = array.push(data.data[i][value]);
    
    }

    return newArray;
  }

  
  var layout = {
    autosize: true,
    title: 'Total covid cases in the UK',
    paper_bgcolor:"#d0f2ec",
    plot_bgcolor:"#d0f2ec",
    width: 500,
    height: 280,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 2
    }
  }
  pushData(xArray, 'date')
  pushData(yArray, 'cumCases')
    Plotly.plot('chart', [{
        x: xArray,
        y: yArray,
        type:'line'
      }] , layout)
  
      let newCases = document.getElementById('todayCases');
      caseData =data.data[0].new.toString();
      console.log(caseData);
      newCases.innerHTML = caseData;

      const animationDuration = 2000;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round( animationDuration / frameDuration );

      
      easeOutQuad = t => t * ( 2 - t );

      animateCountUp = el => {

        let frame = 0 

        const countTo = parseInt(el.innerHTML, 10);

        const counter = setInterval(() => {

          frame++;
          const progress = easeOutQuad( frame / totalFrames );
          const currentCount = Math.round( countTo * progress );


          if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
            el.innerHTML = currentCount;
          }

          if ( frame === totalFrames ) {
            clearInterval( counter );
          }
        }, frameDuration );

      
      }

      uk.addEventListener("click", function() {

        animateCountUp(newCases);
        
      })

     


})
.catch(err => {
	console.error(err);
});
