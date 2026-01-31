export type Article = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string; // HTML or Markdown
  date: string;
  imageUrl: string;
};

const articlesJa: Article[] = [
  {
    id: "1",
    slug: "ski-trip-settlement",
    title: "スノボ・スキー旅行の割り勘トラブル回避術！リフト券からガソリン代まで",
    description:
      "冬の定番、スノボ旅行。楽しい思い出にするためにも、リフト券、レンタル代、ガソリン代など複雑になりがちな費用の精算方法をマスターしましょう。",
    date: "2026-01-20",
    imageUrl: "/images/articles/ski-trip-settlement.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        友人たちとのスノボ旅行は最高に楽しいイベントですが、同時に「割り勘の難易度」が高いイベントでもあります。<br>
        車を出す人のガソリン代、各自のリフト券、レンタルの有無、そして宿代や食事代…。<br>
        これらをスムーズに精算するためのポイントを紹介します。
      </p>

      <h2>1. 車出し担当への配慮（ガソリン代・高速代）</h2>
      <p>スノボ旅行では車での移動が一般的ですが、車を出してくれる人への配慮は必須です。</p>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg my-4">
        <h3 class="font-bold mb-2">一般的なルール例</h3>
        <ul class="list-disc pl-5">
          <li><strong>ガソリン代・高速代：</strong> 全員で割り勘（車出し担当も含めるか、免除するかは事前に相談）</li>
          <li><strong>運転のお礼：</strong> 車出し担当の食事代を1回おごる、またはスタバなどを差し入れする</li>
          <li><strong>消耗品費：</strong> 長距離運転によるタイヤやオイルの消耗を考慮し、少し多めに渡すケースも増えています</li>
        </ul>
      </div>

      <h2>2. 個人費用と共通費用の線引き</h2>
      <p>スノボ旅行では「自分だけレンタルする」「自分だけスクールに入る」といった個人費用が発生しやすいです。</p>
      <p>基本的に、<strong>自分の装備に関わる費用はその場で自己精算</strong>し、宿代や夕食代などの<strong>全員にかかる費用のみを割り勘</strong>にするのがシンプルです。</p>

      <h2>3. 買い物は「共通財布」が便利</h2>
      <p>コンビニでの買い出しや、SAでの軽食など、細かい出費が重なります。</p>
      <p>あらかじめ一人5,000円ずつ集めて「共通財布」を作り、そこから支払うことで、レジでの個別会計の手間を省けます。</p>
      <p>残ったお金は最後に返金するか、帰りの夕食代に充てましょう。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>まとめ</h3>
        <p>「お金のことは後で」と先延ばしにせず、ルールを決めておくことが、来年もまた一緒に滑りに行くための秘訣です。</p>
      </div>
    `,
  },
  {
    id: "2",
    slug: "bbq-party-split",
    title: "BBQ・ホームパーティーの買い出しと精算をスムーズにする方法",
    description:
      "食材係、飲み物係、場所取り係…役割分担が多いBBQやパーティー。誰がいくら立て替えたか分からなくならないための管理術。",
    date: "2026-01-21",
    imageUrl: "/images/articles/bbq-party-split.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        青空の下でのBBQや、アットホームなホームパーティー。<br>
        しかし、準備段階で複数のメンバーが別々に買い出しに行くと、精算時にレシートの山と格闘することになります。
      </p>

      <h2>1. レシートは必ず写真を撮ってグループLINEへ</h2>
      <p>紙のレシートは風で飛んだり、油で汚れたりして紛失しがちです。</p>
      <p>買い物をしたらすぐにスマホでパシャリ。グループのアルバムにアップロードする習慣をつけましょう。これだけで精算時のトラブルが激減します。</p>

      <h2>2. ドリンク代の傾斜について</h2>
      <p>BBQでよくある揉め事の一つが「お酒を飲む人 vs 飲まない人」の費用負担です。</p>
      <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg my-4">
        <p class="font-bold">おすすめの解決策</p>
        <p>お酒類とソフトドリンク類でレシートを分けて会計してもらいましょう。</p>
        <p>その上で、「食事代」は全員で割り勘、「お酒代」は飲む人だけで割り勘、と計算を分けると公平感が出ます。</p>
      </div>

      <h2>3. 端数はどうするか？</h2>
      <p>1円単位まで割り勘するのは手間がかかりますし、現金のやり取りだと小銭が不足します。</p>
      <p>「100円単位で切り上げ」て、余ったお金で（次回の幹事へのチップとして、またはアイスを買って）使い切るのがスマートです。</p>
      <p>もちろん、PayPayなどの送金アプリを使えば1円単位でも全く問題ありません。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>アプリを使えば一瞬で解決</h3>
        <p>立て替え記録アプリなら、「Aさんはお酒ナシ」「Bさんは多めに払う」といった条件も簡単に設定できます。楽しい時間を計算で中断させないよう、ツールを活用しましょう。</p>
      </div>
    `,
  },
  {
    id: "3",
    slug: "office-lunch-split",
    title: "職場のランチ割り勘、どうしてる？スマートな支払いマナーとコツ",
    description:
      "同僚とのランチ、会計時にもたついていませんか？別会計ができない店でもスマートに振る舞うための「大人の割り勘マナー」解説。",
    date: "2026-01-22",
    imageUrl: "/images/articles/office-lunch-split.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        毎日の職場ランチ。リフレッシュの時間ですが、会計の瞬間に気まずい空気が流れることは避けたいものです。<br>
        特に混雑しているお店では、レジ前でもたつかないのが大人のマナーです。
      </p>

      <h2>1. 「別会計」はお店の状況を見て</h2>
      <p>混雑時のレジで「別々でお願いします」と言い出しにくい雰囲気、ありますよね。</p>
      <p>基本的には、誰か一人が代表して支払い、後で精算するのがスマートです。ポイントも貯まるので、代表者にとってもメリットがあります。</p>

      <h2>2. ぴったりのお金がない問題</h2>
      <p>現金払いの場合、「1000円札しかない」「小銭がない」という状況は頻発します。</p>
      <p>これを解決するのが<strong>送金アプリ（PayPay、LINE Payなど）</strong>です。</p>
      <ul class="list-disc pl-5 mb-4">
        <li>小銭を用意する必要がない</li>
        <li>1円単位できっちり払える</li>
        <li>履歴が残るので「払ったっけ？」がない</li>
      </ul>
      <p>職場のランチグループで、使うアプリを統一しておくと非常にスムーズです。</p>

      <h2>3. 上司や先輩がいる場合</h2>
      <p>上司が「ここは出すよ」と言ってくれた場合は、素直に甘えるのもコミュニケーションの一つです。<br>
      ただし、毎回では申し訳ないと感じる場合は、「次は私たちがカフェ代を出しますね」と提案するなど、持ちつ持たれつの関係を築きましょう。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>まとめ</h3>
        <p>ランチの支払いは毎日のことだからこそ、ストレスなく行いたいもの。デジタルツールを活用して、快適なランチタイムを過ごしましょう。</p>
      </div>
    `,
  },
  {
    id: "4",
    slug: "roomshare-expenses",
    title: "ルームシェアの家賃・光熱費管理のコツ！喧嘩にならないルール作り",
    description:
      "友人とのシェアハウス生活。お金の切れ目は縁の切れ目にならないよう、家賃、光熱費、日用品の分担ルールを明確にしましょう。",
    date: "2026-01-23",
    imageUrl: "/images/articles/roomshare-expenses.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        気の合う友人とのルームシェアは楽しいですが、金銭感覚の違いがトラブルの種になることも。<br>
        毎月発生する家賃や光熱費、不定期に発生するトイレットペーパーや洗剤などの消耗品費。どう管理するのが正解でしょうか？
      </p>

      <h2>1. 固定費と変動費の分け方</h2>
      <p><strong>家賃やネット代（固定費）：</strong> 毎月定額なので、振込担当を決めて、期日までに担当者に送金するルールが一般的です。</p>
      <p><strong>光熱費（変動費）：</strong> 毎月金額が変わるため、請求書が届いたら写真を共有し、折半します。</p>

      <h2>2. 「名もなき出費」の管理（日用品）</h2>
      <p>意外と揉めるのが、洗剤、調味料、ゴミ袋などの細かい出費です。</p>
      <p>「気づいた人が買う」というルールだと、特定の人の負担が大きくなりがちです。</p>
      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg my-4">
        <h3 class="font-bold mb-2">解決策：共有費プール制</h3>
        <p>毎月一人2,000円などを共有の財布（または封筒、共有口座）に入れ、日用品はそこから買うようにします。<br>
        これなら「私が買ったのに」という不満が出ません。</p>
      </div>

      <h2>3. ツールで可視化する</h2>
      <p>「立て替え」が発生した都度、アプリに入力しておくと便利です。</p>
      <p>月末に「Aさんは今月3,000円分買った」「Bさんは1,000円分買った」→「BさんがAさんに1,000円払えば解決」といった計算が一瞬で終わります。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>心地よい共同生活のために</h3>
        <p>お金のルールの明確化は、信頼関係を守るための手段です。最初にしっかり話し合っておくことを強くおすすめします。</p>
      </div>
    `,
  },
  {
    id: "5",
    slug: "travel-currency-exchange",
    title: "海外旅行の割り勘、為替レートはどう計算する？公平な精算法",
    description:
      "複数の通貨が混ざる海外旅行。円で立て替えた？ドルで支払った？カードの請求レートは？複雑な為替計算をシンプルにする方法。",
    date: "2026-01-24",
    imageUrl: "/images/articles/travel-currency-exchange.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        海外旅行での割り勘は、国内旅行の比にならないほど複雑です。<br>
        「現地通貨で払った」「日本円で両替した現金を使った」「クレジットカード（後日請求）で払った」。<br>
        これらをどうやって日本円で精算すればいいのでしょうか？
      </p>

      <h2>1. 基準レートを決める</h2>
      <p>日によってレートは変動しますが、厳密に計算しようとすると泥沼にはまります。</p>
      <p><strong>「旅行初日のレート」または「両替時の平均レート」を一つ決めて、全ての計算に適用する</strong>のが最も平和的で簡単な方法です。</p>

      <h2>2. クレジットカード払いの扱い</h2>
      <p>カード払いの請求額は、実際にカード会社から明細が来るまで確定しません（手数料などが乗るため）。</p>
      <p>これも厳密さを求めず、<strong>「支払い時のアプリ上のレート × 1.02（約2%の手数料分）」</strong>などで仮計算して精算してしまうのがおすすめです。</p>
      <p>帰国してから数週間後に「10円違ったから返して」と連絡するのは、お互いにストレスだからです。</p>

      <h2>3. 複数通貨対応アプリを使う</h2>
      <p>頭で計算するのは限界があります。外貨に対応した割り勘アプリを使いましょう。</p>
      <p>「みんなの割り勘」なら、米ドル、ユーロ、ウォンなど主要通貨に対応しており、入力するだけで日本円換算での精算額を算出できます。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>旅の終わりをスマートに</h3>
        <p>為替の数円単位の差よりも、スムーズに精算を終えて旅の思い出を語り合う方が価値があります。大まかなルール合意が大切です。</p>
      </div>
    `,
  },
  {
    id: "6",
    slug: "couple-finances",
    title: "同棲カップルの生活費管理！共通財布vs都度精算、どっちがおすすめ？",
    description:
      "結婚前の同棲カップル、お金の管理はどうしてる？二人のタイプに合わせた最適な家計管理方法を見つけましょう。",
    date: "2026-01-25",
    imageUrl: "/images/articles/couple-finances.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        同棲を始めるとき、一番最初に決めるべきなのが「お金のルール」です。<br>
        なあなあにしておくと、どちらかの負担が増えて不満が溜まってしまうことも…。
      </p>

      <h2>パターンA：共通財布（お小遣い制）</h2>
      <p>お互いが毎月決まった額（例：10万円ずつ）を共通の口座や財布に入れ、家賃や生活費は全てそこから支払うスタイル。</p>
      <ul class="list-disc pl-5 mb-4">
        <li><strong>メリット：</strong> 生活費の全体像が見えやすい。残りを貯金に回しやすい。</li>
        <li><strong>デメリット：</strong> 個人の趣味に使いづらいと感じることも。</li>
      </ul>

      <h2>パターンB：費目別担当制</h2>
      <p>「彼は家賃、彼女は食費と光熱費」のように、支払う項目を分けるスタイル。</p>
      <ul class="list-disc pl-5 mb-4">
        <li><strong>メリット：</strong> 管理が楽。相手の財布事情に干渉しすぎない。</li>
        <li><strong>デメリット：</strong> 負担額に不公平感が出やすい（食費は変動しやすいため）。</li>
      </ul>

      <h2>パターンC：都度精算（アプリ管理）</h2>
      <p>支払いはその時々でできる方が行い、全て家計簿アプリや割り勘アプリに記録。月末に差額を精算するスタイル。</p>
      <ul class="list-disc pl-5 mb-4">
        <li><strong>メリット：</strong> クレジットカードのポイントを各自で貯められる。完全に公平。</li>
        <li><strong>デメリット：</strong> 記録が面倒（アプリで習慣化できれば解決）。</li>
      </ul>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>二人に合った方法を</h3>
        <p>正解はありません。数ヶ月試してみて、合わなければ変えれば良いのです。大切なのは「話し合うこと」です。</p>
      </div>
    `,
  },
  {
    id: "7",
    slug: "wedding-afterparty-split",
    title: "結婚式二次会の幹事必見！会費と経費の透明性を保つ方法",
    description:
      "大きなお金が動く結婚式の二次会。幹事として、会費と経費のバランスをどう管理し、新郎新婦やゲストに報告するか。",
    date: "2026-01-26",
    imageUrl: "/images/articles/wedding-afterparty-split.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        結婚式の二次会幹事は、責任重大な役割です。<br>
        数十万円単位のお金が動くため、管理がずさんだと「使途不明金」などのトラブルになりかねません。
      </p>

      <h2>1. 予算は「赤字にならない」前提で組む</h2>
      <p>当日のドタキャンや備品の買い足しなど、想定外の出費は必ず発生します。</p>
      <p>会費 × 参加予定人数 ＝ 予算ギリギリ、にするのではなく、予備費を10%程度見込んでおきましょう。<br>
      余ったら新郎新婦へのギフトに充てるか、三次会費に回せばOKです。</p>

      <h2>2. 立て替え記録は全員で共有</h2>
      <p>幹事チーム（通常2〜4人）内での立て替えも発生します（景品の購入、備品の購入など）。</p>
      <p>誰が何を買ったか、レシート画像をGoogleドライブやLINEアルバムに共有し、スプレッドシートや割り勘アプリでリアルタイムに管理しましょう。</p>

      <h2>3. 最終収支報告</h2>
      <p>会が終わったら、新郎新婦に収支報告をしましょう。これがないと「余ったお金どうしたの？」と不信感を抱かれる原因になります。</p>
      <p>「収入：会費○○円」「支出：会場費、景品代○○円」「残金：○○円（新郎新婦へお渡し）」と明確にすることが、信頼できる幹事の条件です。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>透明性が全て</h3>
        <p>お金の管理をクリアにすることで、幹事自身も心置きなくお祝いの場を楽しむことができます。</p>
      </div>
    `,
  },
  {
    id: "8",
    slug: "gift-group-purchase",
    title: "友人への誕生日プレゼント、複数人での購入と精算のベストプラクティス",
    description:
      "「みんなでプレゼント買おう！」となった時、誰が買いに行き、どう集金するか。サプライズを成功させるための裏方マネジメント。",
    date: "2026-01-27",
    imageUrl: "/images/articles/gift-group-purchase.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        友人の誕生日や出産祝い。一人であげるには高価なものも、数人で出し合えば素敵なプレゼントになります。<br>
        しかし、人数が増えるほど「集金」の手間が発生します。
      </p>

      <h2>1. 金額設定とメンバリング</h2>
      <p>まず「一人当たりいくらくらい」という予算感を決めます。高すぎると参加しづらくなるため、3,000円〜5,000円程度が一般的です。</p>
      <p>声をかける範囲も重要です。あまり広げすぎると、関係の薄い人が負担に感じることもあります。</p>

      <h2>2. 集金は「購入前」か「購入後」か？</h2>
      <p><strong>おすすめは「購入後」に金額確定してから</strong>です。</p>
      <p>事前に集めると「思ったより安く買えて、数百円ずつ返金する」という面倒な作業が発生する可能性があります。</p>
      <p>「だいたい一人○○円くらいになる予定」と伝え、代表者が購入後にレシートと共に確定額を連絡しましょう。</p>

      <h2>3. 遠方の友人がいる場合</h2>
      <p>今はSNSだけで繋がっている友人同士でプレゼントを贈ることも珍しくありません。</p>
      <p>Amazonの「ほしい物リスト」から贈るのも手軽ですが、サプライズ感を出したいなら、代表者が購入し、PayPayなどで集金するのがスムーズです。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>お金の話はサクッと終わらせる</h3>
        <p>プレゼント選びは楽しいですが、お金の話は長引かせたくないもの。ツールを使って事務的にサクッと終わらせ、お祝いの気持ちに集中しましょう。</p>
      </div>
    `,
  },
  {
    id: "9",
    slug: "drinking-party-izakaya",
    title: "飲み会の割り勘でモヤモヤしないための3つのルール",
    description:
      "遅れてきた人は安くする？お酒を飲まない人は？上司は多めに払う？飲み会会計の「あるある」トラブルを未然に防ぐ方法。",
    date: "2026-01-28",
    imageUrl: "/images/articles/drinking-party-izakaya.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        楽しい飲み会の最後に待っている会計タイム。<br>
        「え、私一口しか飲んでないのに同額？」といった不満を口には出せず、モヤモヤした経験がある人も多いはずです。
      </p>

      <h2>ルール1：遅刻・早退などの傾斜ルールを最初に決める</h2>
      <p>飲み会が始まってから、あるいは会計の段になってから決めようとすると揉めます。</p>
      <ul class="list-disc pl-5 mb-4">
        <li>「1時間以上の遅刻はマイナス2,000円」</li>
        <li>「ノンアルコール勢はマイナス1,000円」</li>
      </ul>
      <p>といったシンプルなルールを、幹事が最初に（あるいは案内時に）宣言してしまうのがコツです。</p>

      <h2>ルール2：コース予約を活用する</h2>
      <p>アラカルト（単品注文）は会計が不明瞭になりがちです。</p>
      <p>飲み放題付きコースなら金額が固定されるため、集金が圧倒的に楽になります。<br>
      計算が面倒な場合は、できるだけコース予約を選択しましょう。</p>

      <h2>ルール3：集金は「入店時」または「乾杯前」に</h2>
      <p>酔っ払ってからの集金は、お釣り間違えや払い忘れの温床です。</p>
      <p>会費制の場合は、お店に入る前や、乾杯のドリンクを待っている間に「先に集めちゃいますね〜」と回収してしまうのがベストです。<br>
      追加注文が出たら、それだけ最後に精算すれば良いのです。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>「公平感」の演出が幹事の腕の見せ所</h3>
        <p>1円単位の厳密な公平さよりも、「私の状況を考慮してくれた」という納得感が大切です。傾斜配分機能を備えたアプリも活用しましょう。</p>
      </div>
    `,
  },
  {
    id: "10",
    slug: "family-trip-expenses",
    title: "三世代旅行のお金管理、親にしわ寄せがいかない方法は？",
    description:
      "親、子、孫で行く三世代旅行。親に甘える？きっちり割り勘？気を使わせずにスムーズに費用分担するためのアイデア。",
    date: "2026-01-29",
    imageUrl: "/images/articles/family-trip-expenses.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        両親の古希のお祝いや、子供の休みを利用した三世代旅行。<br>
        「親が出すよ」と言ってくれることも多いですが、甘えすぎるのも気が引ける…そんな微妙な関係性のお金事情。
      </p>

      <h2>1. 「招待」なのか「共同旅行」なのか</h2>
      <p>まず前提として、この旅行が「親を招待する（子供世代が払う）」ものなのか、「みんなで旅行に行く（各自払う）」ものなのかをはっきりさせましょう。</p>
      <p>招待の場合は、最初から「今回はお祝いだから財布は出さないで」と伝えておくとかっこいいですね。</p>

      <h2>2. 項目で分担する</h2>
      <p>きっちり割り勘にするのは他人行儀すぎると感じる場合は、項目でざっくり分けるのがおすすめです。</p>
      <ul class="list-disc pl-5 mb-4">
        <li><strong>宿代：</strong> 親世代が負担（または子供世代がプレゼント）</li>
        <li><strong>交通費・現地での食事代：</strong> 子供世代が負担</li>
      </ul>
      <p>このように役割を持たせると、お互いに「出した感」があり、気を使わずに済みます。</p>

      <h2>3. 「旅の財布」を作る</h2>
      <p>親世代に多めに出してもらう場合でも、毎回レジで親に財布を出させるのはスマートではありません。</p>
      <p>最初に親から多めに預かり、子供世代も出し合い、一つの「旅の財布」を作ります。<br>
      支払いは全て子供世代の代表者がその財布から行えば、現地でのやり取りはスムーズになります。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>感謝の気持ちを伝える</h3>
        <p>お金の分担も大切ですが、最終的には「楽しかったね、ありがとう」という感謝の言葉が一番の精算です。良い旅を！</p>
      </div>
    `,
  },
];

