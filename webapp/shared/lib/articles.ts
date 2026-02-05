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
    title:
      "スノボ・スキー旅行の割り勘トラブル回避術！リフト券からガソリン代まで完全ガイド",
    description:
      "冬の定番、スノボ旅行。楽しい思い出にするためにも、リフト券、レンタル代、ガソリン代など複雑になりがちな費用の精算方法をマスターしましょう。トラブルゼロで来年も行くための秘訣。",
    date: "2026-01-20",
    imageUrl: "/images/articles/ski-trip-settlement.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        友人たちとのスノボ旅行は最高に楽しいイベントですが、同時に「割り勘の難易度」が非常に高いイベントでもあります。<br>
        車を出す人のガソリン代、各自のリフト券、レンタルの有無、そして宿代や食事代…。<br>
        これらをスムーズに精算するためのポイントを、経験者の失敗談を交えて紹介します。
      </p>

      <img src="/images/articles/ski-trip-car.png" alt="スノボ旅行の車内" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. 車出し担当への配慮（ガソリン代・高速代）</h2>
      <p>スノボ旅行では車での移動が一般的ですが、車を出してくれる人への配慮は必須です。ここをなあなあにすると、次回から「車出すの嫌だな…」と思われてしまいます。</p>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg my-6">
        <h3 class="font-bold mb-4 text-lg">一般的なルール例</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>ガソリン代・高速代：</strong> 全員で割り勘（車出し担当も含めるか、免除するかは事前に相談）。出発時にガソリンを満タンにし、帰着時に再度満タンにして、そのレシート分を精算するのが最も正確です。</li>
          <li><strong>運転のお礼：</strong> 車出し担当の食事代を1回おごる、またはスタバなどを差し入れするのがスマートです。</li>
          <li><strong>消耗品費（重要）：</strong> 長距離運転によるタイヤやオイルの消耗、洗車代を考慮し、ガソリン代＋数千円を「車両償却費」として渡すケースも増えています。</li>
        </ul>
      </div>

      <h2>2. 個人費用と共通費用の線引き</h2>
      <p>スノボ旅行では費用の性質が分かれます。「自分だけレンタルする」「自分だけスクールに入る」といった個人費用と、「全員で食べる夕食」「宿代」などの共通費用です。</p>
      <p>基本的に、<strong>自分の装備に関わる費用はその場で自己精算</strong>し、宿代や夕食代などの<strong>全員にかかる費用のみを割り勘</strong>にするのがシンプルです。</p>
      <p>特にリフト券は、ネット予約で早割を使ったり、クーポンを使ったりと金額がバラバラになりがちです。事前に一括購入する場合は、誰ごの分がいくらかをしっかりメモしておきましょう。</p>

      <img src="/images/articles/ski-trip-meal.png" alt="ゲレンデでの食事" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. 買い物は「共通財布」が便利</h2>
      <p>コンビニでの買い出しや、SAでの軽食など、細かい出費が重なります。その都度「350円ちょーだい」とやるのはナンセンスです。</p>
      <p>あらかじめ一人5,000円〜10,000円ずつ集めて「共通財布」を作り、そこから支払うことで、レジでの個別会計の手間を省けます。</p>
      <p>残ったお金は最後に返金するか、帰りの夕食代に充てましょう。この「共通財布」の管理担当は、車出し担当以外の人がやるのがマナーです。</p>

      <h2>4. 温泉・入浴費用の管理</h2>
      <p>帰りの温泉も楽しみの一つですが、タオルを買う人、買わない人で数百円の差が出ます。ここは「入浴料のみ共通財布から出し、タオル代は各自」とするか、面倒なら「タオル代込みで共通財布」としてしまうのも手です。</p>
      <p>数百円の差で計算に時間をかけるより、早くお風呂に入って疲れを癒やす方が全員にとって利益になります。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>まとめ</h3>
        <p>「お金のことは後で」と先延ばしにせず、ルールを決めておくことが、来年もまた一緒に滑りに行くための秘訣です。特に車を出してくれた人への感謝は、言葉だけでなく「お財布」でも示しましょう。</p>
      </div>
    `,
  },
  {
    id: "2",
    slug: "bbq-party-split",
    title:
      "BBQ・ホームパーティーの買い出しと精算をスムーズにする方法【幹事必見】",
    description:
      "食材係、飲み物係、場所取り係…役割分担が多いBBQやパーティー。誰がいくら立て替えたか分からなくならないための管理術と、お酒を飲む人・飲まない人の公平な分け方。",
    date: "2026-01-21",
    imageUrl: "/images/articles/bbq-party-split.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        青空の下でのBBQや、アットホームなホームパーティー。<br>
        しかし、準備段階で複数のメンバーが別々に買い出しに行くと、精算時にレシートの山と格闘することになります。<br>
        「あれ、この肉誰が買ったっけ？」「Aさんは野菜買ってくれたから相殺で…」と混乱しないためのテクニックを紹介します。
      </p>

      <img src="/images/articles/bbq-party-grill.png" alt="BBQで肉を焼く様子" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. レシートは必ず写真を撮ってグループLINEへ</h2>
      <p>紙のレシートは風で飛んだり、油で汚れたりして紛失しがちです。特にBBQ場ではゴミと一緒に捨ててしまう事故も多発します。</p>
      <p>買い物をしたらすぐにスマホでパシャリ。グループのアルバムにアップロードする習慣をつけましょう。これだけで精算時のトラブルが激減します。「レシートがないと精算できません」と事前に宣言しておくのも有効です。</p>

      <h2>2. ドリンク代の傾斜について</h2>
      <p>BBQでよくある揉め事の一つが「お酒を飲む人 vs 飲まない人」の費用負担です。</p>
      <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg my-6">
        <p class="font-bold mb-2">おすすめの解決策</p>
        <p class="mb-4">お酒類とソフトドリンク類でレシートを分けて会計してもらいましょう。</p>
        <ul class="list-disc pl-5">
          <li><strong>食事代・場所代：</strong> 全員で均等割り勘</li>
          <li><strong>お酒代：</strong> 飲む人だけで割り勘</li>
          <li><strong>ソフトドリンク代：</strong> 全員（または飲まない人）で割り勘</li>
        </ul>
      </div>
      <p>最近はノンアルコールビールなども高価なので、状況に応じて柔軟に。「飲む人」は自動的に＋2,000円、というように会費を一律で差をつけるのも手軽で良い方法です。</p>

      <img src="/images/articles/bbq-party-drinks.png" alt="ドリンクで乾杯" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. 端数はどうするか？</h2>
      <p>1円単位まで割り勘するのは手間がかかりますし、現金のやり取りだと小銭が不足します。</p>
      <p>「100円単位で切り上げ」て、余ったお金で（次回の幹事へのチップとして、またはアイスを買って）使い切るのがスマートです。</p>
      <p>もちろん、PayPayなどの送金アプリを使えば1円単位でも全く問題ありません。最近は「全員PayPayで送金」が主流になりつつあります。</p>

      <h2>4. 割り勘アプリの活用</h2>
      <p>「Aさんは3000円立て替え」「Bさんは5000円立て替え」といった情報だけでなく、「Cさんはお酒を飲んでいないから支払い少なめ」といった傾斜配分も、アプリ（みんなの割り勘など）を使えば一瞬で計算できます。</p>
      <p>電卓を叩いて「えっと、AさんがBさんに…」と悩む時間はもったいないです。その時間で肉を焼きましょう。</p>

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
      "同僚とのランチ、会計時にもたついていませんか？別会計ができない店でもスマートに振る舞うための「大人の割り勘マナー」解説。PayPay送金や幹事の立ち回りなど。",
    date: "2026-01-22",
    imageUrl: "/images/articles/office-lunch-split.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        毎日の職場ランチ。リフレッシュの時間ですが、会計の瞬間に気まずい空気が流れることは避けたいものです。<br>
        特に混雑しているお店では、レジ前でもたつかないのが大人のマナーです。「ごちそうさま」の後にサッと店を出られるよう、準備しておきましょう。
      </p>

      <img src="/images/articles/office-lunch-pay.png" alt="レジでの支払い" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. 「別会計」はお店の状況を見て</h2>
      <p>混雑時のレジで「別々でお願いします」と言い出しにくい雰囲気、ありますよね。実際、ランチタイムの忙しい時間帯に個別会計を断るお店も多いです。</p>
      <p>基本的には、誰か一人が代表して支払い、後で精算するのがスマートです。ポイントも貯まるので、代表者にとってもメリットがあります。ただし、代表者ばかりに負担（ポイント独り占めの罪悪感や、高額決済のリスク）がいかないよう、持ち回りにするのも良いでしょう。</p>

      <h2>2. ぴったりのお金がない問題</h2>
      <p>現金払いの場合、「1000円札しかない」「小銭がない」という状況は頻発します。「細かいのない？」「ごめん、私もない」というやり取りは時間の無駄です。</p>
      <p>これを解決するのが<strong>送金アプリ（PayPay、LINE Payなど）</strong>です。</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li>小銭を用意する必要がない</li>
        <li>1円単位できっちり払える</li>
        <li>履歴が残るので「払ったっけ？」がない</li>
        <li>「お釣りがないから今度でいいよ」のお世辞合戦が不要になる</li>
      </ul>
      <p>職場のランチグループで、使うアプリを統一しておくと非常にスムーズです。「PayPayで送るね」の一言で済みます。</p>

      <img src="/images/articles/office-lunch-smartphone.png" alt="スマホで送金" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. 上司や先輩がいる場合</h2>
      <p>上司が「ここは出すよ」と言ってくれた場合は、素直に甘えるのもコミュニケーションの一つです。「いいですいいです！」と頑なに拒否するのも却って失礼になることがあります。</p>
      <p>ただし、毎回では申し訳ないと感じる場合は、「次は私たちがカフェ代を出しますね」と提案するなど、持ちつ持たれつの関係を築きましょう。</p>
      <p>また、傾斜をつける場合も（上司が多めに払うなど）、端数を上司が出す形にすると角が立ちません。「3,800円だから、私が2,000円出すよ。残りの1,800円を二人で割って」といった提案ができる先輩は素敵です。</p>

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
      "友人とのシェアハウス生活。お金の切れ目は縁の切れ目にならないよう、家賃、光熱費、日用品の分担ルールを明確にしましょう。共有財布やアプリ活用術。",
    date: "2026-01-23",
    imageUrl: "/images/articles/roomshare-expenses.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        気の合う友人とのルームシェアは楽しいですが、金銭感覚の違いがトラブルの種になることも。<br>
        毎月発生する家賃や光熱費、不定期に発生するトイレットペーパーや洗剤などの消耗品費。どう管理するのが正解でしょうか？
      </p>

      <img src="/images/articles/roomshare-living.png" alt="ルームシェアのリビング" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. 固定費と変動費の分け方</h2>
      <p><strong>家賃やネット代（固定費）：</strong> 毎月定額なので、振込担当を決めて、期日までに担当者に送金するルールが一般的です。自動送金設定をしておくと払い忘れがありません。</p>
      <p><strong>光熱費（変動費）：</strong> 毎月金額が変わるため、請求書が届いたら写真を共有し、折半します。最近はWeb明細が増えているので、ログイン情報を共有しておくとスムーズです。</p>

      <h2>2. 「名もなき出費」の管理（日用品）</h2>
      <p>意外と揉めるのが、洗剤、調味料、ゴミ袋などの細かい出費です。</p>
      <p>「気づいた人が買う」というルールだと、特定の人の負担が大きくなりがちです。「私ばかりトイレットペーパー買ってる気がする…」という不満は、ルームシェア崩壊の序章です。</p>
      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg my-6">
        <h3 class="font-bold mb-4 text-lg">解決策：共有費プール制</h3>
        <p>毎月一人2,000円などを共有の財布（または封筒、共有口座）に入れ、日用品はそこから買うようにします。<br>
        これなら「私が買ったのに」という不満が出ませんし、残高が減ってきたらまた補充すれば良いだけです。</p>
      </div>

      <img src="/images/articles/roomshare-shopping.png" alt="日用品の買い物" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. ツールで可視化する</h2>
      <p>「立て替え」が発生した都度、アプリに入力しておくと便利です。</p>
      <p>月末に「Aさんは今月3,000円分買った」「Bさんは1,000円分買った」→「BさんがAさんに1,000円払えば解決」といった計算が一瞬で終わります。</p>
      <p>冷蔵庫にホワイトボードを貼って書くのもアリですが、外出先で入力できるスマホアプリの方が継続しやすいでしょう。</p>

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
      "複数の通貨が混ざる海外旅行。円で立て替えた？ドルで支払った？カードの請求レートは？複雑な為替計算をシンプルにする方法。アプリを使った解決策も。",
    date: "2026-01-24",
    imageUrl: "/images/articles/travel-currency-exchange.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        海外旅行での割り勘は、国内旅行の比にならないほど複雑です。<br>
        「現地通貨で払った」「日本円で両替した現金を使った」「クレジットカード（後日請求）で払った」。<br>
        これらをどうやって日本円で精算すればいいのでしょうか？レート変動による不公平感をなくす方法を解説します。
      </p>

      <img src="/images/articles/travel-currency-calc.png" alt="通貨計算" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. 基準レートを決める</h2>
      <p>日によってレートは変動しますが、厳密に計算しようとすると泥沼にはまります。例えば「初日は1ドル140円だったけど、最終日は142円だった」といった差を考慮するのは大変です。</p>
      <p><strong>「旅行初日のレート」または「両替時の平均レート」を一つ決めて、全ての計算に適用する</strong>のが最も平和的で簡単な方法です。</p>
      <p>全員が納得していれば、多少のレート差は誤差として許容しましょう。</p>

      <h2>2. クレジットカード払いの扱い</h2>
      <p>カード払いの請求額は、実際にカード会社から明細が来るまで確定しません（手数料などが乗るため）。</p>
      <p>これも厳密さを求めず、<strong>「支払い時のアプリ上のレート × 1.02（約2%の手数料分）」</strong>などで仮計算して精算してしまうのがおすすめです。</p>
      <p>帰国してから数週間後に「10円違ったから返して」と連絡するのは、お互いにストレスだからです。多めに見積もっておいて、余剰分は「手間賃」として受け取る側にあげても良いくらいの大らかさが必要です。</p>

      <img src="/images/articles/travel-currency-card.png" alt="クレジットカード決済" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. 複数通貨対応アプリを使う</h2>
      <p>頭で計算するのは限界があります。「Aさんはドルで払い、Bさんは日本円で払い、Cさんはウォンで払った」なんて状況を手計算するのは不可能です。</p>
      <p>外貨に対応した割り勘アプリを使いましょう。</p>
      <p>「みんなの割り勘」なら、米ドル、ユーロ、ウォンなど主要通貨に対応しており、入力するだけで日本円換算での精算額を算出できます。その日のレートを自動取得する機能があればさらに便利です。</p>

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
      "結婚前の同棲カップル、お金の管理はどうしてる？二人のタイプに合わせた最適な家計管理方法、メリット・デメリットを徹底比較。",
    date: "2026-01-25",
    imageUrl: "/images/articles/couple-finances.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        同棲を始めるとき、一番最初に決めるべきなのが「お金のルール」です。<br>
        なあなあにしておくと、どちらかの負担が増えて不満が溜まってしまうことも…。<br>
        カップルの性格や収入差に合わせた3つの管理パターンを紹介します。
      </p>

      <img src="/images/articles/couple-finances-piggy.png" alt="二人で貯金" class="rounded-xl w-full my-8 shadow-md" />

      <h2>パターンA：共通財布（お小遣い制）</h2>
      <p>お互いが毎月決まった額（例：10万円ずつ）を共通の口座や財布に入れ、家賃や生活費は全てそこから支払うスタイル。</p>
      <ul class="list-disc pl-5 mb-4">
        <li><strong>メリット：</strong> 生活費の全体像が見えやすい。残りを貯金に回しやすい。結婚後の家計管理の練習になる。</li>
        <li><strong>デメリット：</strong> 個人の趣味に使いづらいと感じることも。相手の無駄遣いが気になってしまう。</li>
      </ul>

      <h2>パターンB：費目別担当制</h2>
      <p>「彼は家賃、彼女は食費と光熱費」のように、支払う項目を分けるスタイル。</p>
      <ul class="list-disc pl-5 mb-4">
        <li><strong>メリット：</strong> 管理が楽。相手の財布事情に干渉しすぎないため、ストレスが少ない。</li>
        <li><strong>デメリット：</strong> 負担額に不公平感が出やすい（食費は変動しやすいため）。家賃担当の負担が固定されがち。</li>
      </ul>

      <img src="/images/articles/couple-finances-talk.png" alt="話し合うカップル" class="rounded-xl w-full my-8 shadow-md" />

      <h2>パターンC：都度精算（アプリ管理）</h2>
      <p>支払いはその時々でできる方が行い、全て家計簿アプリや割り勘アプリに記録。月末に差額を精算するスタイル。</p>
      <ul class="list-disc pl-5 mb-4">
        <li><strong>メリット：</strong> クレジットカードのポイントを各自で貯められる。完全に公平（1円単位まで合わせられる）。</li>
        <li><strong>デメリット：</strong> 記録が面倒（アプリで習慣化できれば解決）。「お金に細かい」と思われないような配慮が必要。</li>
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
      "大きなお金が動く結婚式の二次会。幹事として、会費と経費のバランスをどう管理し、新郎新婦やゲストに報告するか。赤字回避のテクニック。",
    date: "2026-01-26",
    imageUrl: "/images/articles/wedding-afterparty-split.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        結婚式の二次会幹事は、責任重大な役割です。<br>
        数十万円単位のお金が動くため、管理がずさんだと「使途不明金」などのトラブルになりかねません。<br>
        新郎新婦にとっても、ゲストにとっても最高の1日にするために、お金の管理は徹底しましょう。
      </p>

      <img src="/images/articles/wedding-party.png" alt="結婚式二次会" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. 予算は「赤字にならない」前提で組む</h2>
      <p>当日のドタキャンや備品の買い足しなど、想定外の出費は必ず発生します。</p>
      <p>会費 × 参加予定人数 ＝ 予算ギリギリ、にするのではなく、予備費を10%程度見込んでおきましょう。<br>
      余ったら新郎新婦へのギフトに充てるか、三次会費に回せばOKです。「足りないから新郎新婦に追加で出してもらう」のは避けたい事態です。</p>

      <h2>2. 立て替え記録は全員で共有</h2>
      <p>幹事チーム（通常2〜4人）内での立て替えも発生します（景品の購入、備品の購入など）。</p>
      <p>誰が何を買ったか、レシート画像をGoogleドライブやLINEアルバムに共有し、スプレッドシートや割り勘アプリでリアルタイムに管理しましょう。「後でまとめてやろう」は破綻の元です。</p>

      <img src="/images/articles/wedding-receipts.png" alt="レシート整理" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. 最終収支報告</h2>
      <p>会が終わったら、新郎新婦に収支報告をしましょう。これがないと「余ったお金どうしたの？」と不信感を抱かれる原因になります。</p>
      <p>「収入：会費○○円」「支出：会場費、景品代○○円」「残金：○○円（新郎新婦へお渡し）」と明確にすることが、信頼できる幹事の条件です。</p>
      <p>アプリの集計画面のスクリーンショットを共有するだけでも、透明性の証明になります。</p>

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
        しかし、人数が増えるほど「集金」の手間が発生します。サプライズを成功させるためには、お金周りのスムーズな連携が欠かせません。
      </p>

      <img src="/images/articles/gift-box.png" alt="プレゼントボックス" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. 金額設定とメンバリング</h2>
      <p>まず「一人当たりいくらくらい」という予算感を決めます。高すぎると参加しづらくなるため、3,000円〜5,000円程度が一般的です。</p>
      <p>声をかける範囲も重要です。あまり広げすぎると、関係の薄い人が負担に感じることもあります。「このメンバーなら出したい」と思える範囲に留めましょう。</p>

      <h2>2. 集金は「購入前」か「購入後」か？</h2>
      <p><strong>おすすめは「購入後」に金額確定してから</strong>です。</p>
      <p>事前に集めると「思ったより安く買えて、数百円ずつ返金する」という面倒な作業が発生する可能性があります。</p>
      <p>「だいたい一人○○円くらいになる予定」と伝え、代表者が購入後にレシートと共に確定額を連絡しましょう。ただし、数万円単位の高額商品の場合は、事前に集金した方が代表者の負担（と不安）が減ります。</p>

      <h2>3. 遠方の友人がいる場合</h2>
      <p>今はSNSだけで繋がっている友人同士でプレゼントを贈ることも珍しくありません。</p>
      <p>Amazonの「ほしい物リスト」から贈るのも手軽ですが、サプライズ感を出したいなら、代表者が購入し、PayPayなどで集金するのがスムーズです。</p>
      <p>集金用のURLを発行するタイプのアプリを使えば、口座情報を教え合う必要もなく安全です。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>お金の話はサクッと終わらせる</h3>
        <p>プレゼント選びは楽しいですが、お金の話は長引かせたくないもの。ツールを使って事務的にサクッと終わらせ、お祝いの気持ちに集中しましょう。</p>
      </div>
    `,
  },
  {
    id: "9",
    slug: "drinking-party-izakaya",
    title: "飲み会の割り勘でモヤモヤしないための3つのルール【幹事マニュアル】",
    description:
      "遅れてきた人は安くする？お酒を飲まない人は？上司は多めに払う？飲み会会計の「あるある」トラブルを未然に防ぐ方法。",
    date: "2026-01-28",
    imageUrl: "/images/articles/drinking-party-izakaya.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        楽しい飲み会の最後に待っている会計タイム。<br>
        「え、私一口しか飲んでないのに同額？」といった不満を口には出せず、モヤモヤした経験がある人も多いはずです。<br>
        幹事として、全員が納得する会計を仕切るテクニックを紹介します。
      </p>

      <img src="/images/articles/izakaya-cheers.png" alt="居酒屋での乾杯" class="rounded-xl w-full my-8 shadow-md" />

      <h2>ルール1：遅刻・早退などの傾斜ルールを最初に決める</h2>
      <p>飲み会が始まってから、あるいは会計の段になってから決めようとすると揉めます。</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li>「1時間以上の遅刻はマイナス2,000円」</li>
        <li>「ノンアルコール勢はマイナス1,000円」</li>
        <li>「早退する人は先に3,000円置いていって」</li>
      </ul>
      <p>といったシンプルなルールを、幹事が最初に（あるいは案内時に）宣言してしまうのがコツです。</p>

      <h2>ルール2：コース予約を活用する</h2>
      <p>アラカルト（単品注文）は会計が不明瞭になりがちです。「誰が高い肉を頼んだか」なんて覚えていられません。</p>
      <p>飲み放題付きコースなら金額が固定されるため、集金が圧倒的に楽になります。<br>
      計算が面倒な場合は、できるだけコース予約を選択しましょう。アラカルトにする場合も「飲み放題」だけはつけておくと、ドリンク代での揉め事を防げます。</p>

      <h2>ルール3：集金は「入店時」または「乾杯前」に</h2>
      <p>酔っ払ってからの集金は、お釣り間違えや払い忘れの温床です。</p>
      <p>会費制の場合は、お店に入る前や、乾杯のドリンクを待っている間に「先に集めちゃいますね〜」と回収してしまうのがベストです。<br>
      追加注文が出たら、それだけ最後に精算すれば良いのです。精神的にも楽になります。</p>

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
        「親が出すよ」と言ってくれることも多いですが、甘えすぎるのも気が引ける…そんな微妙な関係性のお金事情。<br>
        全員が気持ちよく過ごすための工夫とは？
      </p>

      <img src="/images/articles/family-trip-photo.png" alt="家族旅行の集合写真" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. 「招待」なのか「共同旅行」なのか</h2>
      <p>まず前提として、この旅行が「親を招待する（子供世代が払う）」ものなのか、「みんなで旅行に行く（各自払う）」ものなのかをはっきりさせましょう。</p>
      <p>招待の場合は、最初から「今回はお祝いだから財布は出さないで」と伝えておくとかっこいいですね。逆に共同旅行なら、親の年金事情なども考慮し、無理のない範囲での負担をお願いしましょう。</p>

      <h2>2. 項目で分担する</h2>
      <p>きっちり割り勘にするのは他人行儀すぎると感じる場合は、項目でざっくり分けるのがおすすめです。</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li><strong>宿代：</strong> 親世代が負担（または子供世代がプレゼント）</li>
        <li><strong>交通費・現地での食事代：</strong> 子供世代が負担</li>
        <li><strong>孫へのお土産代：</strong> 祖父母にお任せ</li>
      </ul>
      <p>このように役割を持たせると、お互いに「出した感」があり、気を使わずに済みます。</p>

      <h2>3. 「旅の財布」を作る</h2>
      <p>親世代に多めに出してもらう場合でも、毎回レジで親に財布を出させるのはスマートではありません。</p>
      <p>最初に親から多めに預かり、子供世代も出し合い、一つの「旅の財布」を作ります。<br>
      支払いは全て子供世代の代表者がその財布から行えば、現地でのやり取りはスムーズになります。残ったら返金すればOKです。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>感謝の気持ちを伝える</h3>
        <p>お金の分担も大切ですが、最終的には「楽しかったね、ありがとう」という感謝の言葉が一番の精算です。良い旅を！</p>
      </div>
    `,
  },
  {
    id: "11",
    slug: "date-splitting",
    title: "デート代の割り勘、正解はある？20代・30代のリアルな事情",
    description:
      "「奢り」か「割り勘」か、永遠のテーマ。初デート、付き合う前、カップルになってから…シチュエーション別のスマートな支払いとは。男女の本音と最新トレンド。",
    date: "2026-02-01",
    imageUrl: "/images/articles/date-splitting.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        SNSでも度々議論になる「デート代、男が払うべきか問題」。時代とともに価値観は多様化しており、「絶対に奢られたい」という人ばかりではありません。<br>
        とはいえ、会計時の振る舞いは相手への印象を大きく左右します。現代のデートにおける支払いのマナーとリアルな事情を探ります。
      </p>

      <img src="/images/articles/date-dinner.png" alt="レストランでのデート" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. 初デートは「男性が多め」が依然優勢？</h2>
      <p>各種アンケートを見ても、初デートに関しては「男性に出してほしい」または「男性が少し多めに出してほしい」という声が多いのが現状です。</p>
      <p>これは金額の問題というより、「自分との時間を楽しんでくれた」「大切に扱われている」というサインとして受け取られるためです。<br>
      男性側も、「ここは出すよ」とスマートに言えると好印象です。</p>
      <p>一方で、女性側も「財布を出す素振り」はマナーとして必要。「次は私がカフェ代出しますね」と提案できれば完璧です。</p>

      <h2>2. 付き合いが長くなると「交互出し」や「共同財布」へ</h2>
      <p>毎回片方が負担していると、経済的にも精神的にも負担になります。関係が深まるにつれて、ルールが変わっていくのが自然です。</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li><strong>交互出し：</strong> 「ランチは彼、映画は彼女」のように、場面ごとに支払う人を交代する。</li>
        <li><strong>共同財布：</strong> 毎月一定額を出し合って、そこからデート代を支払う。結婚を意識したカップルに多い。</li>
      </ul>

      <img src="/images/articles/date-movie.png" alt="映画館デート" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. 割り勘にするなら「アプリ」でキレイに</h2>
      <p>「割り勘でいいよ」となった場合、レジ前で1円単位まで小銭をやり取りするのは少し無粋です。</p>
      <p>どちらかがクレジットカードでスマートに支払い、後でLINE PayやPayPayで送金する、あるいは割り勘アプリで記録しておくのが現代流です。</p>
      <p>「4,800円だから2,400円ね」と請求するより、「5,000円くらいだったから、2,000円でいいよ」と少し少なめに請求するのも、男性側の「カッコつけ」としては有効かもしれません。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>大切なのは「お互いへのリスペクト」</h3>
        <p>奢ってもらったら「ごちそうさま」、払ってもらったら「ありがとう」。当たり前のことですが、この感謝の言葉があるかないかで、財布の紐の緩み方は変わります。</p>
      </div>
    `,
  },
  {
    id: "12",
    slug: "subscription-sharing",
    title:
      "サブスクの割り勘、どう管理する？Netflix, Spotify...共有アカウントの金銭トラブル防止",
    description:
      "お得なファミリープランやシェアプラン。友達や家族と共有しているサブスク代、毎月どうやって回収する？払い忘れを防ぐ自動化テクニック。",
    date: "2026-02-02",
    imageUrl: "/images/articles/subscription-sharing.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Netflix、Spotify、YouTube Premium、Amazon Prime…。生活に欠かせないサブスクリプションサービス。<br>
        ファミリープランなどを友人とシェアして安く済ませている人も多いですが、月額数百円の回収、面倒くさくなって放置していませんか？<br>
        「ちりつも」で結構な金額になるサブスク代の管理術を紹介します。
      </p>

      <img src="/images/articles/subscription-apps.png" alt="スマホのサブスク画面" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. 「年払い」で一括回収が最強</h2>
      <p>毎月300円を請求して、振り込んでもらう。これは双方にとって手間すぎます。</p>
      <p>多くのサービスには「年額プラン」があります。代表者が年額を一括で支払い、メンバーから1年分を先に回収してしまうのが最も効率的です。</p>
      <p>途中で解約した場合の返金ルール（月割りで返すのか、返金なしか）を最初に決めておけば完璧です。</p>

      <h2>2. 毎月払いなら「自動送金」を活用</h2>
      <p>どうしても月払いにしたい場合は、銀行の「自動送金機能」を使いましょう。</p>
      <p>ネット銀行なら、毎月指定日に指定額を自動で振り込む設定が無料でできることが多いです。「忘れてた！」を防ぐ唯一の方法です。</p>

      <h2>3. 割り勘アプリに「定期登録」する</h2>
      <p>生活費などを共有しているルームメイトやカップルの場合、割り勘アプリにサブスク代を登録しておきます。</p>
      <p>「みんなの割り勘」のようなツールで、毎月発生する支出として記録し、他の買い物と合算して精算すれば、個別に現金をやり取りする必要がなくなります。</p>

      <img src="/images/articles/subscription-tv.png" alt="テレビで動画鑑賞" class="rounded-xl w-full my-8 shadow-md" />

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>「切れ目」が見えないからこそ注意</h3>
        <p>サブスクは解約しない限り永遠に課金されます。「もう使ってないのにお金だけ払ってた」といったトラブルにならないよう、半年に一度は見直しを行いましょう。</p>
      </div>
    `,
  },
  {
    id: "13",
    slug: "ticket-resale-split",
    title: "ライブ・フェスのチケット代、大量当選した時の精算と譲渡マナー",
    description:
      "友達と手分けして申し込んだら重複当選！チケット代の支払いはどうする？定価譲渡やリセール時の手数料負担など、デリケートな推し活のお金事情。",
    date: "2026-02-03",
    imageUrl: "/images/articles/ticket-resale-split.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        人気アーティストのライブチケット。「絶対に当てたい！」と友人と協力して複数名義で申し込んだ結果、まさかの重複当選（ダブり）。<br>
        嬉しい悲鳴ですが、数十万円の請求が来たり、譲り先を探したりと大変な事態に。<br>
        推し活仲間と揉めないための、チケット代精算ルールを解説します。
      </p>

      <img src="/images/articles/ticket-live.png" alt="ライブ会場の熱狂" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. 申し込み前の「協定」が全て</h2>
      <p>当落発表後に話し合うのは遅すぎます。申し込む前に以下のことを決めておきましょう。</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li><strong>重複した場合の優先順位：</strong> どの席を確保して、どれを流す（支払わない）またはリセールに出すか。</li>
        <li><strong>キャンセル料・手数料の負担：</strong> もし譲り先が見つからず空席にしてしまった場合、そのチケット代は全員で被るか、名義人が被るか。</li>
      </ul>
      <p>基本的には「協力して申し込んだのだから、リスク（余ったチケット代）も連帯責任」とするのがフェアです。</p>

      <h2>2. 手数料を含めた正確な金額を共有</h2>
      <p>チケット代には、システム利用料、発券手数料、決済手数料などが加算されます。チケット券面の価格だけで請求すると、代表者が損をしてしまいます。</p>
      <p>支払い完了画面のスクリーンショットを共有し、手数料込みの総額を人数で割るのが基本です。</p>
      <p>リセールに出す場合も、リセール手数料が引かれるため、そのマイナス分を誰が負担するかも相談が必要です。</p>

      <h2>3. 高額な立て替えはリスク大</h2>
      <p>クレジットカードで数十万円を一括決済する場合、代表者に大きな負担がかかります（限度額の問題や、未回収リスク）。</p>
      <p>可能であれば、当選確定後にコンビニ支払いにし、各自が必要な分を現金で集めて支払うか、即座に送金してもらうようにしましょう。「給料日後に払うね」はトラブルの元です。</p>

      <img src="/images/articles/ticket-smartphone.png" alt="電子チケット画面" class="rounded-xl w-full my-8 shadow-md" />

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>推し活は楽しく！</h3>
        <p>お金のトラブルでファン同士の関係が崩れるのは悲しいことです。リスク管理もしっかり行って、心置きなくライブを楽しみましょう。</p>
      </div>
    `,
  },
  {
    id: "14",
    slug: "moving-cost-split",
    title:
      "ルームシェア・同棲解消時の引っ越し費用、どこまで折半？敷金・礼金の行方",
    description:
      "同棲解消やシェアハウス解散。家具の処分費、退去クリーニング代、戻ってきた敷金…別れる時のお金の話はトラブルになりがち。円満退去のためのガイドライン。",
    date: "2026-02-04",
    imageUrl: "/images/articles/moving-cost-split.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        出会いがあれば別れもあります。同棲解消やルームシェアの解散。<br>
        感情的になりやすい時期ですが、お金の話はドライに、きっちり済ませる必要があります。<br>
        「立つ鳥跡を濁さず」にするための、退去費用の精算マナーを解説します。
      </p>

      <img src="/images/articles/moving-boxes.png" alt="引っ越しのダンボール" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. 退去費用（クリーニング代・修繕費）の負担</h2>
      <p>契約時に預けた敷金から引かれる場合が多いですが、足りずに追加請求が来ることも。</p>
      <p>基本は<strong>折半</strong>ですが、明らかにどちらかの過失（壁に穴を開けた、タバコのヤニ汚れなど）がある場合は、原因を作った方が多めに負担するのが筋です。</p>
      <p>敷金が返ってきた場合は、入居時に敷金を負担した割合に応じて返金します。</p>

      <h2>2. 家具・家電の処分と所有権</h2>
      <p>「二人で買った冷蔵庫、どっちが持っていく？」<br>
      持っていく方が相手に「買取額」を支払うのが理想的ですが、中古価格を見積もるのは難しいもの。</p>
      <p>「持っていく方が配送費を負担する」<br>
      「置いていく（処分する）場合は処分費を折半する」<br>
      といったルールで合意することが多いです。誰も引き取らない粗大ごみの処分費は、意外と高額になるので注意が必要です。</p>

      <h2>3. 精算のタイミング</h2>
      <p>退去後、1ヶ月〜2ヶ月経ってから管理会社から精算書が届くこともあります。<br>
      別れた後にお金の連絡を取るのは億劫ですが、住所変更や連絡先変更は確実に伝えておきましょう。</p>
      <p>可能であれば、退去の見積もりが出た時点で概算で精算してしまい、「後からの請求はなし」とするのが精神衛生上良いかもしれません。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>最後の共同作業</h3>
        <p>お金の清算は、二人の関係をきれいに終わらせるための最後の共同作業です。感情は一旦横に置いて、事務的に淡々と進めるのがコツです。</p>
      </div>
    `,
  },
  {
    id: "15",
    slug: "potluck-party-cost",
    title:
      "持ち寄りパーティ（ポットラック）の原価計算！手作り料理 vs 既製品の公平な割り勘ライン",
    description:
      "「一品持ち寄りで！」と言われた時の予算感は？手間ひまかけた手料理と、デパ地下の惣菜はどう評価する？不公平感を出さない持ち寄りパーティのコツ。",
    date: "2026-02-05",
    imageUrl: "/images/articles/potluck-party-cost.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        ホームパーティーで定番の「ポットラック（持ち寄り）」形式。<br>
        ホストの負担が減る良いシステムですが、「Aさんは高級ワイン、Bさんはスナック菓子」のような格差が生まれると、モヤモヤが残ります。<br>
        みんなが心から楽しめる持ち寄りのルールとは？
      </p>

      <img src="/images/articles/potluck-table.png" alt="豪華な持ち寄り料理" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. 予算目安を事前に設定する</h2>
      <p>「一人2,000円〜3,000円程度のもので」と緩く縛りをつけるのがベストです。</p>
      <p>これなら、「手作り派」は材料費で良い肉を使えますし、「購入派」もデパ地下で恥ずかしくないものを選べます。</p>
      <p>飲み物は重くて持参が大変なので、ホストが一括購入し、その分を会費として徴収する（料理持ち寄り＋飲み物代1,000円など）形式もスムーズです。</p>

      <h2>2. 手作り料理の「原価」はどう考える？</h2>
      <p>一番難しいのがここです。手間暇かけた煮込み料理の「労力」をお金に換算するのはナンセンス。</p>
      <p>持ち寄りパーティでは、<strong>「手作り料理は材料費のみをコストとみなす（手間はプライスレスな提供）」</strong>と割り切るのが一般的です。</p>
      <p>「大変だったから高く見積もってよ」と思うなら、既製品を買っていった方がトラブルになりません。</p>

      <h2>3. 担当ジャンルを決めて被りを防ぐ</h2>
      <p>全員がポテトサラダを作ってきたら悲劇です。</p>
      <p>「Aさんは前菜」「Bさんはメイン」「Cさんはデザート」「Dさんはお酒」と担当を割り振ると、フルコースのような豪華な食卓になります。</p>
      <p>LINEのグループノートなどで「これ持っていきます！」と宣言していくスタイルも盛り上がります。</p>

      <img src="/images/articles/potluck-cheers.png" alt="パーティでの乾杯" class="rounded-xl w-full my-8 shadow-md" />

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>「見返り」を求めないのがマナー</h3>
        <p>持ち寄りは「みんなに食べてほしい」「喜んでほしい」というGIVEの精神で成り立つものです。あまり損得勘定を持ち込まず、美味しい時間を共有しましょう。</p>
      </div>
    `,
  },
];

