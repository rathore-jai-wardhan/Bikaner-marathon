import { sql } from "../../lib/db";
import RegisterForm from "../../components/register_form";

export const dynamic = "force-dynamic";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const categories = (await sql`
    select id, name, price_paise, max_age, tshirt_sizes
    from categories
    where is_open = true
    order by price_paise
  `) as {
    id: string;
    name: string;
    price_paise: number;
    max_age: number | null;
    tshirt_sizes: string[];
  }[];

  if (categories.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        <p>Registration is not open yet. Please check back soon.</p>
      </main>
    );
  }

  const initialCategoryId = categories.some((c) => c.id === category)
    ? (category as string)
    : categories[0].id;

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <RegisterForm
        categories={categories}
        initialCategoryId={initialCategoryId}
      />
    </main>
  );
}