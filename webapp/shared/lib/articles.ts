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
    slug: "smart-settlement-travel",
    title: "旅行での賢い精算術：トラブルを避けるための3つのポイント",
    description:
      "楽しい旅行の最後にお金のことで揉めたくないですよね。賢い精算方法と、トラブルを避けるためのコツを紹介します。",
    date: "2026-01-15",
    imageUrl: "/images/articles/travel-settlement.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        友人や家族との旅行はとても楽しいものですが、避けて通れないのが「お金の計算」です。<br>
        誰が何にいくら払ったのか、立て替え払いが複雑になりがちで、帰宅後の精算作業が大きな負担になることも少なくありません。
      </p>

      <h2>1. レシートは必ず保管し、その場で記録する</h2>
      <p>最も基本的なことですが、レシートはその場で写真を撮るか、専用のポーチにまとめておきましょう。</p>
      <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 border-l-4 border-blue-500">
        <p class="font-bold mb-2">💡 ポイント</p>
        <p class="m-0 text-sm">「後でやろう」はトラブルの元です。記憶は驚くほど早く薄れていきます。</p>
      </div>

      <h2>2. 共通財布を作る（メリット・デメリット）</h2>
      <p>あらかじめ全員から一定額を集めて「共通財布」を作る方法も有効です。食費や入場料など、全員にかかる費用はここから支払います。</p>
      
      <h3>メリット</h3>
      <ul class="list-disc pl-5 mb-4">
        <li>個別の計算が不要で楽。</li>
        <li>会計時に誰が払うか揉めない。</li>
      </ul>

      <h3>デメリット</h3>
      <ul class="list-disc pl-5 mb-4">
        <li>途中で足りなくなった時の追加徴収が面倒。</li>
        <li>最後に余った時の返金計算が必要。</li>
      </ul>

      <h2>3. 割り勘アプリを活用する</h2>
      <p>最近のトレンドは、割り勘アプリの活用です。「誰が」「何のために」「いくら」払ったかを入力するだけで、最後に「誰が誰にいくら払えばいいか」を自動計算してくれます。</p>
      <p>当サイトのツール <strong>みんなの割り勘</strong> も、まさにそのために作られました。ログイン不要でURLを共有するだけですぐに使えます。</p>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3>まとめ</h3>
        <p>お金のトラブルは人間関係のトラブルに直結します。便利なツールやルールをうまく活用して、旅行の思い出を楽しいまま締めくくりましょう。</p>
      </div>
    `,
  },
  {
    id: "2",
    slug: "group-camp-budget",
    title: "グループキャンプでの予算管理のコツ：買い出しから精算まで",
    description:
      "人数が増えるほど複雑になるキャンプの予算管理。食材、キャンプ場代、交通費...スムーズに管理する方法を解説します。",
    date: "2026-01-16",
    imageUrl: "/images/articles/camp-budget.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        グループキャンプは、ソロキャンプとは違った賑やかさと楽しさがあります。<br>
        しかし、人数が増えれば増えるほど、食材の買い出しや費用の分担が難しくなります。
      </p>

      <h2>予算は事前に決めておく</h2>
      <p>「とりあえずスーパーに行ってから決めよう」は危険です。お酒を飲む人、飲まない人、たくさん食べる人など、メンバーによって消費量も違います。</p>
      <p>「食費」「飲み物代」「サイト利用料」など、大まかな予算上限を決めておきましょう。</p>

      <h2>買い出し担当と支払い担当</h2>
      <p>買い出しは複数人で行くことが多いですが、レジでの支払いは<strong>代表者1人がまとめて行うのがベスト</strong>です。</p>
      <p>複数人がバラバラに支払うと、後で合算するのが大変になります。</p>

      <h2>車出し（交通費）の考慮</h2>
      <p>車を出してくれた人への配慮も重要です。以下のルールを事前に決めておくとスムーズです。</p>
      <ul class="list-disc pl-5 mb-4">
        <li>ガソリン代や高速代はもちろん割り勘</li>
        <li>運転の負担に対して少し多めに負担してもらう</li>
        <li>車出し担当は食費を少し安くする</li>
      </ul>

      <h2>複雑な割り勘もアプリなら一瞬</h2>
      <p>「Aさんはお酒を飲まないからマイナス2000円」「Bさんは車を出したからマイナス3000円」といった複雑な調整も、アプリを使えば簡単です。</p>
      <p class="font-bold text-center my-8 text-lg">電卓を叩く時間は焚き火の時間に充てましょう。</p>
    `,
  },
  {
    id: "3",
    slug: "modern-bill-splitting",
    title: "【2026年版】PayPayなどを使った最新の割り勘事情",
    description:
      "現金での割り勘はもう古い？キャッシュレス時代の新しい割り勘マナーと、便利な送金サービスの活用法。",
    date: "2026-01-17",
    imageUrl: "/images/articles/digital-payment.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        居酒屋やランチでの会計時、「1円単位まできっちり割るか」「ざっくりでいいか」で悩んだ経験はありませんか？<br>
        キャッシュレス決済の普及により、割り勘の常識も変わりつつあります。
      </p>

      <h2>「細かい小銭ない？」からの解放</h2>
      <p>PayPay、LINE Pay、楽天ペイなど、QRコード決済アプリには「個人間送金」機能がついていることがほとんどです。</p>
      <p>これにより、1円単位でのやり取りも手数料無料（条件あり）で瞬時に行えるようになりました。</p>

      <h2>幹事の負担が激減</h2>
      <div class="flex flex-col md:flex-row gap-4 my-8">
        <div class="flex-1 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          <h3 class="text-lg font-bold mb-2 text-red-500">これまで</h3>
          <p class="text-sm">集めた現金の管理やお釣りの準備で大変。計算も合わないことが多い。</p>
        </div>
        <div class="flex-1 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
          <h3 class="text-lg font-bold mb-2 text-blue-600 dark:text-blue-400">これから</h3>
          <p class="text-sm">幹事がカードで一括払いし、参加者は幹事に送金。ポイントも貯まり全員にお得。</p>
        </div>
      </div>

      <h2>記録が残るメリット</h2>
      <p>現金でのやり取りは記録に残りませんが、デジタル送金なら履歴が残ります。「払ったっけ？」「まだもらってないっけ？」という不毛な争いを防ぐことができます。</p>

      <h2>アプリ連携でさらに便利に</h2>
      <p>みんなの割り勘のような割り勘計算ツールで計算結果を出し、その画面をスクリーンショットでグループLINEに共有。そして各々が送金アプリで支払う。</p>
      <p><strong>これが現代のスマートな割り勘フローです。</strong></p>
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
  {
    id: "2",
    slug: "group-camp-budget",
    title: "Group Camping Budget Tips: From Shopping to Settlement",
    description:
      "Managing a camping budget gets more complex with more people. Food, site fees, transport... here's how to manage it smoothly.",
    date: "2026-01-16",
    imageUrl: "/images/articles/camp-budget.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Group camping has a different liveliness and fun compared to solo camping.<br>
        However, the more people there are, the harder it is to share food shopping and expenses.
      </p>

      <h2>Decide the Budget Beforehand</h2>
      <p>"Let's decide after we go to the supermarket" is dangerous. Alcohol drinkers, non-drinkers, big eaters... consumption varies by member.</p>
      <p>Set rough budget caps for "Food", "Drinks", "Site Fees", etc.</p>

      <h2>Shopping and Paying Roles</h2>
      <p>While multiple people often go shopping, it's best if <strong>one representative pays at the register</strong>.</p>
      <p>If multiple people pay separately, adding it up later becomes difficult.</p>

      <h2>Considering Transport Costs</h2>
      <p>Consideration for those who provide cars is important. Deciding rules beforehand helps:</p>
      <ul class="list-disc pl-5 mb-4">
        <li>Split gas and tolls explicitly</li>
        <li>Have drivers pay slightly less for food</li>
      </ul>

      <h2>Complex Splits are Instant with Apps</h2>
      <p>"A doesn't drink alcohol so minus 2000 yen", "B drove so minus 3000 yen" - complex adjustments are easy with an app.</p>
      <p class="font-bold text-center my-8 text-lg">Spend time around the campfire, not hitting a calculator.</p>
    `,
  },
  {
    id: "3",
    slug: "modern-bill-splitting",
    title: "Modern Bill Splitting Trends with Cashless Apps",
    description:
      "Is splitting with cash outdated? New splitting etiquette in the cashless era and how to use transfer services.",
    date: "2026-01-17",
    imageUrl: "/images/articles/digital-payment.png",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Have you ever worried about "splitting to the last yen" vs "roughly splitting" at a izakaya or lunch?<br>
        With the spread of cashless payments, splitting norms are changing.
      </p>

      <h2>Freedom from "Do you have small change?"</h2>
      <p>QR code payment apps usually have "peer-to-peer transfer" functions.</p>
      <p>This allows for 1-yen precise transfers instantly and often without fees.</p>

      <h2>Drastically Reduced Burden on Organizers</h2>
      <div class="flex flex-col md:flex-row gap-4 my-8">
        <div class="flex-1 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          <h3 class="text-lg font-bold mb-2 text-red-500">Before</h3>
          <p class="text-sm">Hard to manage chaotic cash and change. Calculations often don't match.</p>
        </div>
        <div class="flex-1 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
          <h3 class="text-lg font-bold mb-2 text-blue-600 dark:text-blue-400">Now</h3>
          <p class="text-sm">Organizer pays with card, participants transfer. Everyone gets points and it's easier.</p>
        </div>
      </div>

      <h2>Benefits of Records</h2>
      <p>Cash exchanges leave no record, but digital transfers do. Prevent "Did I pay?" arguments.</p>
    `,
  },
];

export const getArticles = (locale: string): Article[] => {
  if (locale === "ja") return articlesJa;
  return articlesEn; // Fallback to English for other languages
};

// Default export for backward compatibility if needed, but prefer named export
export const articles = articlesJa;