const articlesEn: Article[] = [
  {
    id: "1",
    slug: "ski-trip-settlement",
    title:
      "Ski & Snowboard Trip Bill Splitting Guide: From Lift Tickets to Gas",
    description:
      "A winter classic: the ski trip. Avoid trouble and ensure a fun time by mastering the art of splitting expenses for gas, lift tickets, and rentals.",
    date: "2026-01-20",
    imageUrl: "/images/articles/ski-trip-settlement.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Snowboarding trips with friends are incredibly fun, but they are also events with a high "bill-splitting difficulty level".<br>
        Gas money for the driver, individual lift tickets, rentals, accommodation, meals...<br>
        Here are tips to settle these smoothly, including failed examples to learn from.
      </p>

      <img src="/images/articles/ski-trip-car.png" alt="Inside the car on a ski trip" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. Consideration for the Driver (Gas & Tolls)</h2>
      <p>Driving is common for ski trips, but consideration for the driver is essential. If you take this for granted, they might not want to drive next time.</p>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg my-6">
        <h3 class="font-bold mb-4 text-lg">General Rules</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Gas & Tolls:</strong> Split among everyone (discuss beforehand if the driver pays or is exempt). Filling up at the start and again upon return to pay the exact receipt amount is the most accurate method.</li>
          <li><strong>Thanking the Driver:</strong> Treating the driver to a meal or buying them a Starbucks coffee is a smart gesture.</li>
          <li><strong>Wear & Tear (Important):</strong> Considering tire and oil wear from long-distance driving, it's becoming common to give "Gas + a few thousand yen" as a vehicle depreciation fee.</li>
        </ul>
      </div>

      <h2>2. Separating Individual vs. Common Expenses</h2>
      <p>Expenses differ by nature. "Rental only for me" or "Lesson fee" are individual, while "Dinner for everyone" and "Accommodation" are common.</p>
      <p>Basically, <strong>settle individual equipment costs on the spot</strong>, and <strong>split only common costs like accommodation and dinner</strong>.</p>
      <p>Lift tickets can be tricky with early booking discounts or coupons. If purchasing in bulk beforehand, keep a clear note of who owes what.</p>

      <img src="/images/articles/ski-trip-meal.png" alt="Meal at the ski resort" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. A "Common Wallet" is Convenient</h2>
      <p>Small expenses like convenience stores or service area snacks pile up. Asking for "350 yen please" every time is nonsense.</p>
      <p>Collect 5,000 to 10,000 yen from everyone beforehand to create a "Common Wallet" and pay from there to avoid individual register hassles.</p>
      <p>Refund the leftover money at the end or use it for the final dinner. It's polite for someone other than the driver to manage this wallet.</p>

      <h2>4. Hot Spring & Bathing Fees</h2>
      <p>The post-ski hot spring is a highlight, but towel rentals can create small differences. You can either "Pay entrance fee from common wallet, towels individually" or just "Pay everything from common wallet" for simplicity.</p>
      <p>It's better for everyone to get into the bath quickly and relax rather than spending time calculating small differences.</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>Summary</h3>
        <p>Don't say "Let's figure out money later." Setting rules beforehand is the secret to going again next year. Show gratitude to the driver not just with words, but with your wallet too.</p>
      </div>
    `,
  },
  {
    id: "2",
    slug: "bbq-party-split",
    title: "BBQ & Home Party Buying and Splitting Guide [Organizer Must-See]",
    description:
      "Food, Drinks, Location... managing roles and costs for BBQ can be tough. Techniques to track who paid what and split fairly between drinkers and non-drinkers.",
    date: "2026-01-21",
    imageUrl: "/images/articles/bbq-party-split.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        BBQs under the blue sky or cozy home parties.<br>
        However, if multiple people go shopping separately, you'll fight a mountain of receipts at settlement time.<br>
        Here are techniques to avoid confusion like "Who bought this meat?" or "Off-setting with the veggies A bought."
      </p>

      <img src="/images/articles/bbq-party-grill.png" alt="Grilling meat at BBQ" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. Snap Photos of Receipts to Group Chat Immediately</h2>
      <p>Paper receipts fly away or get dirty. In BBQs, they often get trashed by accident.</p>
      <p>Snap a photo immediately after buying. Upload it to the group album. This alone reduces trouble. Declaring "No receipt, no reimbursement" beforehand is also effective.</p>

      <h2>2. Weighted Split for Drinks</h2>
      <p>One common conflict is "Drinkers vs. Non-Drinkers".</p>
      <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg my-6">
        <p class="font-bold mb-2">Recommended Solution</p>
        <p class="mb-4">Separate receipts for Alcohol and Soft Drinks/Food.</p>
        <ul class="list-disc pl-5">
          <li><strong>Food & Location:</strong> Split evenly among everyone.</li>
          <li><strong>Alcohol:</strong> Split only among drinkers.</li>
          <li><strong>Soft Drinks:</strong> Split among everyone (or non-drinkers).</li>
        </ul>
      </div>
      <p>Non-alcoholic beer can be expensive, so be flexible. A flat fee difference like "Drinkers pay +2,000 yen" is also simple.</p>

      <img src="/images/articles/bbq-party-drinks.png" alt="Cheers with drinks" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. Handling Remainders</h2>
      <p>Splitting down to the last yen takes time and creates loose change issues.</p>
      <p>Round up to the nearest 100 or 500 yen, and use the surplus to buy ice cream or tip the organizer. Or simply use payment apps.</p>
      <p>Using apps like PayPay or Venmo allows 1-yen accuracy without hassle.</p>

      <h2>4. Use Bill Splitting Apps</h2>
      <p>Apps like "OurSplit" calculate everything instantly, including advanced splits like "A paid 3000, B paid 5000" and "C didn't drink".</p>
      <p>Don't waste time tapping a calculator. Spend that time grilling meat.</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>Solve Instantly with Apps</h3>
        <p>Record expenses as you go. Don't interrupt the fun time with math; let the tools handle it.</p>
      </div>
    `,
  },
  {
    id: "3",
    slug: "office-lunch-split",
    title: "Office Lunch Splitting: Smart Manners and Tips",
    description:
      "Struggling at the register with colleagues? Learn 'adult splitting manners' for places that don't do separate checks. Tips for digital payments and organizers.",
    date: "2026-01-22",
    imageUrl: "/images/articles/office-lunch-split.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Daily office lunch is a time to refresh, but awkward air at the register is best avoided.<br>
        Especially in busy shops, not fumbling at the register is good manners. Be ready to leave quickly after "Gochisosama".
      </p>

      <img src="/images/articles/office-lunch-pay.png" alt="Payment at register" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. Read the Room for "Separate Checks"</h2>
      <p>It's hard to ask for separate checks when the register is busy. Many shops refuse individual payments during peak lunch hours.</p>
      <p>Ideally, one person pays, and you settle later. The payer gets points, which is a perk. Rotating the payer role daily avoids burdening one person.</p>

      <h2>2. The "No Exact Change" Problem</h2>
      <p>"I only have a 10,000 yen bill" or "No small change" happens often. It wastes time.</p>
      <p><strong>Payment Apps (PayPay, LINE Pay, etc.)</strong> solve this.</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li>No need for coins.</li>
        <li>Pay to the exact yen.</li>
        <li>History remains.</li>
        <li>No awkward "Keep the change" social dance.</li>
      </ul>
      <p>Unifying the app used within your lunch group makes it super smooth. "I'll PayPay you" is all it takes.</p>

      <img src="/images/articles/office-lunch-smartphone.png" alt="Sending money on phone" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. When With Bosses or Seniors</h2>
      <p>If a boss says "I'll pay", accepting gracefully is communication. Refusing too hard can be rude.</p>
      <p>If you feel bad about it happening every time, offer to pay for coffee next. Or if splitting, let the boss pay the fraction or a bit more ("It's 3,800, I'll pay 2,000, you two split the rest").</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>Summary</h3>
        <p>Lunch payment is daily, so make it stress-free. Use digital tools for a comfortable lunch break.</p>
      </div>
    `,
  },
  {
    id: "4",
    slug: "roomshare-expenses",
    title: "Roomshare Expenses: Rent & Utilities Management Tips",
    description:
      "Living with friends. Clarify rules for rent, utilities, and daily supplies to prevent money from ruining friendship. Shared wallet and app tips.",
    date: "2026-01-23",
    imageUrl: "/images/articles/roomshare-expenses.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Roomsharing with friends is fun, but money differences can breed trouble.<br>
        Rent, utilities, and irregular costs like toilet paper. What's the right way to manage them?
      </p>

      <img src="/images/articles/roomshare-living.png" alt="Roomshare living room" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. Fixed vs. Variable Costs</h2>
      <p><strong>Rent & Internet (Fixed):</strong> Set a transfer deadline and a person in charge. Automatic transfers prevent forgetting.</p>
      <p><strong>Utilities (Variable):</strong> Amounts change monthly. Share the bill photo and split. Sharing login info for web statements makes it smoother.</p>

      <h2>2. Managing "Nameless Expenses" (Supplies)</h2>
      <p>Detergent, trash bags, seasonings. These small costs cause fights.</p>
      <p>The "Whoever notices buys it" rule burdens specific people. "I feel like I'm always buying toilet paper" is the start of the end.</p>
      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg my-6">
        <h3 class="font-bold mb-4 text-lg">Solution: Shared Expense Pool</h3>
        <p>Put 2,000 yen each into a shared wallet (or envelope/account) monthly. Buy supplies from there.<br>
        No one feels unfair, and you just refill when it runs low.</p>
      </div>

      <img src="/images/articles/roomshare-shopping.png" alt="Shopping for supplies" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. Visualize with Tools</h2>
      <p>Input into an app whenever someone pays for something shared.</p>
      <p>At month-end, it calculates "A bought 3000, B bought 1000 -> B pays A 1000". Instant solution.</p>
      <p>A whiteboard on the fridge works, but a mobile app is sustainable for on-the-go entry.</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>For Comfortable Living</h3>
        <p>Clarifying money rules protects your relationship. Discuss thoroughly at the start.</p>
      </div>
    `,
  },
  {
    id: "5",
    slug: "travel-currency-exchange",
    title: "Overseas Trip Splitting: How to Calculate Exchange Rates?",
    description:
      "Mixed currencies, credit card payments, cash exchanges. How to settle in your home currency? Simple methods to handle rate fluctuations.",
    date: "2026-01-24",
    imageUrl: "/images/articles/travel-currency-exchange.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Splitting bills abroad is complex.<br>
        "Paid in local cash", "Paid in exchanged cash", "Paid via Credit Card (billed later)".<br>
        How do you settle this in your home currency?
      </p>

      <img src="/images/articles/travel-currency-calc.png" alt="Currency calculation" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. Deciding a Base Rate</h2>
      <p>Rates fluctuate daily. Trying to be exact leads to madness.</p>
      <p><strong>Pick one rate (Day 1 rate or Average Exchange Rate) and apply it to everything.</strong> This is the most peaceful method.</p>
      <p>If everyone agrees, treat small rate differences as acceptable margin of error.</p>

      <h2>2. Handling Credit Card Payments</h2>
      <p>Card billing amounts aren't fixed until the statement comes (fees added).</p>
      <p>Don't be exact. <strong>Use "App Rate x 1.02 (approx 2% fee)"</strong> for a provisional calculation and settle it.</p>
      <p>Asking for "10 yen back" weeks later is stressful for everyone. Estimate slightly high, and let the payer keep the surplus as a "service fee".</p>

      <img src="/images/articles/travel-currency-card.png" alt="Credit card payment" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. Use Multi-Currency Apps</h2>
      <p>Manual calculation is impossible when A paid in USD, B in JPY, and C in Won.</p>
      <p>Use an app that supports foreign currencies.</p>
      <p>"OurSplit" supports major currencies and auto-converts to your home currency. Auto-rate fetching makes it even easier.</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>Smart End to the Trip</h3>
        <p>A smooth settlement is worth more than a few yen of exchange difference. Agree on rough rules.</p>
      </div>
    `,
  },
  {
    id: "6",
    slug: "couple-finances",
    title: "Couples' Finances: Common Wallet vs. Split?",
    description:
      "Cohabitation before marriage. How do you manage money? 3 patterns tailored to your personalities and income differences.",
    date: "2026-01-25",
    imageUrl: "/images/articles/couple-finances.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        The first thing to decide when living together is "Money Rules".<br>
        Leaving it vague leads to burden and resentment.<br>
        Here are 3 management patterns.
      </p>

      <img src="/images/articles/couple-finances-piggy.png" alt="Saving together" class="rounded-xl w-full my-8 shadow-md" />

      <h2>Pattern A: Common Wallet (Allowance System)</h2>
      <p>Both put a fixed amount (e.g., 100k each) into a common account/wallet. All living costs come from there.</p>
      <ul class="list-disc pl-5 mb-4">
        <li><strong>Pros:</strong> Easy to see total costs. Easier to save surplus. Good practice for marriage.</li>
        <li><strong>Cons:</strong> Hard to spend on personal hobbies. You might judge partner's wastefulness.</li>
      </ul>

      <h2>Pattern B: Item-Based Responsibility</h2>
      <p>"He pays rent, She pays food & utilities." Splitting by category.</p>
      <ul class="list-disc pl-5 mb-4">
        <li><strong>Pros:</strong> Easy management. Less interference in each other's wallet. Low stress.</li>
        <li><strong>Cons:</strong> Unfair burden (food costs vary). Rent payer's burden is fixed.</li>
      </ul>

      <img src="/images/articles/couple-finances-talk.png" alt="Couple talking" class="rounded-xl w-full my-8 shadow-md" />

      <h2>Pattern C: Pay & Settle (App Management)</h2>
      <p>Whoever can pay pays. Record everything in an app. Settle the difference at month-end.</p>
      <ul class="list-disc pl-5 mb-4">
        <li><strong>Pros:</strong> Earn credit card points individually. Perfectly fair (down to 1 yen).</li>
        <li><strong>Cons:</strong> Recording is a hassle (habit is key). Need to avoid seeming "stingy".</li>
      </ul>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>Find Your Method</h3>
        <p>There is no single right answer. Try one for a few months, then switch if it doesn't work. Communication is key.</p>
      </div>
    `,
  },
  {
    id: "7",
    slug: "wedding-afterparty-split",
    title: "Wedding After-Party Organizer Guide: Transparent Accounting",
    description:
      "Managing large sums for after-parties. How to balance fees and expenses, and report to the couple and guests. Avoiding deficits.",
    date: "2026-01-26",
    imageUrl: "/images/articles/wedding-afterparty-split.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Being an after-party organizer is a big responsibility.<br>
        With large sums involved, sloppy management leads to "missing money" trouble.<br>
        Manage money strictly for the best day.
      </p>

      <img src="/images/articles/wedding-party.png" alt="Wedding party" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. Budget for "No Deficit"</h2>
      <p>Last-minute cancellations and unforeseen purchases happen.</p>
      <p>Don't set "Fee x Guest Count = Budget". Leave a 10% buffer.<br>
      Use surplus for a gift to the couple or the 3rd party. "It's not enough, so please pay more" to the couple is the worst scenario.</p>

      <h2>2. Share Expense Records Immediately</h2>
      <p>Organizers will front money for prizes, supplies, etc.</p>
      <p>Share receipt photos to a drive or chat album and log in a spreadsheet/app immediately. "Doing it later" leads to failure.</p>

      <img src="/images/articles/wedding-receipts.png" alt="Receipt organizing" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. Final Report</h2>
      <p>Report the balance to the couple after the party. Without this, they might wonder "Where did the extra money go?"</p>
      <p>"Income: Fees caused XX", "Expense: Venue/Prizes XX", "Balance: XX (Given to couple)". Transparency builds trust.</p>
      <p>Sharing an app screenshot is enough proof.</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>Transparency is Everything</h3>
        <p>Clear money management allows organizers to enjoy the celebration too.</p>
      </div>
    `,
  },
  {
    id: "8",
    slug: "gift-group-purchase",
    title: "Group Gift Buying: Payment & Collection Best Practices",
    description:
      "Buying a gift together? Who buys it and how to collect money? Backward management for a successful surprise.",
    date: "2026-01-27",
    imageUrl: "/images/articles/gift-group-purchase.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Birthdays or baby showers. Expensive gifts become affordable when split.<br>
        But collecting money becomes a hassle as numbers grow. Smooth financial coordination is key to a surprise.
      </p>

      <img src="/images/articles/gift-box.png" alt="Gift box" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. Budget & Members</h2>
      <p>Decide "How much per person". Too high makes it hard to join; 3,000-5,000 yen is standard.</p>
      <p>Don't spread the invitation too wide. People not close to the person might feel burdened.</p>

      <h2>2. Collect Before or After?</h2>
      <p><strong>Collecting "After Purchase" (Amount Fixed) is recommended.</strong></p>
      <p>Collecting beforehand risks needing small refunds if it was cheaper.</p>
      <p>Tell them "Approx XX yen", then inform the exact amount with the receipt after purchase. For very expensive items, collecting beforehand is safer for the buyer.</p>

      <h2>3. Remote Friends</h2>
      <p>Gifting among SNS friends is common now.</p>
      <p>Amazon Wishlists are easy, but for surprises, one person buys and collects via payment apps.</p>
      <p>Use apps that generate payment links so you don't need to share bank account details.</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>Quick Money Talk</h3>
        <p>Choosing gifts is fun, talking money isn't. Use tools to finish it quickly and focus on celebrating.</p>
      </div>
    `,
  },
  {
    id: "9",
    slug: "drinking-party-izakaya",
    title: "Drinking Party Splitting: 3 Rules to Avoid Awkwardness",
    description:
      "Late arrivals? Non-drinkers? Boss pays more? Preventing common troubles in drinking party accounting.",
    date: "2026-01-28",
    imageUrl: "/images/articles/drinking-party-izakaya.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        The dreaded bill time at the end of a fun party.<br>
        "I only had one sip..." Many swallow this complaint.<br>
        Here are rules for organizers to ensure a fair split.
      </p>

      <img src="/images/articles/izakaya-cheers.png" alt="Cheers at Izakaya" class="rounded-xl w-full my-8 shadow-md" />

      <h2>Rule 1: Decide Tilt Rules First</h2>
      <p>Deciding rules during payment leads to fights.</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li>"Late > 1 hour: -2,000 yen"</li>
        <li>"Non-drinkers: -1,000 yen"</li>
        <li>"Leaving early: Leave 3,000 yen"</li>
      </ul>
      <p>Declare these simple rules at the start.</p>

      <h2>Rule 2: Use Courses</h2>
      <p>A la carte makes accounting opaque. "Who ordered the expensive meat?"</p>
      <p>All-you-can-drink courses fix the amount, making collection easy.<br>
      At least add "All-you-can-drink" to avoid drink cost disputes.</p>

      <h2>Rule 3: Collect at Entry</h2>
      <p>Collecting when drunk causes errors and forgetting.</p>
      <p>For fixed fees, collect before entering or before the toast.<br>
      Settle extras at the end. It's mentally easier.</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>Creating "Fairness"</h3>
        <p>Fairness isn't about exact yen; it's about feeling "my situation was considered". Use apps with weighted splitting.</p>
      </div>
    `,
  },
  {
    id: "10",
    slug: "family-trip-expenses",
    title: "3-Generation Trip: Managing Money Without Burdening Parents",
    description:
      "Parents, You, and Grandkids. Let parents pay? Split evenly? Ideas to share costs smoothly without awkwardness.",
    date: "2026-01-29",
    imageUrl: "/images/articles/family-trip-expenses.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        A trip with three generations.<br>
        "Parents will pay" is common, but you might feel guilty relying on them too much...<br>
        How to spend time comfortably?
      </p>

      <img src="/images/articles/family-trip-photo.png" alt="Family trip photo" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. "Invitation" or "Joint Trip"?</h2>
      <p>Clarify if this is "You inviting parents" or "Going together".</p>
      <p>If inviting, tell them "Put your wallet away". If joint, consider their pension situation and ask for a reasonable contribution.</p>

      <h2>2. Split by Item</h2>
      <p>Exact splitting feels too formal involving family.</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li><strong>Accommodation:</strong> Parents pay.</li>
        <li><strong>Transport/Meals:</strong> You pay.</li>
        <li><strong>Souvenirs for Grandkids:</strong> Grandparents pay.</li>
      </ul>
      <p>Assigning roles lets everyone feel they contributed.</p>

      <h2>3. Make a "Trip Wallet"</h2>
      <p>Even if parents pay more, having them open their wallet at every register isn't smart.</p>
      <p>Collect a lump sum from parents and yourselves into a "Trip Wallet".<br>
      One representative pays from there. Refund leftovers later.</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>Express Gratitude</h3>
        <p>"Thank you, it was fun" is the best settlement. Have a great trip!</p>
      </div>
    `,
  },
  {
    id: "11",
    slug: "date-splitting",
    title: "Dating Expenses: Who Pays? Realities for 20s & 30s",
    description:
      "Treat or Split? First date, before dating, as a couple. Smart payments for different situations. Trends and real voices.",
    date: "2026-02-01",
    imageUrl: "/images/articles/date-splitting.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        "Should men pay?" is a constant debate. Values are diversifying, not everyone wants to be treated.<br>
        However, payment behavior affects impressions. Here are modern dating manners.
      </p>

      <img src="/images/articles/date-dinner.png" alt="Dinner date" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. First Date: Men Paying More is Still Common</h2>
      <p>Surveys show many still prefer men to pay (or pay more) on the first date.</p>
      <p>It's seen as a sign of "I enjoyed the time" or "I value you".<br>
      Men saying "I got this" looks smart.</p>
      <p>Women should assume they will pay too. "I'll get the coffee next" is a perfect follow-up.</p>

      <h2>2. Long-term: Alternating or Common Wallet</h2>
      <p>One person paying always is a burden. Rules change naturally.</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li><strong>Alternating:</strong> He pays lunch, She pays movies.</li>
        <li><strong>Common Wallet:</strong> Monthly contributions to a shared fund. Common for serious couples.</li>
      </ul>

      <img src="/images/articles/date-movie.png" alt="Movie date" class="rounded-xl w-full my-8 shadow-md" />

      <h2>3. Splitting with Apps</h2>
      <p>Exchanging coins at the register is uncool.</p>
      <p>Pay with a card and settle via Venmo/PayPay later. Or record in a split app.</p>
      <p>Requesting slightly less ("It was 5000, just give me 2000") can be a smooth move.</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>Respect is Key</h3>
        <p>"Thank you for the meal". Simply showing gratitude changes how willing the payer feels.</p>
      </div>
    `,
  },
  {
    id: "12",
    slug: "subscription-sharing",
    title: "Managing Shared Subscriptions: Netflix, Spotify...",
    description:
      "Family plans are cheap. But how do you collect 300 yen monthly from friends? Prevents forgetting with automation.",
    date: "2026-02-02",
    imageUrl: "/images/articles/subscription-sharing.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Netflix, Spotify, Amazon Prime... Essential subscriptions.<br>
        Sharing family plans saves money, but collecting small amounts monthly is a hassle.<br>
        Here's how to manage "micro-debts".
      </p>

      <img src="/images/articles/subscription-apps.png" alt="Subscription apps on phone" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. Annual Payment is Best</h2>
      <p>Collecting 300 yen monthly is painful for both sides.</p>
      <p>Use annual plans. The organizer pays upfront, and collects 1 year's worth from members. Efficient.</p>
      <p>Decide refund rules for mid-year cancellations beforehand.</p>

      <h2>2. Auto-Transfer for Monthly</h2>
      <p>If monthly is needed, use automatic bank transfers.</p>
      <p>Online banks often offer free auto-transfers. It avoids "I forgot!"</p>

      <h2>3. Register in Split App</h2>
      <p>For roommates, register the sub in your expense app.</p>
      <p>Tools like "OurSplit" treat it as a recurring expense, offsetting it against other shared costs.</p>

      <img src="/images/articles/subscription-tv.png" alt="Watching TV" class="rounded-xl w-full my-8 shadow-md" />

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>Watch Out for "Subscriptions"</h3>
        <p>They charge forever. Review every 6 months to ensure you aren't paying for what you don't use.</p>
      </div>
    `,
  },
  {
    id: "13",
    slug: "ticket-resale-split",
    title: "Concert Ticket Splitting: Duplicate Wins & Resale",
    description:
      "Duplicate wins when applying with friends! How to pay? Resale fees? Delicate money matters for fandoms.",
    date: "2026-02-03",
    imageUrl: "/images/articles/ticket-resale-split.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Popular concert tickets. Applying with friends to win, but winning too many duplicate tickets.<br>
        It costs a fortune. Finding buyers is hard. Don't fight with your fandom friends.
      </p>

      <img src="/images/articles/ticket-live.png" alt="Concert crowd" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. The Pre-Application "Treaty"</h2>
      <p>Discussing after winning is too late. Decide before:</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li><strong>Priority:</strong> Which seats to keep, which to resell.</li>
        <li><strong>Fees/Losses:</strong> If tickets don't sell, who pays? Shared responsibility or the applicant?</li>
      </ul>
      <p>Basically, "Since we cooperated to apply, we share the risk (unsold tickets)" is fair.</p>

      <h2>2. Share Exact Amounts with Fees</h2>
      <p>Tickets have system fees, issuance fees, etc. Charged only face value means the organizer loses money.</p>
      <p>Share payment screenshots. Split the TOTAL including fees.</p>
      <p>Discuss who bears resale platform fees too.</p>

      <h2>3. Fronting Large Sums is Risky</h2>
      <p>Fronting hundreds of thousands on a credit card is a burden.</p>
      <p>If possible, use convenience store payment after winning, and have everyone bring cash or send money immediately. "Pay you after payday" is trouble.</p>

      <img src="/images/articles/ticket-smartphone.png" alt="Electronic ticket" class="rounded-xl w-full my-8 shadow-md" />

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>Enjoy the Show!</h3>
        <p>Don't let money ruin fandom friendships. Manage risks and enjoy the live performance!</p>
      </div>
    `,
  },
  {
    id: "14",
    slug: "moving-cost-split",
    title: "Roomshare/Cohabitation Dissolution: Moving Cost Split",
    description:
      "Breaking up or dissolving sharehouse. Furniture disposal, cleaning fees, deposit return... Handling the 'breakup money' without fights.",
    date: "2026-02-04",
    imageUrl: "/images/articles/moving-cost-split.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Parting ways happens. Dissolving a living arrangement.<br>
        Emotions run high, but money talk must be dry and precise.<br>
        How to leave on good terms.
      </p>

      <img src="/images/articles/moving-boxes.png" alt="Moving boxes" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. Cleaning & Repair Fees</h2>
      <p>Usually deducted from the deposit, but can exceed it.</p>
      <p>Basically <strong>split 50/50</strong>. But if one caused damage (wall holes, smoking), they pay more.</p>
      <p>Refund returned deposits based on initial contribution ratio.</p>

      <h2>2. Furniture Disposal & Ownership</h2>
      <p>"Who keeps the fridge we bought together?"<br>
      Ideally, the keeper pays the other "buyout value", but estimating is hard.</p>
      <p>"Keeper pays shipping"<br>
      "If disposing, split disposal fees"<br>
      Agree on rules. Disposal costs can be high.</p>

      <h2>3. Timing of Settlement</h2>
      <p>Bills often come 1-2 months later.<br>
      It's annoying to contact ex-partners later. Update addresses.</p>
      <p>If possible, estimate at move-out and settle "No claims after this" for mental peace.</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>The Last Joint Task</h3>
        <p>Money settlement is the final joint task. Put emotions aside and proceed administratively.</p>
      </div>
    `,
  },
  {
    id: "15",
    slug: "potluck-party-cost",
    title: "Potluck Party Costing: Homemade vs Store-bought",
    description:
      "Budget for 'Bring a dish'? How to value labor for homemade food vs deli food? Avoiding unfairness in potlucks.",
    date: "2026-02-05",
    imageUrl: "/images/articles/potluck-party-cost.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Potlucks are classic.<br>
        Reduces host burden, but "A brings wine, B brings snacks" creates gaps.<br>
        Rules for a fair potluck.
      </p>

      <img src="/images/articles/potluck-table.png" alt="Potluck table" class="rounded-xl w-full my-8 shadow-md" />

      <h2>1. Set a Budget Range</h2>
      <p>"Something around 2,000-3,000 yen". Loose binding is best.</p>
      <p>Allows cooks to buy good ingredients, and buyers to get nice deli food.</p>
      <p>Drinks are heavy, so maybe the host buys them and collects a 1,000 yen fee.</p>

      <h2>2. Costing Homemade Food</h2>
      <p>This is hard. Pricing "labor" for stew is nonsense.</p>
      <p><strong>"Homemade = Ingredient Cost Only (Labor is a gift)"</strong> is the standard rule.</p>
      <p>If you think "It was hard work, pay me more", just buy something next time.</p>

      <h2>3. Assign Categories</h2>
      <p>Everyone bringing potato salad is a tragedy.</p>
      <p>"A: Appetizer", "B: Main", "C: Dessert". Creates a full course.</p>
      <p>Declaring "I'm bringing this!" in group chat builds excitement.</p>

      <img src="/images/articles/potluck-cheers.png" alt="Cheers at party" class="rounded-xl w-full my-8 shadow-md" />

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>Don't Expect Return</h3>
        <p>Potluck is about GIVING. Don't count pennies, enjoy the food sharing.</p>
      </div>
    `,
  },
];

export const getArticles = (locale: string): Article[] => {
  if (locale === "ja") return articlesJa;
  return articlesEn; // Fallback to English for other languages
};

export const articles = articlesJa;
