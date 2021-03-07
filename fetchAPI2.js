fetch("https://api.nhs.uk/conditions/coronavirus-covid-19?url=corona app&modules=true", {
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

  overview = document.getElementById('overview');
  symptoms = document.getElementById('symptoms');
  selfIsolation = document.getElementById('selfIsolation');
  treatments = document.getElementById('treatments');
  selfCare = document.getElementById('SelfCare');
  prevention = document.getElementById('prevention');

  overview.innerHTML = data.modules[0].description;
  symptoms.innerHTML = data.modules[1].description;
  selfIsolation.innerHTML = data.modules[2].description;
  treatments.innerHTML = data.modules[3].description;
  selfCare.innerHTML = data.modules[4].description;
  prevention.innerHTML = data.modules[6].description;
  

})
.catch(err => {
	console.error(err);
});
