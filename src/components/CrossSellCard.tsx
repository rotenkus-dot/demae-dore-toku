type UtilityCard = {
  category: string;
  title: string;
  reason: string;
  url?: string;
};

export function CrossSellCard({ item }: { item: UtilityCard }) {
  const content = <><span className="badge">{item.category}</span><strong>{item.title}</strong><p className="small">{item.reason}</p></>;
  if (item.url) {
    return <a className="crossItem" href={item.url} rel="nofollow sponsored noopener noreferrer">{content}</a>;
  }
  return <div className="crossItem">{content}</div>;
}
