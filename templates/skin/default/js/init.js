/*
  Autofields plugin
  (P) Rafrica.net team, 2010
  http://we.rafrica.net
*/

function getElementComputedStyle (elem, prop) {
  if (typeof elem != "object") elem = $ (elem);
  // external stylesheet for Mozilla, Opera 7+ and Safari 1.3+
  if (document.defaultView && document.defaultView.getComputedStyle) {
    if (prop.match(/[A-Z]/)) prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
    return document.defaultView.getComputedStyle(elem, "").getPropertyValue(prop);
  }
  // external stylesheet for Explorer and Opera 9
  if (elem.currentStyle) {
    var i;
    while ((i = prop.indexOf("-")) != -1) prop = prop.substr(0, i) + prop.substr(i + 1, 1).toUpperCase() + prop.substr(i + 2);
    return elem.currentStyle[prop];
  }
  return "";
}

// ---

function RealValue (elem, prop) {
  var CurValue = getElementComputedStyle (elem, prop);
  return parseInt (CurValue.substring (0, CurValue.length - 2));
}

//
//  Auto Field Size Changing
//  (P) Pou Le Serg, 2010
//  http://rafrica.net
//  http://pouleserg.com
//

function Autofields_DoObjectBiggerOrSmaller (ObjID, UpOrDown, MinSize, MaxSize, ChangeValue, ClearFarParent) {
  RealHeight = RealValue (ObjID, 'height');
  if (UpOrDown == 'up') {
    RealHeight += ChangeValue;
    if (RealHeight > MaxSize) return false;
  } else if (UpOrDown == 'down') {
    RealHeight -= ChangeValue;
    if (RealHeight < MinSize) return false;
  }
  if (ClearFarParent) $ (ObjID).getParent().getParent().getParent().style.height = '';
  $ (ObjID).style.height = RealHeight + 'px';
}

// ---

function Autofields_CountLines (ObjID) {
  LinesCount = 0;
  
  // count true lines and line length
  WidthOfLetterInPX = Autofields_OneLetterWidthPx;      // width of one letter in px. Choose manually (font)
  
  TTextValue = $ (ObjID).value;
  TTextLeng = TTextValue.length;
  CurrentStringCharCount = 0;   // chars per string
  for (ic = 0; ic < TTextLeng; ic ++) {
    if (TTextValue.charCodeAt (ic) == 10) {
      LinesCount ++;
      CurrentStringCharCount = 0;
    } else {
      CurrentStringCharCount ++;
      if ((((CurrentStringCharCount * WidthOfLetterInPX) / $ (ObjID).clientWidth) + 0.1) >= 1) {
        LinesCount ++;
        CurrentStringCharCount = 0;
      }
    }
  }
  if (TTextLeng > 0) {
    if ((TTextValue.charCodeAt (TTextLeng - 1) != 13) && (TTextValue.charCodeAt (TTextLeng - 1) != 10)) LinesCount ++;
  }
  
  // count char number/perline
  NumLines = parseInt ((($ (ObjID).textLength * WidthOfLetterInPX ) / $ (ObjID).clientWidth) + 0.1);
  if (NumLines > LinesCount) LinesCount = NumLines;
  return LinesCount;
}

// --- text fields init ---

function Autofields_CheckUpTextFields (TFieldID, MinHeightValue, MaxHeightValue, TClearFarParent) {
  TextFieldID = $ (TFieldID);
  
  LinesOn50px = Autofields_ChangeLinesCount;  // 3 lines on 50px (height)
  LinesByPX = Autofields_ChangeLinesHeight;   // 3 lines on 50px
  
  if (TextFieldID != null) {
    TextFieldID.onkeyup = function () {
      CurTextFieldLines = Autofields_CountLines (TFieldID);
      
      CurRealHeight = RealValue (TFieldID, 'height');
      PossibleLines = (CurRealHeight / LinesByPX) * LinesOn50px;      // 3 lines on 50px

      if ((CurTextFieldLines + 1) >= PossibleLines) {
        // do bigger
        Autofields_DoObjectBiggerOrSmaller (TFieldID, 'up', MinHeightValue, MaxHeightValue, LinesByPX, TClearFarParent);
      } else if ((PossibleLines - LinesOn50px - 1) > CurTextFieldLines) {
        // do smaller
        Autofields_DoObjectBiggerOrSmaller (TFieldID, 'down', MinHeightValue, MaxHeightValue, LinesByPX, TClearFarParent);
      }
    }
  }
}

//
//  Auto Field Size Changing
//  (P) Pou Le Serg, 2010
//  http://rafrica.net
//  http://pouleserg.com
//
