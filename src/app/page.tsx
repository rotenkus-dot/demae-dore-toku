"use client";
import { useMemo, useState } from "react";
import { questions } from "@/data/questions";
import { QuestionStep } from "@/components/QuestionStep";
import { emptyAnswers, isComplete, type Answers } from "@/lib/diagnose";
import { FaqSection } from "@/components/FaqSection";

export default function Home() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers());
  const [step, setStep] = useState(0);
  const currentQuestion = questions[step];
  const completed = useMemo(() => questions.filter((question) => Boolean(answers[question.id as keyof Answers])).length, [answers]);
  const progress = Math.round((completed / questions.length) * 100);
  const isCurrentAnswered = Boolean(answers[currentQuestion.id as keyof Answers]);

  const startDiagnosis = () => {
    const params = new URLSearchParams();
    params.set("food", answers.food);
    params.set("orderAmount", answers.orderAmount);
    params.set("unusedApp", answers.unusedApp);
    params.set("membership", answers.membership);
    params.set("payment", answers.payment);
    params.set("priority", answers.priority);
    window.location.href = `/result?${params.toString()}`;
  };

  const reset = () => {
    setAnswers(emptyAnswers());
    setStep(0);
  };

  return <>
    <header className="container topbar">
      <a href="/" className="logo"><span className="labMark">🧪</span>出前どれ得？</a>
      <span className="labLabel">めんどいラボ 第3弾</span>
    </header>
    <main className="container hero">
      <span className="adNotice">価格比較・注文代行ではありません</span>
      <div className="foodLabels" aria-label="今日の出前候補">
        <span>🍔 ハンバーガー</span><span>🍕 ピザ</span><span>🍣 寿司</span><span>🍱 お弁当</span>
      </div>
      <h1>出前、どれから見る？</h1>
      <p className="lead">Uber・出前館・Wolt・menu、今日どれから開くべきか診断</p>
      <p className="dailyProblem">Uber開いて、出前館開いて、またUber戻る…。<br />それ、毎回めんどい。</p>
      <p className="heroSupport">今日どのアプリから開くべきかだけ、6問で先に整理します。</p>

      <div className="card diagnosisCard" style={{ marginTop: 28 }}>
        <div className="stepHeader">
          <span className="badge">Q{step + 1} / {questions.length}</span>
          <span className="small">回答済み {completed} 問</span>
        </div>
        <div className="progress"><div style={{ width: `${progress}%` }} /></div>
        <QuestionStep question={currentQuestion} answers={answers} setAnswers={setAnswers} />
        <div className="actions">
          <button className="btn secondary" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>戻る</button>
          {step < questions.length - 1 ? (
            <button className="btn" disabled={!isCurrentAnswered} onClick={() => setStep((value) => Math.min(questions.length - 1, value + 1))}>次へ</button>
          ) : (
            <button className="btn" disabled={!isComplete(answers)} onClick={startDiagnosis}>診断結果を見る</button>
          )}
          <button className="btn secondary" onClick={reset}>リセット</button>
        </div>
        <p className="stepNudge">
          {step >= 4 ? "あと少しで、今日のおすすめ確認順が出ます。" : "だいたいでOK。今日の気分に近いものを選んでください。"}
        </p>
        {!isCurrentAnswered && <p className="small answerHint">この質問に答えると次へ進めます。</p>}
      </div>
    </main>
    <FaqSection />
    <footer className="container footer">© 出前どれ得？ / 最終的な金額は、各アプリの注文確認画面で必ずご確認ください。</footer>
  </>;
}
