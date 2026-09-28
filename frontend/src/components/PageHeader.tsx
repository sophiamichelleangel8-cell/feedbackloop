export default function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-slate-500">{subtitle}</p>
    </header>
  )
}