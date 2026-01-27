import { useLocation, A } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path) =>
    path == location.pathname ? "border-[#9ab9e3]  font-bold" : "border-transparent hover:border-[#9ab9e3]";
  return (
    <nav class="w-full sm:w-[95%] flex mb-[30px] flex-row place-content-between border-b-1 border-gray-300 px-[10px] py-[5px] items-center mx-auto">
      <h1 class="text-4xl font-bold text-center my-[20px] text-[#51676D]">RoundTable</h1>
      <ul class="w-[50%] container flex items-center p-3 text-black place-content-between">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <A href="/">Study info</A>
        </li>
        <li class={`border-b-2 ${active("/r1")} mx-1.5 sm:mx-6`}>
          <A href="/r1">Round 1</A>
        </li>
        <li class={`border-b-2 ${active("/r2")} mx-1.5 sm:mx-6`}>
          <A href="/r2">Round 2</A>
        </li>
        <li class={`border-b-2 ${active("/finale")} mx-1.5 sm:mx-6`}>
          <A href="/finale">Finale</A>
        </li>
      </ul>
      <A 
        href="/profile"
        class="text-4xl font-bold border border-gray-200 p-1 px-3 bg-gray-100 hover:bg-gray-400 hover:text-white rounded-lg cursor-pointer transition-colors duration-200">
          U
      </A>
    </nav>
  );
}
