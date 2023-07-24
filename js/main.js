var siteName = document.getElementById("site-name");
var siteUrl = document.getElementById("site-url");
var siteList = [];
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
var httpsRegex = /^https?:\/\//;

// ====================== Getting Data from Local Storage ======================
if (localStorage.getItem("website") != null) {
  siteList = JSON.parse(localStorage.getItem("website"));
  display();
} else {
  siteList = [];
}
// ====================== capitalize ==================
function capitalize(name) {
  var capName = name.split("");
  capName[0] = capName[0].toUpperCase();
  return capName.join("");
}
// ====================== Create ======================
function create() {
  var site = {};
  site = {
    name: siteName.value,
    url: siteUrl.value,
  };
  function checkName() {
    for (var i = 0; i < siteList.length; i++) {
      if (siteList[i].name.includes(siteName.value)) {
        return true;
      }
    }
  }

  if (checkName() == true) {
    alert("Please Enter Another Name for Your Bookmark ..");
  } else {
    if (
      validate(siteName, nameRegex) == true &&
      validate(siteUrl, urlRegex) == true
    ) {
      siteList.push(site);
      localStorage.setItem("website", JSON.stringify(siteList));
      siteName.classList.remove("is-valid");
      siteUrl.classList.remove("is-valid");
      display();
      reset();
    } else if (validate(siteName, nameRegex) == false) {
      alert("Your Name must be more than 3 letters .. ");
    } else {
      alert("Your URL is not Valid ..");
    }
  }
}

// ====================== Display ======================
function display() {
  var trs = ``;
  for (var i = 0; i < siteList.length; i++) {
    trs += `
    <tr>
      <td>${i + 1}</td>
      <td>${capitalize(siteList[i].name)}</td>
      <td><a id="link" onclick="visit(${i})" target="_blank">
        <button class="btn btn-outline-primary" >
        <i class="fa-solid fa-eye"></i> Visit
        </button>
        </a></td>
      <td>
        <button class="btn btn-outline-primary" onclick="deleteI(${i})">
        <i class="fa-solid fa-trash"></i> Delete
        </button>
      </td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = trs;
}

// ====================== Reset ======================
function reset() {
  siteName.value = "";
  siteUrl.value = "";
}

// ====================== Delete ======================
function deleteI(index) {
  siteList.splice(index, 1);
  localStorage.setItem("website", JSON.stringify(siteList));
  display();
}

// ====================== Validation ======================
function validate(element, regexE) {
  if (regexE.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

// ====================== Visit ======================
function visit(index) {
  if (httpsRegex.test(siteList[index].url)) {
    open(`${siteList[index].url}`);
  } else {
    open(`https://${siteList[index].url}`);
  }
}
