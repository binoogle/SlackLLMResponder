
# Google Apps Script Slack Bot with LLM Integration

このプロジェクトは、言語モデル（LLM）のAPIを利用したSlackボットを作成するGoogle Apps Scriptです。このボットはSlackチャンネルでのメンションをリスンし、指定されたLLMを使用して応答します。

## 特徴

- Slackチャンネルでのメンションをリスンします。
- 指定されたLLMを使用して応答を生成します。
- スクリプトプロパティを通じて設定可能です。

## セットアップ

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/binoogle/SlackLLMResponder.git
   cd your-repo-name
   ```

2. **Google Apps Scriptの設定**
   - Google Apps Scriptエディタを開きます。
   - 新しいプロジェクトを作成し、`src`ディレクトリの内容をエディタにコピーします。

3. **スクリプトプロパティの設定**
   プロジェクト設定から、スクリプトプロパティの設定を行って下さい。
   - LLM_API_KEY: API KEY を入れて下さい。
   - LLM_MODEL: モデル名。当然存在しないモデルを入れるとエラーになると思います。
   - SYSTEM_PROMPT: System Prompt を書きます。書かなくてもいいですが、LLMによっては「Answer in Japanese language.」くらいのことを書いておかないと日本語では返事してもらえません。
   - LLM_ENDPOINT: LLMのエンドポイントのURLを入れて下さい。
   - SLACK_BOT_TOKEN: SlackAPIのページから取得したトークンを入れて下さい。


4. **Webアプリとしてデプロイ**
   - Google Apps Scriptエディタで「デプロイ」 > 「新しいデプロイ」を選択します。
   - 「ウェブアプリ」を選択し、最新バージョンをデプロイします。

5. **Slackアプリの設定**
   - Slack APIダッシュボードから新しいSlackアプリを作成します。
   - ボットトークンとイベントサブスクリプションを設定します。

## 使用方法

- ボットが招待された任意のSlackチャンネルでメンションすると、設定されたLLMを使用して応答します。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。
