export default function Table() {
    return (
        <div className="flex flex-col gap-2 mb-[20px] items-center">
            <span> Please review the items and adjust your final ratings </span>
            <table className="w-[70%] border-collapse">
                <thead>
                    <tr className="h-[60px] bg-[#F6F8F6] border-1 border-gray-300">
                        <th className="text-xl font-medium pl-4">Item</th>
                        <th className="text-xl font-medium pl-4">Subject</th>
                        <th className="px-4">
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <span className="text-xl w-[30px] font-medium">S</span>
                                <span className="text-xl w-[30px] font-medium">O</span>
                                <span className="text-xl w-[30px] font-medium">D</span>
                                <span className="text-xl w-[30px] font-medium">E</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { item: "Failure mode 1", subject: "Perception failure" },
                        { item: "Failure mode 2", subject: "Perception failure" },
                        { item: "Failure mode 3", subject: "Communication failure" },
                        { item: "Failure mode 4", subject: "Hardware failure" },
                    ].map((row, index) => (
                        <tr key={index} className="h-[60px] bg-gray-50 border-1 border-gray-300 hover:shadow-lg hover:bg-gray-100 cursor-pointer">
                            <td className="text-lg pl-4">{row.item}</td>
                            <td className="text-lg pl-4">{row.subject}</td>
                            <td className="px-4">
                                <div className="flex flex-row gap-1 items-center items-center justify-center">
                                    <input placeholder="4" className="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                    <input placeholder="5" className="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                    <input placeholder="3" className="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                    <input placeholder="2" className="text-lg w-[30px] bg-[#CED0D1] rounded-md text-center"/>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}