export type CtaKind = "uber" | "demaecan" | "wolt" | "menu" | "official";
export interface CtaButton { label: string; url: string; kind: CtaKind; }
export interface DiagnosisType {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  checkingOrder: string[];
  reasons: string[];
  cautions: string[];
  ctaButtons: CtaButton[];
  shareText: string;
}

const appCtas: CtaButton[] = [
  { label: "Uber Eatsを開く", url: "#uber-eats", kind: "uber" },
  { label: "出前館を開く", url: "#demaecan", kind: "demaecan" },
  { label: "Woltを開く", url: "#wolt", kind: "wolt" },
  { label: "menuを開く", url: "#menu", kind: "menu" },
  { label: "公式アプリも確認する", url: "#official-app", kind: "official" },
];

const commonCautions = [
  "価格・配送料・手数料・特典条件は、地域・店舗・時間帯・アカウント状況で変わります",
  "表示価格ではなく、注文確認画面の最終金額を確認してください",
  "この結果は最安を保証するものではありません",
];

export const diagnosisTypes: DiagnosisType[] = [
  {
    id: "demaecan_priority",
    title: "今回は「出前館」から見るのがよさそうです",
    shortTitle: "まず開く：出前館",
    summary: "初回クーポンや期間限定キャンペーン、PayPay/LYP系の特典が使える可能性があります。まず出前館で目当てのお店を検索し、クーポン適用後の合計金額を確認してみてください。",
    checkingOrder: ["出前館でお店を検索", "クーポン適用後の合計を見る", "Uber Eatsでも同じ商品を確認", "差が小さければ到着時間が早い方でOK"],
    reasons: ["出前館の未利用・会員特典・支払い方法との相性が比較的高い回答です", "初回特典やキャンペーンが使える場合は確認優先度が上がります"],
    cautions: commonCautions,
    ctaButtons: appCtas,
    shareText: "今日の出前は、まず出前館から確認するのがよさそうでした。#出前どれ得",
  },
  {
    id: "uber_priority",
    title: "今回は「Uber Eats」から見るのがよさそうです",
    shortTitle: "まず開く：Uber Eats",
    summary: "Uber Eatsをまだ使っていない場合やUber Oneを使っている場合、クーポンや配達特典で有利になる可能性があります。まずUber Eatsで合計金額を確認しましょう。",
    checkingOrder: ["Uber Eatsでお店を検索", "クーポン・Uber One特典の有無を確認", "出前館でも同じ商品を確認", "最終金額と到着時間で決める"],
    reasons: ["Uber Eatsの未利用またはUber Oneとの相性が比較的高い回答です", "早さを重視する場合も最初の確認候補になります"],
    cautions: commonCautions,
    ctaButtons: appCtas,
    shareText: "今日の出前は、まずUber Eatsから確認するのがよさそうでした。#出前どれ得",
  },
  {
    id: "menu_priority",
    title: "今回は「menu」も確認する価値があります",
    shortTitle: "まず開く：menu",
    summary: "menuをまだ使っていない場合やPonta系のポイントをよく使う場合、クーポンや還元でお得になる可能性があります。対象店舗があるか確認してみてください。",
    checkingOrder: ["menuで対象店舗を検索", "クーポンやポイント条件を確認", "出前館・Uber Eatsと比較", "店舗がなければ次の候補へ"],
    reasons: ["menuの未利用またはPonta系との相性が比較的高い回答です", "対象店舗と適用条件が合うかを先に見ると判断しやすくなります"],
    cautions: commonCautions,
    ctaButtons: appCtas,
    shareText: "今日の出前は、menuも確認する価値がありそうでした。#出前どれ得",
  },
  {
    id: "wolt_area_check",
    title: "今回は「Wolt」が使えるか確認してみましょう",
    shortTitle: "まず開く：Wolt",
    summary: "Woltはエリアや対象店舗によって使いやすさが変わります。未利用の場合は初回特典が使える可能性もあるため、まず対象エリアかどうか確認してみる価値があります。",
    checkingOrder: ["Woltで住所と対象店舗を確認", "クーポンや初回特典を確認", "Uber Eats・出前館でも同じ商品を確認", "エリア外なら他アプリへ"],
    reasons: ["Wolt未利用の回答により、確認優先度が上がっています", "利用可能エリアと店舗数を先に確認する必要があります"],
    cautions: commonCautions,
    ctaButtons: appCtas,
    shareText: "今日の出前は、Woltの対象エリアと店舗を先に確認する結果でした。#出前どれ得",
  },
  {
    id: "official_pickup",
    title: "今回は「公式アプリ・持ち帰り」も見た方がよさそうです",
    shortTitle: "まず確認：公式・持ち帰り",
    summary: "マック・ピザ・チェーン店系は、デリバリーアプリより公式アプリや持ち帰りの方が合うことがあります。配達にこだわらないなら、公式アプリやテイクアウトも確認すると損しにくいです。",
    checkingOrder: ["公式アプリや公式サイトを見る", "持ち帰り価格・クーポンを確認", "デリバリーアプリの合計金額も確認", "手間と価格のバランスで決める"],
    reasons: ["チェーン店やピザは公式経路も比較候補になります", "配達料を含めた総額と受け取りの手間を比べるのが実用的です"],
    cautions: commonCautions,
    ctaButtons: appCtas,
    shareText: "今日の出前は、公式アプリや持ち帰りも先に確認する結果でした。#出前どれ得",
  },
  {
    id: "first_coupon",
    title: "まずは「未利用アプリの初回クーポン」から確認しましょう",
    shortTitle: "まず確認：未利用アプリ",
    summary: "まだ使ったことがない出前アプリがある場合、初回クーポンが分かりやすい候補になりやすいです。まず未利用アプリを開いて、対象店舗と条件を確認してみましょう。",
    checkingOrder: ["未利用アプリを開く", "初回クーポンの条件を見る", "注文金額が条件を満たすか確認", "他アプリと最終金額を比べる"],
    reasons: ["未利用アプリとクーポン消化の回答が一致しています", "初回特典は最低注文額や対象店舗などの条件確認が重要です"],
    cautions: commonCautions,
    ctaButtons: appCtas,
    shareText: "今日の出前は、未利用アプリの初回クーポンから確認する結果でした。#出前どれ得",
  },
  {
    id: "campaign_check",
    title: "今回は「キャンペーン一覧」から見るのが安全です",
    shortTitle: "まず確認：開催中キャンペーン",
    summary: "主要アプリをすでに使ったことがある場合、初回クーポンよりも期間限定キャンペーンや会員特典が重要になります。まず各アプリのキャンペーン欄を確認しましょう。",
    checkingOrder: ["よく使うアプリのキャンペーン欄を見る", "出前館・Uber Eats・menu・Woltを順に確認", "対象チェーンの公式アプリも見る", "最終金額と到着時間で決める"],
    reasons: ["主要アプリをすでに利用済みの回答です", "会員特典と当日キャンペーンを軸に確認する方が判断しやすくなります"],
    cautions: commonCautions,
    ctaButtons: appCtas,
    shareText: "今日の出前は、各アプリの開催中キャンペーンから確認する結果でした。#出前どれ得",
  },
  {
    id: "decide_quickly",
    title: "迷うなら、まず一番使いやすいアプリから確認しましょう",
    shortTitle: "まず開く：いつものアプリ",
    summary: "価格差が小さい場合、探す時間の方がもったいないこともあります。まず普段使いやすいアプリで合計金額を確認し、納得できればそこで決めるのも選択肢です。",
    checkingOrder: ["普段使っているアプリを開く", "合計金額を確認", "高いと感じたら別アプリを見る", "迷いすぎず、納得できる方で決める"],
    reasons: ["迷わず決めたいという回答を最優先しました", "価格だけでなく、操作の慣れや到着時間も判断材料になります"],
    cautions: commonCautions,
    ctaButtons: appCtas,
    shareText: "今日の出前は、まずいつもの使いやすいアプリから確認する結果でした。#出前どれ得",
  },
];

export function findDiagnosisType(id: string) {
  return diagnosisTypes.find((type) => type.id === id) ?? diagnosisTypes[7];
}
