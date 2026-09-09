import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { OperatorInformation } from "@/components/OperatorInformation";
import { localizedAlternates } from "@/i18n/site";

export const metadata: Metadata = {
  title: "Hirame Privacy Policy",
  description: "iPhone・iPadアプリHirameのプライバシーポリシーです。保存、AI、分析、広告、同意管理、課金、削除について説明します。",
  alternates: localizedAlternates("/apps/hirame/privacy/", "/en/apps/hirame/privacy/"),
  openGraph: {
    title: "Hirame Privacy Policy | Mika Spark Studio",
    description: "iPhone・iPadアプリHirameにおける情報の取扱いについて説明します。",
    url: "/apps/hirame/privacy/",
  },
};

export default function HiramePrivacyPage() {
  return (
    <LegalLayout
      label="Hirame / Legal"
      title="Privacy Policy"
      intro="Mika Spark Studio（以下「運営者」）は、iPhone・iPadアプリ「Hirame」（以下「本アプリ」）における利用者情報の取扱いについて、次のとおり定めます。"
    >
      <section>
        <h2>1. 運営者</h2>
        <p>本アプリは、個人開発ブランド「Mika Spark Studio」が運営します。</p>
      </section>

      <section>
        <h2>2. 本アプリで保存するデータ</h2>
        <p>本アプリはアカウント登録を必要としません。機能提供のため、次のデータを端末内のアプリ領域に保存します。</p>
        <ul>
          <li>アイデアノートのタイトル、本文、テーマ、発想法、生成条件、お気に入り、作成・更新日時等</li>
          <li>利用者がノートへ追加した画像、手書きデータ、画像・手書きから抽出した文字情報</li>
          <li>BRIDGE等の発想トレーニングのプレイ履歴、経路、評価、振り返り等</li>
          <li>オンボーディング、言語、利用回数、広告による一時解放、購入権利の確認結果、同期状態等のアプリ設定</li>
        </ul>
        <p>運営者が管理する独自サーバーへ、アイデアノート、画像または手書きデータを保存・送信する機能はありません。</p>
      </section>

      <section>
        <h2>3. お問い合わせで取得する情報</h2>
        <p>
          お問い合わせの際には、利用者が任意で送信するメールアドレス、問い合わせ内容、端末・OS・アプリのバージョン等、問題の確認に必要な情報を取得することがあります。氏名、住所、電話番号または連絡先の登録を本アプリの利用条件として求めることはありません。
        </p>
      </section>

      <section>
        <h2>4. 利用状況および広告に関する情報</h2>
        <p>
          本アプリは、品質改善のためFirebase Analyticsを利用し、アプリの起動、発想法・BRIDGE・ライブラリ・AI支援機能の利用、ノート保存、広告の要求・完了、Ad-Free購入画面や購入処理等のイベントを記録します。運営者が設定する分析イベントには、ノートのタイトル、本文、画像または手書きの内容を含めません。Firebase Analyticsでは、利用状況、端末やアプリに関する情報等がGoogleにより自動的に収集される場合があります。Firebase Analyticsから広告パーソナライズ用途へ送るシグナルの既定の許可は無効にしています。
        </p>
        <p>
          無料版の広告表示にはGoogle Mobile Ads SDK（AdMob）を利用します。同SDKにより、IPアドレスから推定されるおおよその位置、端末識別子、広告データ、利用状況、診断情報等がGoogleにより収集される場合があります。
        </p>
        <p>
          現在の配布ビルドに含まれるSDKのPrivacy ManifestをXcodeで集約したPrivacy Reportでは、Google Mobile Ads SDKについて、概算位置情報、端末ID、製品操作、広告データ、クラッシュデータ、性能データおよびその他の診断データの取扱いが申告されています。端末IDは、利用者に関連付けられ、トラッキングに使用されると申告されています。概算位置情報、製品操作および広告データは、トラッキングには使用されないものの、利用者に関連付けられると申告されています。クラッシュデータ、性能データおよびその他の診断データは、利用者に関連付けられず、トラッキングにも使用されないと申告されています。
        </p>
        <p>
          Google User Messaging Platform（UMP）は、広告に関する同意状況の確認、必要なプライバシーメッセージの表示およびプライバシー選択の管理のため、概算位置情報、製品操作および性能データをアプリ機能目的で取り扱う場合があります。Privacy Reportでは、これらは利用者に関連付けられず、トラッキングにも使用されないと申告されています。また、Firebase Installationsは、分析目的でその他の診断データを取り扱う場合がありますが、Privacy Reportでは利用者に関連付けられず、トラッキングにも使用されないと申告されています。
        </p>
      </section>

      <section>
        <h2>5. 情報の利用目的</h2>
        <ul>
          <li>アイデアの記録、発想トレーニング、AI支援、同期等、本アプリの機能提供</li>
          <li>利用状況の把握、不具合の調査、品質および機能の改善</li>
          <li>広告の表示、広告視聴による機能の一時解放</li>
          <li>広告に関する同意状況の確認およびプライバシー選択の提供</li>
          <li>アプリ内課金の処理、購入権利の確認および復元</li>
          <li>お問い合わせへの回答、重要な変更やサポート上必要な事項の案内</li>
        </ul>
      </section>

      <section>
        <h2>6. 端末内での処理</h2>
        <p>
          ノート等はSwiftDataおよび端末内の設定領域に保存されます。画像・手書き内の文字抽出にはAppleのVision frameworkを利用し、抽出した文字をノートデータとして保存する場合があります。運営者は端末内に保存されたノート内容を直接閲覧または取得しません。
        </p>
      </section>

      <section>
        <h2>7. iCloud・CloudKitの利用</h2>
        <p>
          本アプリは、iCloudを利用できる環境ではAppleのCloudKitプライベートデータベースを使い、アイデアノート、画像・手書き、発想トレーニング履歴等のSwiftDataデータを、同じApple Accountに関連付けられた端末間で保存・同期します。これらは運営者独自のサーバーには保存されません。
        </p>
        <p>
          iCloudまたはCloudKitを利用できない場合、本アプリは端末内保存へ切り替わります。本アプリ内に同期専用のオン／オフ設定はなく、iCloudの利用は端末の設定で管理できます。iCloudにはAppleの規約およびプライバシーポリシーが適用されます。
        </p>
      </section>

      <section>
        <h2>8. AI支援機能</h2>
        <p>
          本アプリの一部のAI支援機能では、AppleのFoundation Models frameworkとSystemLanguageModelを利用します。対応する端末でApple Intelligenceが利用可能な場合に、端末上のモデルが、発想の展開、レビュー、問い、次の一歩、BRIDGEのヒントおよび振り返りを生成します。
        </p>
        <p>
          処理対象には、利用者が入力したノートのタイトル・本文・選択範囲、画像や手書きから抽出した文字または説明、BRIDGEの開始語・目標語・経路・候補語等が含まれます。現在の実装では、画像・手書きのバイナリデータ自体を言語モデルへ渡しません。また、Private Cloud Computeを呼び出す実装、OpenAI・Anthropic等の外部LLM API、運営者独自のAIサーバーへの送信機能はありません。
        </p>
      </section>

      <section>
        <h2>9. 広告</h2>
        <p>
          無料版では、文章量の上限拡張や画像・手書きの追加を一時的に解放するとき、利用者が選択した場合にリワード広告を表示します。Ad-Freeを購入した利用者には広告を表示しません。広告の配信および広告に関する情報の取扱いには、Googleの規約およびプライバシーポリシーが適用されます。
        </p>
        <p>
          本アプリは起動時にGoogle UMPを通じて同意情報を更新し、法令や地域、Google側の設定等に応じて必要なプライバシーメッセージを表示します。広告は、UMPが広告リクエストを許可している場合に限り要求します。プライバシー選択の再表示が必要な場合は、本アプリの設定画面から「プライバシー設定」を開くことができます。
        </p>
        <p>
          本アプリでは、Google Mobile Ads SDKのパブリッシャー・ファーストパーティIDを無効にし、広告パーソナライズ状態を無効に設定しています。ただし、Google Mobile Ads SDKのPrivacy Manifestでは、端末IDがトラッキング目的で取り扱われる可能性が申告されています。実際の取扱いは、利用者の同意、地域、端末設定、Googleの広告配信設定および適用法令等により異なる場合があります。
        </p>
      </section>

      <section>
        <h2>10. アプリ内課金</h2>
        <p>
          本アプリは、広告の非表示と利用上限の拡張を含む買い切り型の「Ad-Free」を提供します。価格は購入画面に表示します。決済、購入権利の確認および復元はAppleのStoreKitを通じて処理され、購入情報はAppleへ送信されます。運営者がクレジットカード番号等の決済情報を直接取得することはありません。本アプリはAppleが確認した購入権利を参照し、その確認結果を端末内に一時保存します。
        </p>
      </section>

      <section>
        <h2>11. 外部サービス</h2>
        <p>本アプリは、次の外部サービスまたはフレームワークを利用します。</p>
        <ul>
          <li>Apple iCloud・CloudKit：データの保存・同期</li>
          <li>Apple Foundation Models・Vision：AI支援および文字抽出</li>
          <li>Apple StoreKit：アプリ内課金と購入権利の確認</li>
          <li>Google Firebase Analytics：利用状況の分析</li>
          <li>Google AdMob：広告の配信</li>
          <li>Google User Messaging Platform：広告に関する同意およびプライバシー選択の管理</li>
        </ul>
        <p>Crashlytics、運営者独自のWeb API、外部LLM APIは現在の実装では利用していません。</p>
      </section>

      <section>
        <h2>12. データの保存期間</h2>
        <p>
          端末内データは、利用者が本アプリ内で削除するか、本アプリを端末から削除するまでを基本として保存されます。iCloud同期されたデータは、利用者の操作、iCloud設定およびAppleの保存方針に従います。分析・広告データは各サービス提供者の方針に従って取り扱われます。お問い合わせ情報は、対応および記録に必要な期間に限って保管し、その後適切に削除します。
        </p>
      </section>

      <section>
        <h2>13. データの削除</h2>
        <p>
          本アプリ内のデータ削除機能から、アイデアノート、画像・手書き、発想トレーニング履歴等を削除できます。iCloud同期中は削除もiCloudへ反映されます。アプリを端末から削除すると端末内データは通常削除されますが、iCloud同期済みデータやOSのバックアップは残る場合があります。買い切りの購入権利はApple Accountに関連付けられるため、アプリ内データの削除対象にはなりません。
        </p>
        <p>お問い合わせに伴い運営者が保有する情報の削除をご希望の場合は、下記窓口へご連絡ください。</p>
      </section>

      <section>
        <h2>14. セキュリティ</h2>
        <p>
          運営者は、取り扱う情報の漏えい、紛失、改ざん等を防ぐため、個人開発の範囲で合理的な安全管理措置に努めます。ただし、情報通信上の安全性を完全に保証するものではありません。
        </p>
      </section>

      <section>
        <h2>15. 未成年者の利用</h2>
        <p>
          未成年者が本アプリを利用する場合は、必要に応じて保護者の同意または監督のもとで利用してください。法令上保護者の同意が必要な情報を送信する場合は、事前に同意を得てください。
        </p>
      </section>

      <section>
        <h2>16. 本ポリシーの変更</h2>
        <p>
          本アプリの機能追加、利用サービスの変更または法令等への対応に伴い、本ポリシーを変更することがあります。重要な変更がある場合は、本ページまたはアプリ内の適切な方法でお知らせします。変更後のポリシーは、本ページへの掲載時から効力を生じます。
        </p>
      </section>

      <section>
        <h2>17. 運営者情報</h2>
        <OperatorInformation />
      </section>
    </LegalLayout>
  );
}
