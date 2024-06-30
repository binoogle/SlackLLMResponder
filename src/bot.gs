function doPost(e) {
  var json;
  try {
    json = JSON.parse(e.postData.contents);
  } catch (parseError) {
    return ContentService.createTextOutput("Error parsing request");
  }
  
  // Slackイベントの確認
  if (json.type === "url_verification") {
    return ContentService.createTextOutput(json.challenge);
  }

  // メンションイベントの処理
  if (json.event && json.event.type === "app_mention") {
    var text = json.event.text;
    var channel = json.event.channel;
    
    // LLM APIを呼び出して応答を生成
    var responseText;
    try {
      responseText = generateResponse(text);
    } catch (generateError) {
      return ContentService.createTextOutput("Error generating response");
    }
    
    // Slackにメッセージを送信
    try {
      postToSlack(channel, responseText);
    } catch (postError) {
      return ContentService.createTextOutput("Error posting to Slack");
    }
  }

  return ContentService.createTextOutput(JSON.stringify({status: "ok"}));
}

function generateResponse(prompt) {
  var apiKey = PropertiesService.getScriptProperties().getProperty('LLM_API_KEY');
  var model = PropertiesService.getScriptProperties().getProperty('LLM_MODEL');
  var systemPrompt = PropertiesService.getScriptProperties().getProperty('SYSTEM_PROMPT');
  var endpoint = PropertiesService.getScriptProperties().getProperty('LLM_ENDPOINT');
  
  var url = endpoint; // スクリプトプロパティからエンドポイントを取得
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'headers': {
      'Authorization': 'Bearer ' + apiKey
    },
    'payload' : JSON.stringify({
      'model': model,
      'messages': [
        {"role": "system", "content": systemPrompt},
        {"role": "user", "content": prompt}
      ],
      'max_tokens': 1500
    })
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());
    return json.choices[0].message.content.trim();
  } catch (error) {
    throw new Error("Error fetching response: " + error);
  }
}

function postToSlack(channel, text) {
  var slackToken = PropertiesService.getScriptProperties().getProperty('SLACK_BOT_TOKEN');
  var url = 'https://slack.com/api/chat.postMessage';
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'headers': {
      'Authorization': 'Bearer ' + slackToken
    },
    'payload' : JSON.stringify({
      'channel': channel,
      'text': text
    })
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
  } catch (error) {
    throw new Error("Error posting to Slack: " + error);
  }
}
