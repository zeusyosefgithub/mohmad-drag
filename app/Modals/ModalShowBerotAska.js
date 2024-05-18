'use client';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useGetDataByCondition } from "../FireBase/getDataByCondition";

export default function ModalShowBerotAska({ show, disable, aska }) {
    const sbak = useGetDataByCondition('sbkem', 'msbar', '==', aska ? aska?.msbarSbak : 'none')[0];

    const berotMotsarem = aska?.berot;
    console.log(berotMotsarem)


    return (
        <Modal placement="center" className="test-fontt max-w-[1000px]" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">קניה מספר - {aska?.msbar}</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl">
                            <div className="flex justify-around text-xl font-bold">
                                <div>
                                    ספק - {sbak?.shem}
                                </div>
                                <div>
                                    מספר - {sbak?.nead}
                                </div>
                                <div>
                                    שירות - {sbak?.sherot}
                                </div>
                            </div>
                            <div className="mt-10">
                                <div className='mt-5 bg-gray-300' dir="ltr">
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-500 dark:bg-gray-800">
                                                <th className="px-4 py-3 text-center font-medium text-white">מחיר ליחידה</th>
                                                <th className="px-4 py-3 text-center font-medium text-white">כמות</th>
                                                <th className="px-4 py-3 text-center font-medium text-white">קטיגוריה</th>
                                                <th className="px-4 py-3 text-center font-medium text-white">סוג מוצר</th>
                                                <th className="px-4 py-3 text-center font-medium text-white">שם מוצר</th>
                                                <th className="px-4 py-3 text-center font-medium text-white">מספר מוצר</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {berotMotsarem?.map((item, index) => (
                                                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.price}</td>
                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.amount}</td>
                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.category}</td>
                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.sogMotsar}</td>
                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.id}</td>
                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.msbarMotsar}</td>
                                                </tr>
                                            ))}
                                            <tr className="bg-gray-500 dark:bg-gray-800">
                                                <th className="px-4 py-3 text-center text-white font-medium text-xl">סכום : {aska?.skhom}</th>
                                                <th className="px-4 py-3 text-center font-medium text-white"></th>
                                                <th className="px-4 py-3 text-center font-medium text-white"></th>
                                                <th className="px-4 py-3 text-center font-medium text-white"></th>
                                                <th className="px-4 py-3 text-center font-medium text-white"></th>
                                                <th className="px-4 py-3 text-center font-medium text-white"></th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={disable}>
                            סגור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}