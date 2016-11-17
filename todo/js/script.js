var todoData = function(id, title, task, setDate, limit) {
  this.id = id;
  this.title = title;
  this.task = task;
  this.setDate = setDate;
  this.limit = limit;
}

var myObj =
  {
    todoList: new Array(),
    todoCount: 0,
    todoSetup: function(limitLabel, title, task) {
      var today = new dateObj(new Date());
      var todayLabel = today.year + "/" + (today.month + 1) + "/" + today.today;
      var newTodo = new todoData(myObj.todoCount, title, task, todayLabel, limitLabel);

      var navi = document.getElementById("content");
      var todoElement = myObj.cardGenerator(newTodo);
      var todoObj = { "id": newTodo.id, "todo": newTodo, "elem": todoElement };
      myObj.todoList.push(todoObj);

      navi.appendChild(todoElement);
      myObj.todoCount++;
    },
    cardGenerator: function(todo) {
      var listLabel = document.createElement("h2");
      var listTitle = document.createTextNode(todo.title);
      var removeButton = document.createElement("button");
      removeButton.appendChild(document.createTextNode("X"));
      removeButton.className = "removecard";
      removeButton.addEventListener("click", myObj.removeCard, false);
      listLabel.appendChild(listTitle);
      listLabel.appendChild(removeButton);

      listLabel.addEventListener("click", myObj.openCard, false);;

      var ul = document.createElement("ul");
      var newDate = document.createElement("h3");
      var dateLabel = document.createTextNode(todo.limit);
      newDate.appendChild(dateLabel);

      var list = document.createElement("li");
      list.appendChild(newDate);
      ul.appendChild(listLabel);
      ul.appendChild(list);
      return ul;
    },
    removeCard: function(event) {
      var removeElement = event.target.parentNode.parentNode;
      for (var i = 0; i < myObj.todoList.length; i++) {
        if (myObj.todoList[i].elem === removeElement) {
          myObj.todoList[i].splice;
          removeElement.remove();
        }
      }
    },
    setEventListner: function() {
      window.addEventListener("beforeunload", myObj.formReset, false);
      document.getElementById("settodo").addEventListener("click", myObj.getformData, false);
      var closeAreas = document.getElementsByClassName("closearea");
      for (var i = 0; i < closeAreas.length; i++) {
        closeAreas[i].addEventListener("click", myObj.closeModal, false);
      }
      var inputAreas = document.getElementsByClassName("dateinput");
      for (var i = 0; i < inputAreas.length; i++) {
        inputAreas[i].addEventListener("click", calendarObj.toggleCalendar, false);
      }
    },
    getformData: function(event) {
      var formChildren = document.getElementsByClassName("taskinput");
      var formDatas = new Array();
      for (var i = 0; i < formChildren.length; i++) {
        formDatas.push(formChildren[i].value);
      }
      var year = formDatas[0];
      var month = formDatas[1];
      var date = formDatas[2];
      var title = formDatas[3];
      var task = formDatas[4];
      var isChecked = true;
      var limidate;
      if (year !== "" && month !== "" && date !== "") {
        limidate = year + "年" + month + "月" + date + "日";
      }
      else if (year !== "" && month !== "" && date === "") {
        limidate = year + "年" + month + "月";
      }
      else if (year === "" && month !== "" && date !== "") {
        year = new Date().getFullYear();
        limidate = year + "年" + month + "月" + date + "日";
      }
      else if (year === "" && month === "" && date === "") {
        limidate = "なし";
      }
      else {
        isChecked = false;
      }
      var limitDayLabel = "期限 : " + limidate;

      if (title !== "" && isChecked) {
        myObj.todoSetup(limitDayLabel, title, task);
        myObj.formReset();
      } else {
        alert("タイトルまたは期限を確認してください。");
      }
    },
    formReset: function(event) { document.getElementById("taskform").reset(); },
    openCard: function(event) {
      var todo;
      for (var i = 0; i < myObj.todoList.length; i++) {
        if (myObj.todoList[i].elem === event.target.parentNode) {
          todo = myObj.todoList[i].todo;
        }
      }
      var modalWrap = document.getElementById("todomodalwrap");
      var modal = document.createElement("div");
      modal.id = "todomodal";

      var title = document.createElement("h1");
      var limit = document.createElement("h2");
      var info = document.createElement("div");
      var setDate = document.createElement("p");

      var titleText = document.createTextNode(todo.title);
      var limitLabel = document.createTextNode(todo.limit);
      var infoText = document.createTextNode(todo.task);
      var setDateLabel = document.createTextNode("作成日 : " + todo.setDate);

      title.appendChild(titleText);
      limit.appendChild(limitLabel);
      info.appendChild(infoText);
      setDate.appendChild(setDateLabel);
      modal.appendChild(title);
      modal.appendChild(limit);
      modal.appendChild(info);
      modal.appendChild(setDate);
      modalWrap.appendChild(modal);
      modalWrap.className = "show";
    },
    closeModal: function(event) {
      document.getElementById("todomodal").remove();
      event.target.parentNode.className = "hide";
    }
  }

