export default function FlashCard(props) {
    return (
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
        <div class="mb-4">
          <h2 class="font-semibold text-lg text-gray-900">{props.title}</h2>
          {props.subtitle ? <p class="text-sm text-gray-600">{props.subtitle}</p> : null}
        </div>
        <div>{props.children}</div>
      </div>
    );
  }
  