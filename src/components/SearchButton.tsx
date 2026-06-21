import type { CtaButton, CtaKind } from "@/data/diagnosisTypes";

const kindLabel: Record<CtaKind, string> = {
  uber: "Uber Eats",
  demaecan: "出前館",
  wolt: "Wolt",
  menu: "menu",
  official: "公式・持ち帰り",
};

export function SearchButton({ link }: { link: CtaButton }) {
  return (
    <a className="searchBtn" href={link.url}>
      <strong>{kindLabel[link.kind]}</strong>
      {link.label}
      <span>最終金額と適用条件は注文確認画面で確認</span>
    </a>
  );
}
