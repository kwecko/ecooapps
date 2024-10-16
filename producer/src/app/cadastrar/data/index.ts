import { Roles } from "@shared/types/register"

export const options: Array<{ value: Roles; label: string }> = [
  { value: 'USER', label: 'Consumidor' },
  { value: 'PRODUCER', label: 'Produtor' },
];

export const steps = [
  1,
  2,
  3,
  4,
]