addEventListener('load', () => {
  const table = document.querySelector('table');
  const form = document.querySelector('form');

  table.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
      table.deleteRow(e.target.parentNode.parentNode.rowIndex);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitText = document.getElementById('submitText').value;
    if(isValidSSN(submitText)) {
      addRowToTable(submitText);
      document.getElementById('errorMessage').style.visibility = 'collapse';
    } else {
      document.getElementById('errorMessage').style.visibility = 'visible';
    }

    function addRowToTable(ssn) {
      const row = table.insertRow(1);
      const pnCell = row.insertCell(0);
      pnCell.className = "tableColumn-1";
      const ageCell = row.insertCell(1);
      ageCell.className = "tableColumn-2";
      const removeCell = row.insertCell(2);
      removeCell.className = "tableColumn-3";
      pnCell.innerHTML = ssn;
      ageCell.innerHTML = calculateAge(ssn);
      const removeButton = document.createElement('button');
      removeButton.textContent = 'X';
      removeCell.appendChild(removeButton);
    }

    function calculateAge(ssn) {
      const currentDate = new Date();
      const dateToCheck = convertToDate(ssn);
      let yearDifference = currentDate.getFullYear() - dateToCheck.getFullYear();
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
      const year = ssn.slice(0,4);
      const month = ssn.slice(4,6)-1;
      const day = ssn.slice(6,8);
      const date = new Date(year, month, day);
      return date;
    }

    function isValidSSN(ssn) {
      if(/\d{8}[-]?\d{4}/.test(ssn)) {
        let stripedSSN = ssn.slice(2)
        stripedSSN = stripedSSN.replace(/[^0-9]/, '');
        let sum = 0;
        let multiplier = 2;
        for(let i = 0; i < stripedSSN.length-1; i++) {
          const currentNumber = stripedSSN[i];
          const calculatedNumber = currentNumber * multiplier
          sum += (calculatedNumber >= 10) ? calculatedNumber % 10 + 1 : calculatedNumber;
          multiplier = (multiplier === 2) ? 1 : 2;
        }
        const checkSum = (sum % 10 === 0) ? 0 : 10 - (sum % 10);
        const userCheckSum = stripedSSN.slice(-1);
        return checkSum == userCheckSum;
      }
      return false;
    }
  });
});
