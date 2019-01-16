var Utils = {
  /**
   *  getColumValues
   *  列の値を配列で取得する
   **/
  getColumValues: function(sheetName, columnName, startIndex) {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var　sheet = ss.getSheetByName(sheetName);
      var values =　sheet.getRange(columnName + ":" + columnName).getValues();
      var result = new Array();
      for (var i = 0; i < values.length; i++) {
          if (i >= startIndex) { 
              if(values[i] != null && values[i] != "") {
                  result.push(values[i]);
              }
          }
        }
        return result;        
    },
  // シートオブジェクトを取得する
  getSheet: function(sheetName) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    return ss.getSheetByName(sheetName);
  },
  /**
   *  sendEmails
   *  メール送付
   **/
  sendEmails: function(recipients, subject, body) {
    for each (var recipient in recipients) {
　　　　      MailApp.sendEmail(recipient, subject, body);
    }
  }
};
