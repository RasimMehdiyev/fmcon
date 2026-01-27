export default function InfoIcon(props) {
  return (
    <div class="relative inline-block group">
      <span
        class="flex h-7 w-7 cursor-default items-center justify-center
               rounded-full text-gray-600
               cursor-pointer"
        aria-hidden="true"
      >
        <img src="/assets/svg/info.svg" alt="" />
      </span>

      <div
        class="pointer-events-none absolute right-0 z-50 mt-2 w-72
               rounded-lg border border-gray-200 bg-white p-4 text-sm
               text-gray-700 shadow-lg opacity-0 translate-y-1
               transition-all duration-150
               group-hover:opacity-100 group-hover:translate-y-0"
      >
        <div class="font-semibold mb-2">{props.title ?? "Info"}</div>

        <ul class="list-disc pl-5 space-y-1">
            {props.children}
        </ul>
      </div>
    </div>
  );
}
