"use client";
import type { ImageHotspot, Question } from "@/data/questions";
import type { Answers } from "@/lib/diagnose";

export function QuestionStep({ question, answers, setAnswers }: { question: Question; answers: Answers; setAnswers: (answers: Answers) => void }) {
  const current = (answers as any)[question.id];
  const isActive = (value: string) => question.isMultiple ? Array.isArray(current) && current.includes(value) : current === value;

  const toggle = (value: string) => {
    if (question.isMultiple) {
      const arr = Array.isArray(current) ? current : [];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      setAnswers({ ...answers, [question.id]: next });
    } else {
      setAnswers({ ...answers, [question.id]: value });
    }
  };

  const Hotspot = ({ spot }: { spot: ImageHotspot }) => {
    const active = isActive(spot.value);
    return (
      <button
        type="button"
        aria-label={spot.label}
        aria-pressed={active}
        title={spot.label}
        className={`imageHotspot ${active ? "active" : ""}`}
        style={{ left: `${spot.x}%`, top: `${spot.y}%`, width: `${spot.width}%`, height: `${spot.height}%` }}
        onClick={() => toggle(spot.value)}
      >
        <span className="hotspotCheck">{active ? "✓" : ""}</span>
      </button>
    );
  };

  return (
    <section className="question">
      <h2>{question.title}</h2>
      {question.description && <p className="desc">{question.description}</p>}
      {question.imageSrc && (
        <div className="questionImageWrap">
          <img src={question.imageSrc} alt={question.imageAlt ?? question.title} className="questionImage" loading="lazy" />
          {question.imageHotspots?.map((spot) => <Hotspot key={spot.value} spot={spot} />)}
          {question.imageHotspots?.length ? <p className="imageHint">画像の選択肢もタップできます</p> : null}
        </div>
      )}
      <div className="choices">
        {question.choices.map((choice) => {
          const active = isActive(choice.value);
          return (
            <button key={choice.value} className={`choice ${active ? "active" : ""}`} onClick={() => toggle(choice.value)} type="button">
              {choice.icon && <span className="choiceIcon" aria-hidden="true">{choice.icon}</span>}
              <span>{choice.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
