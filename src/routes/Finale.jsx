import { createSignal } from "solid-js";
import Table from "~/components/Table";

const Finale = () => {

    const failureDatas = [
        { item: "F01", subject: "Perception failure", S: 1, O: 4, D: 6, E: 8, IQR: 5 },
        { item: "F02", subject: "Perception failure", S: 2, O: 5, D: 7, E: 9, IQR: 6 },
        { item: "F03", subject: "Communication failure", S: 3, O: 6, D: 8, E: 10, IQR: 7 },
        { item: "F04", subject: "Hardware failure", S: 4, O: 7, D: 9, E: 6, IQR: 5 },
    ]
    ;

    return (
        <main class="mx-auto text-gray-700 p-4 w-[90%]">
            <h1 class="font-bold text-2xl pb-2">Final Results</h1>
            <Table failureData={failureDatas} isFinale={true}/>
        </main>
    );
};

export default Finale;