export interface Choice { label: string; value: string; icon?: string; }
export interface ImageHotspot {
  value: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface Question {
  id: string;
  title: string;
  description?: string;
  isMultiple: boolean;
  imageSrc?: string;
  imageAlt?: string;
  imageHotspots?: ImageHotspot[];
  choices: Choice[];
}

export const questions: Question[] = [
  {
    id: "food",
    title: "Q1. 何を頼みたい？",
    description: "今日の気分に一番近いものを選んでください。決まっていなくても大丈夫です。",
    isMultiple: false,
    choices: [
      { label: "牛丼・定食系", value: "牛丼・定食系", icon: "🍚" },
      { label: "マック・ケンタッキー系", value: "マック・ケンタッキー系", icon: "🍔" },
      { label: "ピザ", value: "ピザ", icon: "🍕" },
      { label: "寿司", value: "寿司", icon: "🍣" },
      { label: "弁当・ファミレス系", value: "弁当・ファミレス系", icon: "🍱" },
      { label: "まだ決めてない", value: "まだ決めてない", icon: "？" },
    ],
  },
  {
    id: "orderAmount",
    title: "Q2. 今回の注文金額はだいたい？",
    description: "商品代のざっくり予算でOKです。正確な金額は各アプリで確認します。",
    isMultiple: false,
    choices: [
      { label: "1000円未満", value: "1000円未満", icon: "🪙" },
      { label: "1000〜1500円", value: "1000〜1500円", icon: "💴" },
      { label: "1500〜2500円", value: "1500〜2500円", icon: "💴" },
      { label: "2500円以上", value: "2500円以上", icon: "🧾" },
      { label: "分からない", value: "分からない", icon: "？" },
    ],
  },
  {
    id: "unusedApp",
    title: "Q3. 使ったことがないアプリは？",
    description: "初回特典を確認する候補として使います。特典の有無や条件は各アプリでご確認ください。",
    isMultiple: false,
    choices: [
      { label: "Uber Eats", value: "Uber Eats", icon: "U" },
      { label: "出前館", value: "出前館", icon: "出" },
      { label: "Wolt", value: "Wolt", icon: "W" },
      { label: "menu", value: "menu", icon: "m" },
      { label: "全部使ったことある", value: "全部使ったことある", icon: "✓" },
      { label: "分からない", value: "分からない", icon: "？" },
    ],
  },
  {
    id: "membership",
    title: "Q4. 会員・特典はある？",
    description: "今使えるものを1つ選んでください。特に無ければ、そのままでOKです。",
    isMultiple: false,
    choices: [
      { label: "Uber One", value: "Uber One", icon: "U" },
      { label: "LYPプレミアム", value: "LYPプレミアム", icon: "L" },
      { label: "Ponta系をよく使う", value: "Ponta系をよく使う", icon: "P" },
      { label: "特になし", value: "特になし", icon: "―" },
      { label: "分からない", value: "分からない", icon: "？" },
    ],
  },
  {
    id: "payment",
    title: "Q5. よく使う支払い方法は？",
    description: "いつもの支払い方法に近いものを選んでください。",
    isMultiple: false,
    choices: [
      { label: "PayPay", value: "PayPay", icon: "P" },
      { label: "クレカ", value: "クレカ", icon: "💳" },
      { label: "Amazon Pay", value: "Amazon Pay", icon: "A" },
      { label: "d払い", value: "d払い", icon: "d" },
      { label: "こだわりなし", value: "こだわりなし", icon: "―" },
    ],
  },
  {
    id: "priority",
    title: "Q6. 何を一番優先する？",
    description: "今日の注文で一番大事なものを選んでください。",
    isMultiple: false,
    choices: [
      { label: "とにかく安さ", value: "とにかく安さ", icon: "📉" },
      { label: "早さ", value: "早さ", icon: "⏱" },
      { label: "失敗しにくさ", value: "失敗しにくさ", icon: "✓" },
      { label: "クーポン消化", value: "クーポン消化", icon: "🎟" },
      { label: "迷わず決めたい", value: "迷わず決めたい", icon: "→" },
    ],
  },
];
