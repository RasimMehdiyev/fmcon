import { A } from "@solidjs/router";
import Table from "~/components/Table"
import Button from "~/components/Button"

export default function About() {
  return (
    <main class="mx-auto text-gray-700 p-4">
      <Table />
      <Button cont_w="w-[90%]" position="right" type="SUBMIT"/>
    </main>
  );
}
