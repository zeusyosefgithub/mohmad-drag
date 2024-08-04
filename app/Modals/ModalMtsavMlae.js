'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, AutocompleteItem, Autocomplete, Avatar, Switch } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { GetTmonatHelek } from "../page";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { FaPlus, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { differenceInDays, format } from "date-fns";
import GetDocs from "../FireBase/getDocs";
import { SferatMlae } from "../Page Components/SferatMlae";
import { useReactToPrint } from "react-to-print";


export default function ModalMtsavMlae({ disable, show, category, mlae, activeMlae }) {

    const [AdconemHadshem, setAedconemHadshem] = useState();
    const [loading, setLoading] = useState(false);
    const metadata = GetDocs('metadata');
    const componentRefOne = useRef();
    const [fectevet,setFectevet] = useState(false);
    const counterHkhnsotAhrot = metadata.find((count) => count.id === 'counterHkhnsotAhrot');
    useEffect(() => {
        setAedconemHadshem([...mlae]);
    }, [mlae]);

    const handleChange = (index, key, value) => {
        const updatedArray = AdconemHadshem.map((item, i) =>
            i === index ? { ...item, [key]: value } : item
        );
        setAedconemHadshem(updatedArray);
    };

    const BdekatMlaeHdash = () => {
        for (let index = 0; index < mlae?.length; index++) {
            if (AdconemHadshem[index]?.kmot !== mlae[index]?.kmot) {
                return true;
            }
        }
        return false;
    }
    const handelPrintHeshvonit = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 0;
        }`,
        content: () => componentRefOne.current,
    });

    function flipDate(dateStr) {
        const [day, month, year] = dateStr.split('-');
        const flippedDateStr = `${year}-${month}-${day}`;
        return flippedDateStr;
    }

    function BdekatTarekhAdcon(val) {
        return differenceInDays(format(new Date, 'yyyy-MM-dd'), flipDate(val));
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
        return isNegative ? `${0}` : firstTwoDigits;
    }

    function truncateToTwoDecimals(num) {
        // Convert the number to a string with two decimal places
        const truncatedNum = num.toFixed(2);
        return truncatedNum;
    }

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={() => {
            setAedconemHadshem([...mlae]);
            disable();
        }}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">
                        <div className="w-full flex justify-around items-center">
                            <Switch color="danger" value={fectevet} onValueChange={async(val) => {
                                setFectevet(val);
                            }}>ספירה פיקטיבית</Switch>
                            <div>מצב ספירת מלאי</div>
                        </div>
                    </ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div className='hidden'>
                            <SferatMlae mlae={activeMlae} ref={componentRefOne} />
                        </div>
                        <div className="h-[800px] overflow-auto">
                            <div className='rounded-lg p-2'>
                                <div className='mt-5 bg-gray-300'>
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-500 dark:bg-gray-800">
                                                <th className="px-4 py-3 text-center font-medium text-white">אחוז נפל</th>
                                                <th className="px-4 py-3 text-center font-medium text-white">כמות נפל</th>
                                                <th className="px-4 py-3 text-center font-medium text-white">כמות בפועל</th>
                                                <th className="px-4 py-3 text-center font-medium text-white">כמות במערכת</th>
                                                <th className="px-6 py-3 text-center font-medium text-white">עדכון אחרון</th>
                                                <th className="px-4 py-3 text-right font-medium text-white">שם פריט</th>
                                                <th className="px-4 py-3 text-right font-medium text-white">מק"ט</th>
                                                <th className="px-4 py-3 text-right font-medium text-white"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                category.map((cat, index2) => {
                                                    return cat?.motsarem?.map((motsar, index1) => (
                                                        mlae.map((item, index) => {
                                                            return item?.categoryMotsar === motsar?.sog && <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">%{(getFirstTwoDigitsAfterDot(item?.kmotNefl / item?.sakhHkolKneot) || '')}</td>
                                                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item?.kmotNefl}</td>
                                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">
                                                                    <div className="w-full flex justify-center">
                                                                        <Input type="number" value={AdconemHadshem[index]?.kmot} onValueChange={(val) => handleChange(index, 'kmot', (parseFloat(val) || 0))} dir="rtl" className="max-w-[150px]" />
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item?.kmot}</td>
                                                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 text-xs"><div className={`p-1 rounded-xl text-white ${!item?.adconAhron ? '' : BdekatTarekhAdcon(item?.adconAhron) < 7 ? 'bg-success' : BdekatTarekhAdcon(item?.adconAhron) >= 7 && BdekatTarekhAdcon(item?.adconAhron) < 30 ? 'bg-warning' : 'bg-danger'}`}>{item?.adconAhron}</div></td>
                                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item?.shem}</td>
                                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item?.msbar}</td>
                                                                <td>
                                                                    <div className="group relative">
                                                                        <Image src={GetTmonatHelek(item?.categoryMotsar)} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg hover:z-50 bg-white group-hover:translate-x-[-220%]" />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        })
                                                    ))
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <Divider className='mt-5' />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex w-full items-center justify-between">
                            <div>
                                <Button size="lg" color="primary" onClick={handelPrintHeshvonit}>הדפסת טופס</Button>
+

                                <Button className="mr-2 ml-2" size="lg" color="primary" onClick={() => {
                                    //setAedconemHadshem([...mlae]);
                                    disable();
                                }}>
                                    סגור
                                </Button>
                                <Button className="mr-2 ml-2" isDisabled={!BdekatMlaeHdash()} isLoading={loading} size="lg" color="primary" onClick={async () => {
                                    setLoading(true);
                                    let countUp = 0;
                                    let countDown = 0;
                                    for (let index = 0; index < AdconemHadshem.length; index++) {
                                        if (AdconemHadshem[index].kmot !== mlae[index]?.kmot) {
                                            if (AdconemHadshem[index].kmot > mlae[index]?.kmot) {
                                                countUp += parseFloat(((AdconemHadshem[index].kmot - mlae[index]?.kmot) * mlae[index]?.alotLeheda).toFixed(2));
                                            }
                                            else if (AdconemHadshem[index].kmot < mlae[index]?.kmot) {
                                                countDown += parseFloat(((mlae[index]?.kmot - AdconemHadshem[index].kmot) * mlae[index]?.alotLeheda).toFixed(2));
                                            }
                                            await updateDoc(doc(firestore, 'mlae', mlae[index].id), {
                                                kmot: AdconemHadshem[index].kmot,
                                                adconAhron: format(new Date(), 'dd-MM-yyyy'),
                                                kmotNefl: (mlae[index].kmotNefl + (mlae[index].kmot - AdconemHadshem[index].kmot)),
                                                alot: AdconemHadshem[index].kmot * mlae[index].alotLeheda,
                                                alotLeheda: truncateToTwoDecimals(parseFloat((AdconemHadshem[index].kmot * mlae[index].alotLeheda) / AdconemHadshem[index].kmot))
                                            });
                                        }
                                    }
                                    if(!fectevet){
                                        await updateDoc(doc(firestore, 'metadata', 'counterHkhnsotAhrot'), {
                                            count: counterHkhnsotAhrot?.munth === format(new Date(), 'MM-yyyy') ? (counterHkhnsotAhrot?.count + (-countUp + countDown)) : 0,
                                            munth: format(new Date(), 'MM-yyyy'),
                                            countAll: counterHkhnsotAhrot?.countAll + parseFloat(-countUp + countDown),
                                            countMunths: counterHkhnsotAhrot.munth !== format(new Date(), 'MM-yyyy') ? (counterHkhnsotAhrot.countMunths + 1) : (1)
                                        }); 
                                    }
                                    disable();
                                    setAedconemHadshem([...mlae]);
                                    setLoading(false);
                                }}>
                                    עדכון
                                </Button>
                            </div>
                        </div>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}

