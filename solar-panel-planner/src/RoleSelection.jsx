import { GrUserAdmin } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";

function RoleSelection({ setSelectedForm }) {
  return (
    <section className="py-16 text-center gap-10 flex flex-col items-center justify-center bg-slate-200">
      <h2 className="text-5xl">I am a...</h2>
      <article className="flex gap-20">
        <button onClick={() => setSelectedForm("resident")}>
          <FaRegUser className="size-[10rem] rounded-xl border-4 p-3 border-black transition-all hover:bg-slate-300 cursor-pointer" />
          <p className="text-2xl mt-3">LA resident</p>
        </button>

        <button onClick={() => setSelectedForm("admin")}>
          <GrUserAdmin className="size-[10rem] rounded-xl border-4 p-3 border-black transition-all hover:bg-slate-300 cursor-pointer" />
          <p className="text-2xl mt-3">Admin</p>
        </button>
      </article>
    </section>
  );
}

export default RoleSelection;
