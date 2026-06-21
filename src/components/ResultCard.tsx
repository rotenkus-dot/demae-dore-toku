import type { DiagnosisResult } from "@/lib/diagnose";
import { SearchButton } from "./SearchButton";

const disclaimer = "本サービスは、各社の公開キャンペーン情報や一般的なクーポン条件をもとに、「確認する順番の目安」を提案するものです。実際の価格・配送料・手数料・クーポン適用条件は、地域・店舗・時間帯・アカウント状況によって変わります。最終的な金額は、各アプリの注文確認画面で必ずご確認ください。";

export function ResultCard({ result }: { result: DiagnosisResult }) {
  const type = result.type;
  return (
    <main className="container resultHero">
      <a className="logo" href="/">← もう一度診断する</a>
      <div className="resultNotice adNotice">リアルタイム価格比較・最安保証ではありません</div>

      <section className="card conclusionCard" style={{ marginTop: 16 }}>
        <span className="badge">出前どれ得？ 診断結果</span>
        <p className="catch">{type.shortTitle}</p>
        <h1 className="resultTitle">{type.title}</h1>
        <p>{type.summary}</p>
      </section>

      <section className="card ok" style={{ marginTop: 14 }}>
        <h2>おすすめ確認順</h2>
        <ol className="orderCardList">
          {type.checkingOrder.map((item, i) => (
            <li key={item} className="orderCardItem">
              <span className="orderNum">{i + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="card" style={{ marginTop: 14 }}>
        <h2>この順番になった理由</h2>
        <ul className="list">{type.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
      </section>

      <section className="card warn" style={{ marginTop: 14 }}>
        <h2>確認しておくこと</h2>
        <ul className="list">{type.cautions.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="card ctaCard" style={{ marginTop: 14 }}>
        <h2>各アプリを確認する</h2>
        <p className="small">リンクはv0.1用の仮導線です。公式・提携リンク確定後に差し替えます。</p>
        <div className="searchGrid">{type.ctaButtons.map((link) => <SearchButton key={link.kind} link={link} />)}</div>
      </section>

      <section className="card" style={{ marginTop: 14 }}>
        <h2>SNSシェア文</h2>
        <p className="note">{type.shareText}</p>
      </section>

      <section className="card disclaimer" style={{ marginTop: 14 }}>
        <h2>免責事項</h2>
        <p>{disclaimer}</p>
      </section>
      <footer className="footer">© 出前どれ得？ / めんどいラボ</footer>
    </main>
  );
}
