fetch("https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true", {
	"method": "GET"
	}
)
.then(response => {
  if(!response.ok) {
    throw Error("ERROR")
  }
  return response.json()
  
})
.then(data => {
  console.log(data)
  const countrySelect = document.getElementById("countrySelect")
  if (countrySelect.childNodes.length == 0) {
  for(i=0;i<data.length;i++){
    countrySelect.innerHTML = countrySelect.innerHTML +  "<option id='" + i + "' value='" + i + "'>" + data[i].country + "</option>" ;
  }

  countrySelect.addEventListener('change', function() {
    infectedStat = document.getElementById('infectedStat');
    recoveredStat = document.getElementById('recoveredStat');
    deceasedStat = document.getElementById('deceasedStat');
  
    infectedStat.innerHTML = data[countrySelect.value].infected;
    recoveredStat.innerHTML = data[countrySelect.value].recovered;
    deceasedStat.innerHTML = data[countrySelect.value].deceased;
  })
  
  let infectedStat = document.getElementById('infectedStat')
  let recoveredStat = document.getElementById('recoveredStat')
  let deceasedStat = document.getElementById('deceasedStat')
  let RR = document.getElementById('RR')
  let DR = document.getElementById('DR')



countrySelect.addEventListener('change', function () {
  
  infectedNum = Number(infectedStat.innerHTML)
  recoveredNum = Number(recoveredStat.innerHTML)
  deceasedNum = Number(deceasedStat.innerHTML)

  initRR = (recoveredNum/infectedNum) * 100;
  initDR = (deceasedNum/infectedNum) * 100;

  RR.innerHTML = initRR.toFixed(1) + "%"
  DR.innerHTML = initDR.toFixed(1) + "%"
  
  progressBar(infectedNum,infectedNum);
  progressBar2(recoveredNum, infectedNum)
  progressBar3(deceasedNum, infectedNum)


  });
}

})
.catch(err => {
	console.error(err);
});
