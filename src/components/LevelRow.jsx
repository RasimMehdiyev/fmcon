export default function LevelRow({ label, tone, text }) {
    return (
        <div class="border border-gray-200 rounded-xl overflow-hidden">
          <div class={`border-l-4 ${tone()} p-3`}>
            <p class="font-semibold text-sm text-gray-900">{label}:</p>
            <p class="text-sm text-gray-700 mt-1">{text}</p>
          </div>
        </div>
      );
  }