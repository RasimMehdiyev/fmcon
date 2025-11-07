import Chip from "~/components/Chip";
import { createSignal, createEffect } from "solid-js";
import ImageModal from "~/components/ImageModal";

export default function Round1() {
  const [openImage, setOpenImage] = createSignal(false);

  createEffect(() => {
    if (!openImage()) console.log("Image modal closed");
  });

  return (
    <main class="mx-auto flex flex-row place-content-between text-gray-700 p-4 items-center px-[180px]">
      <div class="flex flex-col gap-4 items-center">
        <h1 class="text-lg font-bold">CHOOSE A PHASE</h1>
        <div class="flex flex-col gap-2 items-center">
          <Chip phase="hri" />
          <Chip phase="pour" />
          <Chip phase="mobile" />
        </div>
      </div>

      <div>
        <img
          src="/assets/images/flowchart.png"
          class="w-[520px] cursor-zoom-in"
          alt="flowchart"
          onClick={() => setOpenImage(true)}
        />
      </div>

      <ImageModal
        open={openImage}                 // pass the accessor
        onClose={() => setOpenImage(false)}
        src="/assets/images/flowchart.png"
        alt="flowchart"
      />
    </main>
  );
}
