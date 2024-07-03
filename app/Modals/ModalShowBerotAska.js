'use client';
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useGetDataByCondition } from "../FireBase/getDataByCondition";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useEffect, useState } from "react";
import { isNumber } from "lodash";
import { format } from "date-fns";

export default function ModalShowBerotAska({ show, disable, aska,mlae,afshrotArekha }) {
    const sbak = useGetDataByCondition('sbkem', 'msbar', '==', aska ? aska?.msbarSbak : 'none')[0];

    const berotMotsarem = aska?.berot;
    function GetMafeneeMotsar(val){
        for (let index = 0; index < mlae.length; index++) {
            if(mlae[index].msbar === val){
                return mlae[index];
            }
        }
        return null;
    }
    function truncateToTwoDecimals(num) {
        const truncatedNum = num.toFixed(2);
        return truncatedNum;
    }


    const [BreteMotsarem,setBreteMotsarem] = useState();
    useEffect(() => {
        let newArray = [];
        for (let index = 0; index < aska?.berot?.length; index++) {
            newArray.push({
                amount: '',
                category:aska?.berot[index]?.category,
                id:aska?.berot[index]?.id,
                msbarMotsar:aska?.berot[index]?.msbarMotsar,
                price:'',
            });
        }
        setBreteMotsarem(newArray);
    },[berotMotsarem]);

    const handleInputChange = (index, field, value) => {
        const newEntries = [...BreteMotsarem];
        newEntries[index][field] = value;
        setBreteMotsarem(newEntries);
    };

    function GetTotalPriceShop() {
        let res = 0;
        for (let index = 0; index < BreteMotsarem?.length; index++) {
            res += (parseFloat(BreteMotsarem[index].amount) * parseFloat(BreteMotsarem[index].price));
        }
        return res || '';
    }

    console.log(aska);

    function BdekatAedcon(){
        for (let index = 0; index < aska?.berot?.length; index++) {
            if(BreteMotsarem[index]?.amount !== '' && BreteMotsarem[index]?.price !== '' && (parseFloat(BreteMotsarem[index]?.amount) !== parseFloat(aska?.berot[index].amount) || parseFloat(BreteMotsarem[index]?.price) !== parseFloat(aska?.berot[index].price))){
                return true;
            }
        }
        return false;
    }

    function getFirstTwoDigitsAfterDot(number) {
        const numberStr = number.toString();
        const dotIndex = numberStr.indexOf('.');
        if (dotIndex === -1) {
          return '';
        }
        const digitsAfterDot = numberStr.substring(dotIndex + 1);
        const firstTwoDigits = digitsAfterDot.substring(0, 2);
        const isNegative = number < 0;
        return isNegative ? `-${firstTwoDigits}` : firstTwoDigits;
      }


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
                            <div className="mt-10 h-[600px] overflow-auto">
                                <div className='mt-5 bg-gray-300' dir="ltr">
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-500 dark:bg-gray-800 sticky top-0">
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
                                            <tr className="bg-gray-500 dark:bg-gray-800 sticky bottom-0">
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
                                <Divider className="max-w-[360px] mt-5 mb-2"/>
                                {
                                    afshrotArekha &&
                                    <>
                                        {
                                            BreteMotsarem?.map((berot, index) => {
                                                return <div className="m-3">
                                                    <div className="text-lg font-bold">
                                                        אפשרות עדכון
                                                    </div>
                                                    <div className="mt-5 w-full max-w-[360px] flex justify-around">
                                                        <div>
                                                            {
                                                                berot?.msbarMotsar
                                                            }
                                                        </div>
                                                        <div>
                                                            {
                                                                berot?.id
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="mt-5 flex">
                                                        <Input value={berot.amount} type="number" onValueChange={(val) => {handleInputChange(index,'amount',val)}} className="max-w-[170px] ml-2" color="primary" label="כמות" />
                                                        <Input value={berot.price} type="number" onValueChange={(val) => {handleInputChange(index,'price',val)}} className="max-w-[170px] mr-2 ml-2" color="primary" label="מחיר ליחידה" />
                                                    </div>
                                                    <Divider className="max-w-[360px] mt-5 mb-2"/>
                                                </div>
                                            })
                                        }
                                        <div>
                                            <Input isReadOnly value={GetTotalPriceShop()} className="max-w-[360px] mr-2 ml-2" color="primary" label="הסכום החדש" />
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="w-full flex justify-between">
                            {
                                afshrotArekha && <>
                                    <Button size="lg" color="danger" onClick={async () => {
                                        await deleteDoc(doc(firestore, 'tnoahBkneot', aska?.id));
                                        for (let index = 0; index < berotMotsarem.length; index++) {
                                            const motsar = GetMafeneeMotsar(berotMotsarem[index].msbarMotsar);
                                            if(motsar){
                                                await updateDoc(doc(firestore, 'mlae', motsar.id), {
                                                    kmot: motsar.kmot - berotMotsarem[index].amount,
                                                    alot: motsar.alot - (berotMotsarem[index].price * berotMotsarem[index].amount),
                                                    sakhHkolKneot: motsar.sakhHkolKneot - berotMotsarem[index].amount,
                                                    alotLeheda: truncateToTwoDecimals(parseFloat((motsar.alot - (berotMotsarem[index].price * berotMotsarem[index].amount)) / (motsar.kmot - berotMotsarem[index].amount)))
                                                }); 
                                            }
                                        }
                                        disable();
                                    }}>
                                        מחיקה
                                    </Button>
                                </>
                            }
                            <div>
                                <Button size="lg" className="mr-2 ml-2" color="primary" onClick={() => {
                                    let newArray = [];
                                    for (let index = 0; index < aska?.berot?.length; index++) {
                                        newArray.push({
                                            amount: '',
                                            category:aska?.berot[index]?.category,
                                            id:aska?.berot[index]?.id,
                                            msbarMotsar:aska?.berot[index]?.msbarMotsar,
                                            price:'',
                                        });
                                    }
                                    setBreteMotsarem(newArray);
                                    disable();
                                }}>
                                    סגור
                                </Button>
                                {
                                    afshrotArekha && BdekatAedcon() &&
                                    <Button size="lg" className="ml-2" color="primary" onClick={async () => {
                                        for (let index = 0; index < BreteMotsarem.length; index++) {
                                            if (BreteMotsarem[index]?.amount !== '' && BreteMotsarem[index]?.price !== '') {
                                                let past = GetMafeneeMotsar(BreteMotsarem[index].msbarMotsar);
                                                await updateDoc(doc(firestore, 'mlae', past.id), {
                                                    kmot: ((past.kmot - parseFloat(aska?.berot[index]?.amount)) + parseFloat(BreteMotsarem[index]?.amount)),
                                                    sakhHkolKneot: ((past.sakhHkolKneot - parseFloat(aska?.berot[index]?.amount)) + parseFloat(BreteMotsarem[index]?.amount)),
                                                    alot: ((past.alot - (parseFloat(aska?.berot[index]?.amount) * parseFloat(aska?.berot[index]?.price))) + (parseFloat(BreteMotsarem[index]?.amount) * parseFloat(BreteMotsarem[index]?.price))),
                                                    alotLeheda: getFirstTwoDigitsAfterDot((((past.alot - (parseFloat(aska?.berot[index]?.amount) * parseFloat(aska?.berot[index]?.price))) + (parseFloat(BreteMotsarem[index]?.amount) * parseFloat(BreteMotsarem[index]?.price))) / ((past.kmot - parseFloat(aska?.berot[index]?.amount)) + parseFloat(BreteMotsarem[index]?.amount))))
                                                });
                                            }
                                        }
                                    }}>
                                        עדכון
                                    </Button>
                                }
                            </div>
                        </div>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}