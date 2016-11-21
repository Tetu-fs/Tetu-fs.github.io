
var testObj = {
  clickCount: 0,
  mouseEvent: $(function() {
    $('#test').click(function() {
      testObj.clickCount++;
      if (testObj.clickCount > 1) {
        if (testObj.clickCount < 10) {
          $(this).text(testObj.clickCount + "回もクリックされるなんて");
        }
        else if (testObj.clickCount < 25) {
          $(this).text(testObj.clickCount + "回のクリックで肩こりが取れ始めた");
        }
        else if (testObj.clickCount < 50) {
          $(this).text(testObj.clickCount + "回で肩こり腰痛首の痛みが治った");
        }
        else if (testObj.clickCount < 75) {
          $(this).text(testObj.clickCount + "回を過ぎたあたりから逆にまた痛くなってきている");
        }
        else if (testObj.clickCount < 100) {
          $(this).text(testObj.clickCount + "回を超え流石にそろそろやめてほしいと思っている");
        }
        else if (testObj.clickCount >= 100) {
          $(this).text("ほかにすることないの？");
        }
      }
      else {
        $(this).text("クリックされてしまった");
        testObj.isClicked = true;
      }
    })
    console.log(testObj.isClicked)
    $('#test').mouseover(function() {
      if (testObj.clickCount === 0) {
        $(this).text("クリックされてしまいそうだ");
      }
    })
    $('#test').mouseout(function() {
      if (testObj.clickCount === 0) {
        $(this).text("クリックの危機を脱した");
      }
    })
  })
}