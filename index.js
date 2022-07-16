const data = {
  "Exam Fee": {
    INDIAN: {
      " ALL_COURSES ": {
        " ALL_LEVEL ": {
          amount: 400,
        },
      },
    },
    FOREIGN: {
      " ALL_COURSES ": {
        " ALL_LEVEL ": {
          amount: 100,
        },
      },
    },
    NRI: {
      " ALL_COURSES ": {
        " ALL_LEVEL ": {
          amount: 600,
        },
      },
    },
    SAARC: {
      " ALL_COURSES ": {
        " ALL_LEVEL ": {
          amount: 600,
        },
      },
    },
  },
  "Application Fee": {
    INDIAN: {
      " ALL_COURSES ": {
        UG: {
          amount: 200,
        },
        "UG-DIPLOMA": {
          amount: 300,
        },
        PG: {
          amount: 500,
        },
      },
    },
    FOREIGN: {
      " ALL_COURSES ": {
        UG: {
          amount: 400,
        },
        "UG-DIPLOMA": {
          amount: 400,
        },
        PG: {
          amount: 700,
        },
      },
    },
  },
};

let fee = [];
for (let key in data) {
  fee.push(key);
}
var ele = document.getElementById("slct1");
for (var i = 0; i < fee.length; i++) {
  ele.innerHTML =
    ele.innerHTML +
    '<option value="' +
    fee[i].toLowerCase() +
    '">' +
    fee[i] +
    "</option>";
}

function populate(s1, s2) {
  var s1 = document.getElementById(s1);
  var s2 = document.getElementById(s2);
  s2.innerHTML = "";
  let arr = [];
  if (s1.value == "exam fee") {
    for (let key in data["Exam Fee"]) {
      let str = key;
      arr.push(`${str.toLowerCase()}|${key}`);
    }
  } else if (s1.value == "application fee") {
    for (let key in data["Application Fee"]) {
      let str = key;
      arr.push(`${str.toLowerCase()}|${key}`);
    }
  }
  for (var option in arr) {
    var pair = arr[option].split("|");
    var newoption = document.createElement("option");
    newoption.value = pair[0];
    newoption.innerHTML = pair[1];
    s2.options.add(newoption);
  }
}

var form = document.getElementById("form");

let fees;
let nationality;
let courses;
let levels;
form.addEventListener("submit", function (event) {
  event.preventDefault();
  fees = document.getElementById("slct1").value;
  nationality = document.getElementById("slct2").value;
  courses = document.getElementById("slct3").value;
  levels = document.getElementById("slct4").value;
  let value;
  let selectedfees = Object.keys(data);
  let feesIndex;

  for (let i = 0; i < selectedfees.length; i++) {
    if (fees.toLowerCase() == selectedfees[i].toLowerCase()) {
      feesIndex = i;
      break;
    }
  }
  const values = Object.values(data)[feesIndex];
  for (let i = 0; i < Object.keys(values).length; i++) {
    if (nationality.toLowerCase() == Object.keys(values)[i].toLowerCase()) {
      const value1 = Object.values(values)[i];
      const value2 = Object.values(value1)[0];
      const value3 = Object.keys(value2);
      if (value3.length == 1) {
        const amount = Object.values(value2)[0];
        value = Object.values(amount)[0];
      } else {
        let index = value3.indexOf(levels.toUpperCase());
        if (index > -1) {
          console.log(value2);
          const amount = Object.values(value2)[index];
          value = Object.values(amount)[0];
        }
      }
    }
  }
  const fe = document.getElementById("fees");
  fe.innerHTML = undefined ? "please enter a valid level" : value;
});
