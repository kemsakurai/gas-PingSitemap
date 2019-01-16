function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var addon = ui.createAddonMenu();
  addon.addItem('SetUp', 'onClickSetUp');
  addon.addItem('Run', 'onClickRun');
  addon.addItem('Schedule', 'onClickSchedule');  
  addon.addToUi();
}
 
function onInstall() {
  onOpen();
}

function onClickSetUp() {
  setUp();
}

function onClickRun() {
  pingSitemap();
}

function onClickSchedule() {
 var htmlOutput = HtmlService.createHtmlOutputFromFile("updateScheduleUi")
      .setWidth(600).setHeight(100);
 SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Schedule Ping');
}