const articlesEn: Article[] = [
  {
    id: "1",
    slug: "smart-settlement-travel",
    title: "Smart Travel Settlement: 3 Tips to Avoid Trouble",
    description:
      "Don't let money arguments ruin the end of a fun trip. Here are smart settlement methods and tips to avoid trouble.",
    date: "2026-01-15",
    imageUrl: "/images/articles/travel-settlement.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Traveling with friends and family is fun, but "money calculations" are unavoidable.<br>
        Who paid how much for what? Reimbursements can get complicated, and settlement after returning home can be a burden.
      </p>

      <h2>1. Keep Receipts and Record Immediately</h2>
      <p>It's basic, but take photos of receipts immediately or keep them in a specific pouch.</p>
      <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 border-l-4 border-blue-500">
        <p class="font-bold mb-2">💡 Tip</p>
        <p class="m-0 text-sm">"I'll do it later" is the source of trouble. Memories fade surprisingly fast.</p>
      </div>

      <h2>2. Create a Common Wallet (Pros & Cons)</h2>
      <p>Collecting a fixed amount from everyone beforehand to create a "common wallet" is also effective.</p>
      
      <h3>Pros</h3>
      <ul class="list-disc pl-5 mb-4">
        <li>No need for individual calculations.</li>
        <li>No arguments at the register about who pays.</li>
      </ul>

      <h3>Cons</h3>
      <ul class="list-disc pl-5 mb-4">
        <li>Collecting more money if you run out is a hassle.</li>
        <li>Calculating refunds for leftover money at the end is necessary.</li>
      </ul>

      <h2>3. Use Bill Splitting Apps</h2>
      <p>The recent trend is using bill-splitting apps. Just enter "who", "what for", and "how much", and it automatically calculates "who should pay whom".</p>
      <p>Our tool <strong>OurSplit</strong> was made exactly for this. No login required, just share the URL and use it immediately.</p>
    `,
  },
  // English articles are kept minimal as fallback.
  // In a full implementation, these should also be expanded and translated.
];

export const getArticles = (locale: string): Article[] => {
  if (locale === "ja") return articlesJa;
  return articlesEn; // Fallback to English for other languages
};

export const articles = articlesJa;
