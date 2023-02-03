const nameCard = document.getElementById("name");
const numberCard = document.getElementById("number");
const monthCard = document.getElementById("month");
const yearCard = document.getElementById("year");
const cvcCard = document.getElementById("cvc");

nameCard.oninput = () => {
  document.querySelector(".card-front-bot-name").innerText = nameCard.value;
};

// Input card number
numberCard.oninput = (e) => {
  e.target.value = patternMatch({
    input: e.target.value,
    template: "xxxx xxxx xxxx xxxx",
  });

  document.querySelector(".card-front-number").innerText = e.target.value;
};
// write function to format card number
function patternMatch({ input, template }) {
  try {
    let j = 0;
    let plaintext = "";
    let countj = 0;
    while (j < template.length) {
      if (countj > input.length - 1) {
        template = template.substring(0, j);
        break;
      }

      if (template[j] == input[j]) {
        j++;
        countj++;
        continue;
      }

      if (template[j] == "x") {
        template =
          template.substring(0, j) + input[countj] + template.substring(j + 1);
        plaintext = plaintext + input[countj];
        countj++;
      }
      j++;
    }

    return template;
  } catch {
    return "";
  }
}
// Format month card
monthCard.oninput = () => {
  if (monthCard.value.length > 2) {
    monthCard.value = monthCard.value.slice(0, 2);
  }
  document.querySelector("#card-front-bot-month").innerText = monthCard.value;
};

// Format year card
yearCard.oninput = () => {
  if (yearCard.value.length > 2) {
    yearCard.value = yearCard.value.slice(0, 2);
  }
  document.querySelector("#card-front-bot-year").innerText = yearCard.value;
};
// Format cvc card
cvcCard.oninput = () => {
  if (cvcCard.value.length > 3) {
    cvcCard.value = cvcCard.value.slice(0, 3);
  }
  document.querySelector("#card-back-cvc").innerText = cvcCard.value;
};
// SUBMIT

// check blank
document.querySelector("#submit").addEventListener("click", function (e) {
  e.preventDefault();
  var check = 0;
  const inputValue = document.querySelectorAll("input");
  inputValue.forEach(function (input) {
    if (!input.value) {
      input.classList.add("wrongborder");
      input.parentElement.classList.add("wrongMess");
      check += 1;
    } else {
      input.classList.remove("wrongborder");
      input.parentElement.classList.remove("wrongMess");
    }
  });
  // check number or not
  const strings = numberCard.value;
  for (let key in strings) {
    if (charIsLetter(strings[key])) {
      numberCard.parentElement.classList.add("notNumber");
      check += 1;
      break;
    } else {
      numberCard.parentElement.classList.remove("notNumber");
    }
  }
  // function checks number
  function charIsLetter(char) {
    if (typeof char !== "string") {
      return false;
    }
    return char.toLowerCase() !== char.toUpperCase();
  }
  // inform success wwhen everything oke
  if (check === 0) {
    document.querySelector("form").classList.add("hide");
    document.querySelector(".success").classList.add("unHide");
  }
});
// reload page when click button
document.getElementById("continue").addEventListener("click", function () {
  location.reload();
});
