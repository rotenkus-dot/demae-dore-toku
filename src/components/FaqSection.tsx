import { faqs } from "@/data/faqs";

export function FaqSection() {
  return (
    <section className="container faqSection" aria-labelledby="faq-title">
      <div className="card">
        <span className="badge">よくある確認</span>
        <h2 id="faq-title">注文前にここだけ確認</h2>
        <p className="small">価格保証ではなく、確認順を決めるための診断です。</p>
        <div className="faqGrid">
          {faqs.map((faq) => (
            <details className="faqItem" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
