import { ResultCard } from "@/components/ResultCard";
import { diagnose, type Answers } from "@/lib/diagnose";

export default async function ResultPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const paramsObj = await searchParams;
  const get = (key: string) => {
    const value = paramsObj[key];
    return Array.isArray(value) ? value[0] ?? "" : value ?? "";
  };
  const answers: Answers = {
    food: get("food"),
    orderAmount: get("orderAmount"),
    unusedApp: get("unusedApp"),
    membership: get("membership"),
    payment: get("payment"),
    priority: get("priority"),
  };
  return <ResultCard result={diagnose(answers)} />;
}
