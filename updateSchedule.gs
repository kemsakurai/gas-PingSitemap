var KEY = "trigger";
var FUNCTION_NAME = "pingSitemap";

var weekDay = [ScriptApp.WeekDay.MONDAY, 
               ScriptApp.WeekDay.TUESDAY, 
               ScriptApp.WeekDay.WEDNESDAY,
               ScriptApp.WeekDay.THURSDAY,
               ScriptApp.WeekDay.FRIDAY,
               ScriptApp.WeekDay.SATURDAY,
               ScriptApp.WeekDay.SUNDAY
              ]

function updateSchedule(formData) {
  var formData = toJson_(formData);
  Logger.log(JSON.stringify(formData))
  if (formData != null) {
    if (formData.automate == 0) {
      deleteTrigger_();
    } else if (formData.automate == 1) {
      if (formData.interval == 0) {
        deleteTrigger_();
        var triggerId = ScriptApp.newTrigger(FUNCTION_NAME).timeBased().everyHours(1).create().getUniqueId();
        setTrigger_(triggerId);        
      } else if (formData.interval == 1) {
        deleteTrigger_();
        var triggerId = ScriptApp.newTrigger(FUNCTION_NAME).timeBased()
        .atHour(formData.hourOfDay)
        .everyDays(1)
        .inTimezone(Session.getTimeZone())
        .create().getUniqueId();
        setTrigger_(triggerId);
      } else if (formData.interval == 2) {
        deleteTrigger_();
        var triggerId = ScriptApp.newTrigger(FUNCTION_NAME).timeBased()
        .onWeekDay(weekDay[formData.dayOfWeek])
        .atHour(formData.hourOfDay)
        .nearMinute(30)
        .create().getUniqueId();
        setTrigger_(triggerId);
      } else if (formData.interval == 3) {
        deleteTrigger_();
        var triggerId = ScriptApp.newTrigger(FUNCTION_NAME).timeBased()
        .onMonthDay(formData.dayOfMonth)
        .atHour(formData.hourOfDay)
        .nearMinute(30)
        .create().getUniqueId();
        setTrigger_(triggerId);
      } else {
        throw new Error("Illegal Argments...");
      }
    }
  }  
}

//serializeArrayをjsonに変換する
function toJson_(formData) {
  var result = {};
  var automateValue = 0;
  formData.forEach(function(elem, i) {
    if(elem["name"] == "automate" && elem["value"] == 1) {
      automateValue = 1;
    }
    result[elem.name] = elem.value;
  });
  result["automate"] = automateValue;
  return result;
}

//指定したkeyに保存されているトリガーIDを使って、トリガーを削除する
function deleteTrigger_() {
  var triggerId = PropertiesService.getScriptProperties().getProperty(KEY);
  if(!triggerId) return;
  ScriptApp.getProjectTriggers().filter(function(trigger){
    return trigger.getUniqueId() == triggerId;
  })
  .forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
  });
  PropertiesService.getScriptProperties().deleteProperty(KEY);
}

//トリガーを発行
function setTrigger_(triggerId){ 
  //あとでトリガーを削除するためにトリガーIDを保存しておく
  PropertiesService.getScriptProperties().setProperty(KEY, triggerId);
}
