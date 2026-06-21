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
      <a href="/" className="logo">出前どれ得？</a>
      <span className="small">めんどいラボ 第3弾</span>
    </header>
    <main className="container hero">
      <span className="adNotice">価格比較・注文代行ではありません</span>
      <h1>出前どれ得？ 🧪</h1>
      <p className="lead">Uber・出前館・Wolt・menu、今日どれから開くべきか診断</p>
      <p className="lead">出前、どれが安いか毎回見るのめんどい。<br />今日どのアプリから開くべきかだけ先に診断します。</p>

      <div className="card" style={{ marginTop: 32 }}>
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
        {!isCurrentAnswered && <p className="small" style={{ marginTop: 12 }}>この質問に答えると次へ進めます。</p>}
      </div>
    </main>
    <FaqSection />
    <footer className="container footer">© 出前どれ得？ / 最終的な金額は、各アプリの注文確認画面で必ずご確認ください。</footer>
  </>;
}
