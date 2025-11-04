import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path) =>
    path == location.pathname ? "border-sky-600  font-bold" : "border-transparent hover:border-sky-600";
  return (
    <nav class="w-[90%] flex mb-[30px] flex-row place-content-between border-b-1 border-gray-300 px-[10px] py-[5px] items-center mx-auto">
      <h1 class="text-4xl font-bold text-center my-[20px] text-[#51676D]">RoundTable</h1>
      <ul class="w-[50%] container flex items-center p-3 text-black place-content-between">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/">Study info</a>
        </li>
        <li class={`border-b-2 ${active("/r1")} mx-1.5 sm:mx-6`}>
          <a href="/r1">Round 1</a>
        </li>
        <li class={`border-b-2 ${active("/r2")} mx-1.5 sm:mx-6`}>
          <a href="/r2">Round 2</a>
        </li>
        <li class={`border-b-2 ${active("/r3")} mx-1.5 sm:mx-6`}>
          <a href="/r3">Round 3</a>
        </li>
        <li class={`border-b-2 ${active("/finale")} mx-1.5 sm:mx-6`}>
          <a href="/r3">Finale</a>
        </li>
      </ul>
    </nav>
  );
}
