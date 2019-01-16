var Logger = BetterLog.useSpreadsheet("", "Logs");
// メイン処理
function pingSitemap() {
  Logger.info("pingSitemap START");
  
  // configシートオブジェクトを取得
  var sitemapUrls = Utils.getColumValues("config", "A", 1);
  // ping送信先を取得
  var pingTargets = Utils.getColumValues("config", "B", 1);
  
  // -------------------------------------------------------
  // サイトマップ * ping対象domain 数分繰り返す
  // ---------------
  var errors = new Array();
  for each (var sitemapUrl in sitemapUrls) {
    for each (var target in pingTargets) { 
      try {
        var requestUrl = target + "?sitemap=";
        var requestUrl = requestUrl + encodeURIComponent(sitemapUrl);
        Logger.info("URL:>>>" + sitemapUrl + "|Target:>>>" + target);
        // GETリクエスト
        var response = UrlFetchApp.fetch(requestUrl);
        Logger.info("ResponseCode:>>" + response.getResponseCode());
      } catch (ex) {
        errors.push("Message: " + ex.message + "\r\nFile: " + ex.fileName + "\r\nLine: " + ex.lineNumber + "\r\n");
      }
    }
  }
  // エラーが発生した場合は、メール送付
  if(errors.length > 0) {
      var recipients = Utils.getColumValues("config", "C", 1);
      Utils.sendEmails(recipients, "Ping sitemap error report", errors.join("\r\n"));
  }
  Logger.info("pingSitemap END");
}

function setUp() {
  // 前回登録データを初期化
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("config");
  if (sheet == null) {
    var sheet = ss.insertSheet("config");
    sheet.getRange("A1").setValue("Sitemap url");
    sheet.getRange("A1").setBackground("lightsteelblue");
    sheet.getRange("B1").setValue("Ping target");
　　　　  sheet.getRange("B1").setBackground("lightsteelblue");
    sheet.getRange("C1").setValue("Mail to");
　　　　  sheet.getRange("C1").setBackground("lightsteelblue");
  }
}
