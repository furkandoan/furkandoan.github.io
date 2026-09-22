// A constructed example, not an empirical result or a preference profile.
export const agents = ["a1", "a2", "b1", "b2", "c1", "c2"];
export const slots = ["s1", "s2", "s3"];
export const committed = { a1: "s1", a2: "s2", b1: "s1" };
export const complete = { ...committed, b2: "s3", c1: "s2", c2: "s3" };
export const blocked = { ...committed, b2: "s2", c1: "s3" };

export function feasible(assignment) {
  if (Object.keys(assignment).some((a) => !agents.includes(a))) return false;
  if (Object.values(assignment).some((s) => !slots.includes(s))) return false;
  return slots.every((slot) => {
    const assigned = agents.filter((a) => assignment[a] === slot);
    return assigned.length <= 2 && new Set(assigned.map((a) => a[0])).size === assigned.length;
  });
}
export function completions(partial) {
  if (!feasible(partial)) return [];
  const next = agents.find((a) => !partial[a]);
  if (!next) return [partial];
  return slots.flatMap((s) => completions({ ...partial, [next]: s }));
}
