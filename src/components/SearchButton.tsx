import type { CtaButton, CtaKind } from "@/data/diagnosisTypes";

const ctaText: Record<CtaKind, string> = {
  uber: "Uber Eatsをまず確認してみる",
  demaecan: "出前館をまず確認してみる",
  wolt: "Woltをまず確認してみる",
  menu: "menuをまず確認してみる",
  official: "公式アプリも確認してみる",
};

export function SearchButton({ link }: { link: CtaButton }) {
  return (
    <a className="searchBtn" href={link.url}>
      <strong>{ctaText[link.kind]}</strong>
      <span>最終金額と適用条件は注文確認画面で確認</span>
    </a>
  );
}
