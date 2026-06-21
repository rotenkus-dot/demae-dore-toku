import { findDiagnosisType, type DiagnosisType } from "@/data/diagnosisTypes";

export type Answers = {
  food: string;
  orderAmount: string;
  unusedApp: string;
  membership: string;
  payment: string;
  priority: string;
};

export type DeliveryScores = {
  uber: number;
  demaecan: number;
  wolt: number;
  menu: number;
  official: number;
};

export type DiagnosisResult = {
  type: DiagnosisType;
  scores: DeliveryScores;
  ranking: Array<{ id: keyof DeliveryScores; score: number }>;
  debug: string[];
};

const unusedScore: Partial<Record<string, { app: keyof DeliveryScores; score: number }>> = {
  "Uber Eats": { app: "uber", score: 80 },
  "出前館": { app: "demaecan", score: 80 },
  "Wolt": { app: "wolt", score: 60 },
  "menu": { app: "menu", score: 70 },
};

function addInitialCouponBonus(scores: DeliveryScores, answers: Answers, points: number) {
  const unused = unusedScore[answers.unusedApp];
  if (unused) scores[unused.app] += points;
}

export function calculateScores(answers: Answers): DeliveryScores {
  const scores: DeliveryScores = { uber: 0, demaecan: 0, wolt: 0, menu: 0, official: 0 };
  const unused = unusedScore[answers.unusedApp];
  if (unused) scores[unused.app] += unused.score;

  if (answers.membership === "Uber One") scores.uber += 25;
  if (answers.membership === "LYPプレミアム") scores.demaecan += 25;
  if (answers.membership === "Ponta系をよく使う") scores.menu += 15;
  if (answers.payment === "PayPay") scores.demaecan += 15;

  if (["1500〜2500円", "2500円以上"].includes(answers.orderAmount)) addInitialCouponBonus(scores, answers, 15);
  if (answers.orderAmount === "2500円以上") addInitialCouponBonus(scores, answers, 10);

  if (answers.food === "マック・ケンタッキー系") scores.official += 20;
  if (answers.food === "ピザ") scores.official += 25;
  if (answers.food === "牛丼・定食系") {
    scores.demaecan += 10;
    scores.uber += 10;
    scores.official += 15;
  }
  if (answers.food === "まだ決めてない") {
    scores.demaecan += 10;
    scores.uber += 10;
    scores.menu += 10;
    scores.wolt += 10;
  }

  if (answers.priority === "とにかく安さ" || answers.priority === "クーポン消化") addInitialCouponBonus(scores, answers, 25);
  if (answers.priority === "早さ") {
    scores.uber += 10;
    scores.demaecan += 10;
  }
  if (answers.priority === "失敗しにくさ") {
    scores.official += 15;
    scores.demaecan += 10;
  }

  return scores;
}

function serviceResultId(service: keyof DeliveryScores) {
  return {
    uber: "uber_priority",
    demaecan: "demaecan_priority",
    wolt: "wolt_area_check",
    menu: "menu_priority",
    official: "official_pickup",
  }[service];
}

export function diagnose(answers: Answers): DiagnosisResult {
  const scores = calculateScores(answers);
  const ranking = (Object.entries(scores) as Array<[keyof DeliveryScores, number]>)
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);
  const debug: string[] = [];
  let typeId: string;

  if (answers.priority === "迷わず決めたい") {
    typeId = "decide_quickly";
    debug.push("priority:decide_quickly");
  } else if (answers.unusedApp === "全部使ったことある") {
    typeId = "campaign_check";
    debug.push("experience:all_used");
  } else if (answers.priority === "クーポン消化" && unusedScore[answers.unusedApp]) {
    typeId = "first_coupon";
    debug.push("priority:first_coupon");
  } else {
    typeId = serviceResultId(ranking[0].id);
    debug.push(`score:${ranking[0].id}`);
  }

  return { type: findDiagnosisType(typeId), scores, ranking, debug };
}

export function emptyAnswers(): Answers {
  return { food: "", orderAmount: "", unusedApp: "", membership: "", payment: "", priority: "" };
}

export function isComplete(answers: Answers) {
  return Boolean(answers.food && answers.orderAmount && answers.unusedApp && answers.membership && answers.payment && answers.priority);
}
