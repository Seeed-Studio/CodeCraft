# External Flash Loader library for Wio Terminal

[English page](./README.en.md)

## 概要

Wio TerminalのATSAMD51に接続されている外部フラッシュメモリに対してアクセスするためのArduino用ライブラリです。

また、ライブラリの機能を用いて、TFカードからアプリケーションを選択してロードするメニューアプリを書き込むためのサンプルスケッチも含みます。

TFカードからロードされるメインアプリケーションには、ボタンが押されている場合にメニューアプリを起動するコードを埋め込んでおくことにより、メインアプリケーションからメニューアプリへの復帰できるようになります。

付属の `LaunchExtFlash.ino` サンプルスケッチでは、Wio TerminalのボタンA を押した状態でリセットすることにより、メニューアプリを起動します。

[![ExtFlashLoaderの動作](https://img.youtube.com/vi/lPJtOYFQees/0.jpg)](https://www.youtube.com/watch?v=lPJtOYFQees)

## 使い方

### ライブラリのインストール

Arduino IDEのライブラリマネージャから `ExtFlashLoader` を選択してインストールします。

![ライブラリマネージャ](figure/arduino_library_manager.png)

![ExtFlashLoader](figure/arduino_library_manager_extflashloader.png)

インストールが完了すると、スケッチ例に `ExtFlashLoader` のサンプルスケッチが追加されます。

![サンプルスケッチ](figure/arduino_sketch_examples_extflashloader.png)

### メニューアプリの書き込み

メニューアプリを使うためには、外部フラッシュにメニューアプリを書き込んでおく必要があります。

Wio Terminal標準の機能では外部フラッシュに書き込みを行えないので、`WriteSampleMenu.ino` サンプルスケッチを使ってメニューアプリを外部フラッシュに書き込みます。

`WriteSampleMenu.ino`はメニューアプリのバイナリを内蔵しており、起動すると外部フラッシュにメニューアプリを自動的に書き込みます。

書き込みが成功すると、メニューアプリが起動します。

### メニューアプリの使い方

付属のメニューアプリは、TFカードの `/apps` ディレクトリにあるアプリケーションを一覧表示するようになっています。

各アプリケーションは個別のディレクトリに分けて格納します。

```
/apps
 +- app1
    +- app.bin --- app1のバイナリ
    +- app.png --- app1の内容を表す画像 (オプション)
    +- name    --- app1の名前を含むテキストファイル
    +- desc    --- app1の説明文を含むテキストファイル (オプション)
 +- app2
    +- app.bin --- app2のバイナリ
    +- app.png --- app2の内容を表す画像 (オプション)
    +- name    --- app2の名前を含むテキストファイル
    +- desc    --- app2の説明文を含むテキストファイル (オプション)
  +- hoge
    +- app.bin --- hogeのバイナリ
    +- app.png --- hogeの内容を表す画像 (オプション)
    +- name    --- hogeの名前を含むテキストファイル
    +- desc    --- hogeの説明文を含むテキストファイル (オプション)
  +- fuga
    +- app.bin --- fugaのバイナリ
    +- app.png --- fugaの内容を表す画像 (オプション)
    +- name    --- fugaの名前を含むテキストファイル
    +- desc    --- fugaの説明文を含むテキストファイル (オプション)
```

アプリケーションのバイナリを `app.bin`として格納します。

`name` はアプリケーションの名前を含むテキストファイルです。最大64バイトまでです。

`desc` はアプリケーションの説明文を含むテキストファイルです。最大64バイトまでです。

`app.png` はアプリケーションの内容を表す画像ファイルです。表示領域は160x120ですので、それ以下の画像を格納します。

上記の構造でアプリケーションを格納したあTFカードをWio Terminalに挿入すると、アプリケーションの一覧をが表示されます。

スティックの上下でアプリケーションを選択し、スティックを押し込むと、選択中のアプリケーションを内蔵フラッシュに書き込みます。

書き込み後、現在は不具合によりアプリケーションを起動できていませんので、電源スイッチをリセット方向にスライドしてリセットをかけてください。

お試し用に [LovyanGFX](https://github.com/lovyan03/LovyanGFX) のサンプルコードをメニュー対応にしたものを用意してあります。[ここからダウンロード出来ます。](https://github.com/ciniml/ExtFlashLoader/releases/download/0.1.0/extflashloader_sample.zip)
ダウンロードしてZIPファイルを展開し、出てきた `apps` ディレクトリをSDカードのルートに書き込んでください。

### アプリケーションのメニューアプリ対応

Wio Terminal出荷時に書き込まれているブートローダから外部フラッシュ上のメニューアプリを起動することはできません。

そのため、メインアプリケーション側で起動時に必要に応じてメニューアプリを起動するコードを追加する必要があります。

付属のサンプルスケッチ `LaunchExtFlash.ino` では、起動時に `ボタンA` が押されている場合、メニューアプリを起動します。

```LaunchExtFlash.ino
#include <TFT_eSPI.h>
#include <cstdint>
#include <ExtFlashLoader.h>

TFT_eSPI tft;

void setup() {
    tft.begin();
    tft.setRotation(3);
    tft.fillScreen(0);

    pinMode(WIO_KEY_A, INPUT_PULLUP);
    if( digitalRead(WIO_KEY_A) == LOW) {
      tft.printf("Launching QSPI application\r\n");
      ExtFlashLoader::ExtFlashLoader loader;
    }
    
    tft.printf("Normal flash application\r\n");

    Serial.begin(115200);
    while(!Serial);
}
void loop() {

}
```

`13行目`で`WIO_KEY_A`、つまりボタンAの入力がボタンが押されている(==`LOW`)かどうか確認します。

ボタンAが押されている場合は、 `ExtFlashLoader::ExtFlashLoader loader;` を実行し、外部フラッシュ上のメニューアプリを起動します。

アプリケーションに上記のコードを埋め込むことにより、TFカードからのロードに対応したアプリケーションを作ることが出来ます。

## ライセンス

ライブラリの本体 `ExtFlashLoader.hpp`のライセンスは、 `Boost Software License 1.0` です。
ソースコードのライセンス表記を残している限り、自由にコードを使用することが出来ます。

