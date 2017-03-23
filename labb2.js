addEventListener('load', function () {
  document.getElementById('submitButton').addEventListener('click', onSsnSubmit);
  var table = document.getElementById("myTable");
  var savedPNS = [];

  function onSsnSubmit() {
    var submitText = document.getElementById('submitText').value;
    if(isValidSSN(submitText)) {
      savedPNS.push(submitText);
      addRowToTable(submitText);
      document.getElementById('errorMessage').style.visibility = 'collapse';
    } else {
      document.getElementById('errorMessage').style.visibility = 'visible';
    }
  }

  function addRowToTable(ssn) {
    var row = table.insertRow(1);
    var pnCell = row.insertCell(0);
    var ageCell = row.insertCell(1);
    pnCell.innerHTML = ssn;
    ageCell.innerHTML = calculateAge(ssn);
  }

  function calculateAge(ssn) {
    var currentDate = new Date();
    var dateToCheck = convertToDate(ssn);
    var yearDifference = currentDate.getFullYear() - dateToCheck.getFullYear();
    if(currentDate.getMonth() < dateToCheck.getMonth()) {
      yearDifference--;
    } else if(currentDate.getMonth() === dateToCheck.getMonth()) {
      if(currentDate.getDate() < dateToCheck.getDate()) {
        yearDifference--;
      }
    }
    return yearDifference;
  }

  function convertToDate(ssn) {
    var year = ssn.slice(0,4);
    var month = ssn.slice(4,6)-1;
    var day = ssn.slice(6,8);
    var asDate = new Date(year, month, day);
    return asDate;
  }

  function isValidSSN(ssn) {
    if(/\d{8}[-]?\d{4}/.test(ssn)) {
      var stripedSSN = ssn.slice(2)
      stripedSSN = stripedSSN.replace(/[^0-9]/, '');
      var sum = 0;
      var multiplier = 2;
      for(var i = 0; i < stripedSSN.length-1; i++) {
        var currentNumber = stripedSSN[i];
        var calculatedNumber = currentNumber * multiplier
        sum += (calculatedNumber >= 10) ? calculatedNumber % 10 + 1 : calculatedNumber;
        multiplier = (multiplier === 2) ? 1 : 2;
      }
      var checkSum = (sum % 10 === 10) ? 0 : 10 - (sum % 10);
      var userCheckSum = stripedSSN.slice(-1);
      return checkSum == userCheckSum;
    }
    return false;
  }
});
