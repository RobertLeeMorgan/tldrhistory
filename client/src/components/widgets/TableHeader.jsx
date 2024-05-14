export default function TableHeader({ centuries }) {
  return (
    <thead>
      <tr>
        <th className="w-12"></th>
        {centuries.map((century) => (
          <th className="w-12 text-sm font-normal" key={century}></th>
        ))}
      </tr>
    </thead>
  );
}
