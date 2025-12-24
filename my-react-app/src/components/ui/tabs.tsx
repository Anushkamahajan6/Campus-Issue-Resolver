export function Tabs({ children }: any) {
  return <div>{children}</div>;
}
export function TabsList({ children }: any) {
  return <div className="flex gap-2">{children}</div>;
}
export function TabsTrigger({ children, ...props }: any) {
  return <button {...props}>{children}</button>;
}
export function TabsContent({ children }: any) {
  return <div>{children}</div>;
}
