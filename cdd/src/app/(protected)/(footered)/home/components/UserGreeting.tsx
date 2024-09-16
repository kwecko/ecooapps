import { ACTIONS } from "@shared/_actions";

export async function UserGreeting() {
  const { first_name, last_name } = await ACTIONS["get-account"].execute({});

  return (
    <span className="text-lg text-slate-gray">
      Olá,{" "}
      <strong className="font-semibold underline">{`${first_name} ${last_name}!`}</strong>
    </span>
  );
}
