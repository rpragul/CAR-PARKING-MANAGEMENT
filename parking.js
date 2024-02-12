let addCarBtn = document.getElementById("addCar");
addCarBtn.addEventListener("click", addCarDetails);

let carDetailsArray = [];

function addCarDetails(event) {

    event.preventDefault();

    let owner = document.getElementById("owner").value;
    let car = document.getElementById("car").value;
    let registration_no = document.getElementById("registration_no").value;
    let licencePlate = document.getElementById("licencePlate").value;
    let entryDate = document.getElementById("entryDate").value;
    let exitDate = document.getElementById("exitDate").value;

    if (owner.trim() === "") {
        alert("Please enter the owner's name.");
        return;
    }

    if (car.trim() === "") {
        alert("Please enter the car model.");
        return;
    }

    if (registration_no.trim() === "") {
        alert("Please enter the registration_no");
        return;
    }



    if (licencePlate.trim() === "") {
        alert("Please enter the licence plate number.");
        return;
    }

    if (entryDate === "") {
        alert("Please select the entry date.");
        return;
    }

    if (exitDate === "") {
        alert("Please select the exit date.");
        return;
    }


    let carDetailObject = {
        owner: owner,
        car: car,
        registration_no: registration_no,
        licencePlate: licencePlate,
        entryDate: entryDate,
        exitDate: exitDate,
        isParked:true
    };

    carDetailsArray.push(carDetailObject);

    displayCarDetails();
    formatDate();
    
}

function displayCarDetails() {


    let displayCarDetails = document.getElementById("carDetails");

    displayCarDetails.innerHTML = "";

    carDetailsArray.forEach(function (carDetailObject) {
        let rowCar = document.createElement("div");

        rowCar.className = "row";

        rowCar.innerHTML = `
            <div class="col dis">${carDetailObject.owner}</div>
            <div class="col dis">${carDetailObject.car}</div>
            <div class="col dis">${carDetailObject.registration_no}</div>
            <div class="col dis">${carDetailObject.licencePlate}</div>
            <div class="col dis">${carDetailObject.entryDate}</div>
            <div class="col dis">${carDetailObject.exitDate}</div>
            <div class="col dis">${showStatus(carDetailObject)}</div>
            <div class="col dis">${makeBill(carDetailObject)}</div>
           
            
            <div class="col dis">
            <button class="btn btn-danger" onclick="removeCar(${carDetailsArray.indexOf(carDetailObject)})">Remove</button>
            </div>
        `;
        displayCarDetails.appendChild(rowCar);
    });


    // onclick="removeCar(${carDetailsArray.indexOf(carDetailObject)})"
    // clear input fields

    document.getElementById("owner").value = "";
    document.getElementById("car").value = "";
    document.getElementById("registration_no").value = "";
    document.getElementById("licencePlate").value = "";
    document.getElementById("entryDate").value = "";
    document.getElementById("exitDate").value = "";
    document.getElementById("isparked").value="";

}



function removeCar(index) {
    carDetailsArray.splice(index, 1);
    displayCarDetails();
    renterTable();
    showSummary(index);
}



// TIME EXECUTION


const minLicenseeLength = 7;
const payPerHour = 0.5;
const payFirstHour = 1;
const totalPlaces = 10;

function formatDate() {
    let date=new Date();
    var hours = date.getHours();
    console.log(hours);
    var minutes = date.getMinutes();
    console.log(minutes);
    var ampm = hours >= 12 ? 'PM' : 'AM';
    console.log(ampm);
    hours = hours % 12;
    console.log(hours);
    hours = hours ? hours : 12;
    console.log(hours);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    console.log(strTime);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + strTime;
}

formatDate();

function renterTable() {
    let results = '';
    for (var i = 0; i < carDetailsArray.length; i++) {
      let owner = carDetailsArray[i].owner;
     console.log(owner);
      let entryDate = formatDate(carDetailsArray[i].entryDate);
      
    
      let exitDate = carDetailsArray[i].exitDate === '-' ? '-' : formatDate(carDetailsArray[i].exitDate);
  
    }
    
  }

  function showStatus(carDetailObject) {
    return carDetailObject.isParked ? "Parked" : "Has left";
}

function changeStatus(event) {
    carDetailsArray[event.target.dataset.row].isParked = false;
  }
  

function calculateHoursBilled(carDetailObject) {
    let arrivedAt = new Date(carDetailObject.entryDate).getTime();
    let leftAt = new Date(carDetailObject.exitDate).getTime();
    return secondsToHours((leftAt - arrivedAt) / 1000); // duration in seconds
}
function makeBill(carDetailObject) {
    let hoursBilled = calculateHoursBilled(carDetailObject);
    let billValue = carDetailObject.isParked ? "-" : "$" + (payFirstHour + (hoursBilled - 1) * payPerHour);
    return billValue;
}
function secondsToHours(seconds) {
    return seconds / 3600; // 1 hour = 3600 seconds
}




function printSummary(event) {
    let car = carDetailsArray[event.target.dataset.row];
    let sumarryTable = '<table class="table table-bordered m-0">' +
          '<tr>' +
            '<td class="font-weight-bold">Registration number</td>' +
            `<td>${car.owner}</td>` +
          '</tr>' +
          '<tr>' +
            '<td class="font-weight-bold">Arrival</td>' +
            `<td>${formatDate(car.entryDate)}</td>` +
          '</tr>' +
          '<tr>' +
            '<td class="font-weight-bold">Departure</td>' +
            `<td>${formatDate(car.exitDate)}</td>` +
          '</tr>' +
          '<tr>' +
            '<td class="font-weight-bold">Billable hours</td>' +
            `<td>${calculateHoursBilled(car)}</td>` +
          '</tr>' +
          '<tr>' +
            '<td class="font-weight-bold">Bill value</td>' +
            `<td>${makeBill(car)}</td>` +
          '</tr>' +
        '</table>';
  
    document.querySelector('#summary').innerHTML = sumarryTable;
  }

  printSummary(event);
    
  function setLeaveTime(event) {
    carDetailsArray[event.target.dataset.row].leave = new Date(Date.now());
  }
  
  function showSummary(event) {
  
    
    printSummary(event);
  
    // Free the parking place, 3 seconds after the summary is released
    // setTimeout(function() {
    //   freeSpot(event);
    // }, 3000);
  }
  



