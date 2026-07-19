import type { ProductSpecification } from "@/lib/types";

type ProductSpecsTableProps = {
  specifications: ProductSpecification[];
};

export function ProductSpecsTable({ specifications }: ProductSpecsTableProps) {
  return (
    <section className="mt-section-gap">
      <h3 className="mb-6 border-l-4 border-primary pl-4 text-headline-md text-on-surface">
        Technical Specifications
      </h3>
      <div className="overflow-hidden rounded-xl border border-border-subtle bg-white shadow-sm">
        <table className="zebra-table w-full text-left">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-6 py-4 font-bold">Attribute</th>
              <th className="px-6 py-4 font-bold">Details</th>
            </tr>
          </thead>
          <tbody className="font-label-technical">
            {specifications.map((spec) => (
              <tr key={spec.attribute}>
                <td className="px-6 py-4 font-bold text-on-surface-variant">
                  {spec.attribute}
                </td>
                <td className="px-6 py-4 text-primary">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