var dateObj = function(date) {
  this.year = date.getFullYear();
  this.month = date.getMonth();
  this.today = date.getDate();
  this.day = date.getDay();
  this.thisMonthDay = new Date(this.year, this.month + 1, 0, 0, 0, 0, 0).getDate();
  this.thisMonthStartDay = new Date(this.year, this.month, 1, 0, 0, 0, 0).getDay();
  this.formatDate = this.year + "/" + (this.month + 1) + "/" + this.day;
}
var calendarObj = {
  toggleCalendar: function(event) {
    var modalWrap = document.getElementById("calendarmodalwrap");
    modalWrap.className = modalWrap.className === "hide" ? "show" : "hide";
    calendarObj.setupCalender();
  },
  isInit: false,
  nowShowDateData: null,
  nowInstanceList: new Array(),
  weekDays: ["日", "月", "火", "水", "木", "金", "土"],
  setupCalender: function(event, newDate, isNext) {
    var innerwrap = document.getElementById("innerwrap");
    if (typeof newDate == "undefined") {
      newDate = new Date();
    }
    else {
      innerwrap.className = isNext ? "goodbye" : "comeon";
    }

    if (calendarObj.isInit) {
      setTimeout(function() {
        innerwrap.className = "default";

        if (calendarObj.nowInstanceList.length > 0) {
          for (var i = 0; i < calendarObj.nowInstanceList.length; i++) {
            calendarObj.nowInstanceList[i].remove();
          }
          calendarObj.nowInstanceList = [];
        }
        calendarObj.calendarGenerator(newDate);
      }, 250);
    }
    else {
      calendarObj.calendarGenerator(newDate);
      innerwrap.className = "default";
      calendarObj.isInit = true;
    }
  },
  calendarGenerator: function(newDate) {
    var newDateData = new dateObj(newDate);
    calendarObj.nowShowDateData = newDateData;

    var beforDate = new Date(calendarObj.nowShowDateData.year, calendarObj.nowShowDateData.month - 1, 1, 0, 0, 0, 0);
    var befourDateData = new dateObj(beforDate);

    var nextDate = new Date(calendarObj.nowShowDateData.year, calendarObj.nowShowDateData.month + 1, 1, 0, 0, 0, 0);
    var nextDateData = new dateObj(nextDate);

    var befourCalendar = calendarObj.newCalenderDiv(befourDateData);
    var nowCalendar = calendarObj.newCalenderDiv(newDateData);
    var nextCalendar = calendarObj.newCalenderDiv(nextDateData);

    calendarObj.nowInstanceList.push(befourCalendar, nowCalendar, nextCalendar);

    innerwrap.appendChild(befourCalendar);
    innerwrap.appendChild(nowCalendar);
    innerwrap.appendChild(nextCalendar);
  },
  getThisMonthCalenderData: function(setDateData) {
    var allDays = new Array();
    var befourMonthDays = new Array();
    var thisMonthDays = new Array();
    var afterMonthDays = new Array();
    var dayObject = {};
    for (var i = 0; i < 7; i++) {
      dayObject = { "day": calendarObj.weekDays[i], "class": "notDate" };
      allDays.push(dayObject);
    }
    for (var i = 0; i < 7; i++) {
      if (setDateData.thisMonthStartDay > i) {
        var befourDay = new Date(setDateData.year, setDateData.month, (0 - i), 0, 0, 0, 0);
        var day = befourDay.getDate();
        dayObject = { "day": day.toString(), "class": "anothermonth" };
        befourMonthDays.unshift(dayObject);
      }
    }
    for (var d = 0; d < setDateData.thisMonthDay; d++) {
      dayObject = { "day": (d + 1).toString(), "class": "filled" };

      thisMonthDays.push(dayObject);
    }
    var afterDays = 42 - (befourMonthDays.length + thisMonthDays.length);
    for (var i = 0; i < afterDays; i++) {
      dayObject = { "day": (i + 1).toString(), "class": "anothermonth" };
      afterMonthDays.push(dayObject);
    }
    allDays = allDays.concat(befourMonthDays, thisMonthDays, afterMonthDays);
    return allDays;
  },
  newCalenderDiv: function(setDateData) {
    var labelDiv = document.createElement("div");
    labelDiv.id = "labeldiv"
    var prevButton = document.createElement("button");
    prevButton.id = "prevbutton"
    var nextButton = document.createElement("button");
    nextButton.id = "nextbutton"
    var prevLabel = document.createTextNode("<");
    var nextLabel = document.createTextNode(">");
    prevButton.appendChild(prevLabel);
    nextButton.appendChild(nextLabel);
    prevButton.addEventListener("click", calendarObj.prevMonth);
    nextButton.addEventListener("click", calendarObj.nextMonth);
    var yearAndMonthLabel = document.createElement("span");
    yearAndMonthLabel.id = "yearandmonth";

    var yearAndMonthLabelText = document.createTextNode(setDateData.year + "/" + (setDateData.month + 1));

    yearAndMonthLabel.appendChild(yearAndMonthLabelText);
    labelDiv.appendChild(prevButton);
    labelDiv.appendChild(yearAndMonthLabel);
    labelDiv.appendChild(nextButton);

    var wrapDiv = document.createElement("div");
    wrapDiv.id = "calendarwrap";
    wrapDiv.appendChild(labelDiv);
    var table = document.createElement("table");
    table.id = "calendar";
    var allDays = calendarObj.getThisMonthCalenderData(setDateData);

    var tr;
    for (var i = 0; i < 49; i++) {
      if (i === 0 || i % 7 === 0) {
        tr = document.createElement("tr");
        table.appendChild(tr);
      }
      var textNode = document.createTextNode(allDays[i]["day"]);
      if (i < 7) {
        var th = document.createElement("th");
        th.appendChild(textNode);
        tr.appendChild(th);
      }
      else {
        var td = document.createElement("td");
        td.appendChild(textNode);

        td.className = allDays[i]["class"] !== "notDate" ? allDays[i]["class"] : "";

        if (td.className === "filled") {
          td.addEventListener("click", calendarObj.setDataToForm);
          td.addEventListener("click", calendarObj.toggleCalendar, false);
        }
        tr.appendChild(td);
      }
    }
    wrapDiv.appendChild(table);
    return wrapDiv;
  },
  setDataToForm: function(event) {
    var year = calendarObj.nowShowDateData.year;
    var month = calendarObj.nowShowDateData.month;
    var date = event.target.innerText;
    var day = new Date(year, month, date).getDay();
    var inputYear = document.getElementById("inputyear");
    var inputMonth = document.getElementById("inputmonth");
    var inputDate = document.getElementById("inputdate");
    inputYear.value = year;
    inputMonth.value = month + 1;
    inputDate.value = date;
  },
  prevMonth: function() {
    var prev = new Date(calendarObj.nowShowDateData.year, calendarObj.nowShowDateData.month - 1, 1, 0, 0, 0, 0);
    calendarObj.setupCalender(null, prev, false);
  },
  nextMonth: function() {
    var next = new Date(calendarObj.nowShowDateData.year, calendarObj.nowShowDateData.month + 1, 1, 0, 0, 0, 0);
    calendarObj.setupCalender(null, next, true);
  }
}

document.addEventListener("DOMContentLoaded", myObj.setEventListner);
