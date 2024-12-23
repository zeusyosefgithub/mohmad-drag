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
import { isArray } from "lodash";


export default function ModalMtsavMlae({ disable, show, category, mlae, activeMlae,snefMlae }) {

    const [AdconemHadshem, setAedconemHadshem] = useState([]);
    const [mtsavNsbar, setMtsavNsbar] = useState([]);
    const [loading, setLoading] = useState(false);
    const metadata = GetDocs('metadata');
    const componentRefOne = useRef();
    const [fectevet, setFectevet] = useState(false);
    const counterHkhnsotAhrot = metadata.find((count) => count.id === 'counterHkhnsotAhrot');

    useEffect(() => {
        if (Array.isArray(mlae) && mlae.length > 0) {
            setAedconemHadshem([...mlae]);
        } else {
            setAedconemHadshem([]);
        }
    }, [mlae]);

    const handleChange = (index, key, value) => {
        const updatedArray = AdconemHadshem.map((item, i) =>
            i === index ? { ...item, [key]: value } : item
        );
        setAedconemHadshem(updatedArray);
    };

    const BdekatMlaeHdash = () => {
        for (let index = 0; index < mlae?.length; index++) {
            if (AdconemHadshem[index]?.kmot !== mlae[index]?.kmot || AdconemHadshem[index]?.mtsavNsbar !== mlae[index]?.mtsavNsbar) {
                return true;
            }
        }
        return false;
    }
    const handelPrintHeshvonit = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 0;
        }
        `,
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

    const GetTsebaMataemLmtsavNsbar = (val) => {
        if(val === 'ריק'){
            return 'danger';
        }
        else if(val === 'חסר'){
            return 'warning';
        }
        else if(val === 'מספיק'){
            return 'success';
        }
        else{
            return 'success';
        }
    }

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={() => {
            setAedconemHadshem([...mlae]);
            disable();
        }}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center bg-white border-b-2">
                        <div className="w-full flex justify-around items-center">
                            <div>מצב ספירת מלאי</div>
                        </div>
                    </ModalHeader>
                    <ModalBody className="shadow-2xl bg-white">
                        <div className='hidden'>
                            <SferatMlae mlae={activeMlae} ref={componentRefOne} />
                        </div>
                        <div className="h-[500px] overflow-auto">
                            <div className='rounded-lg p-2'>
                                <div className='mt-5 bg-white'>
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800 top-[-22px] sticky z-30">
                                                <th className="px-4 py-3 text-right font-medium text-black">אחוז נפל</th>
                                                <th className="px-4 py-3 text-right font-medium text-black">כמות נפל</th>
                                                <th className="px-4 py-3 text-right font-medium text-black">כמות בפועל</th>
                                                <th className="px-4 py-3 text-right font-medium text-black">כמות במערכת</th>
                                                <th className="px-6 py-3 text-right font-medium text-black">עדכון אחרון</th>
                                                <th className="px-4 py-3 text-right font-medium text-black">שם פריט</th>
                                                <th className="px-4 py-3 text-right font-medium text-black">מק"ט</th>
                                                <th className="px-4 py-3 text-right font-medium text-black"></th>
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
                                                                    {
                                                                        item?.nsbar ?
                                                                            <div className="w-full flex justify-center">
                                                                                <Input size="xs" type="number" value={AdconemHadshem[index]?.kmot} onValueChange={(val) => handleChange(index, 'kmot', (parseFloat(val) || 0))} dir="rtl" className="w-full max-w-[150px]" />
                                                                            </div>
                                                                            :
                                                                            <div className="w-full flex justify-center">
                                                                                <Dropdown dir="rtl">
                                                                                    <DropdownTrigger>
                                                                                        <Button
                                                                                            variant="flat"
                                                                                            color={AdconemHadshem[index]?.mtsavNsbar ? GetTsebaMataemLmtsavNsbar(AdconemHadshem[index]?.mtsavNsbar) : 'default'}
                                                                                            size="md"
                                                                                            className='mt-2 w-full max-w-[150px]'
                                                                                        >
                                                                                            {AdconemHadshem[index]?.mtsavNsbar || "שם מוצר"}
                                                                                        </Button>
                                                                                    </DropdownTrigger>
                                                                                    <DropdownMenu
                                                                                        aria-label="Multiple selection example"
                                                                                        variant="flat"
                                                                                        closeOnSelect={true}
                                                                                        disallowEmptySelection
                                                                                        selectionMode="single"
                                                                                        selectedKeys={AdconemHadshem[index]?.mtsavNsbar}
                                                                                        onSelectionChange={(val) => handleChange(index, 'mtsavNsbar', val.currentKey)}
                                                                                    >
                                                                                        <DropdownItem key={'ריק'}>ריק</DropdownItem>
                                                                                        <DropdownItem key={'חסר'}>חסר</DropdownItem>
                                                                                        <DropdownItem key={'מספיק'}>מספיק</DropdownItem>
                                                                                        <DropdownItem key={'מלא'}>מלא</DropdownItem>
                                                                                    </DropdownMenu>
                                                                                </Dropdown>
                                                                            </div>
                                                                    }
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
                    <ModalFooter className="bg-white border-t-2">
                        <div className="flex w-full items-center justify-end">
                            <div>
                                <Button className="mr-2 ml-2" size="sm" variant="flat" color="warning" onClick={() => {
                                    //setAedconemHadshem([...mlae]);
                                    disable();
                                }}>
                                    סגור
                                </Button>
                                <Button size="sm" color="primary" variant="flat" onClick={handelPrintHeshvonit}>הדפסת טופס</Button>
                                <Button className="ml-2" isDisabled={!BdekatMlaeHdash()} isLoading={loading} size="sm" variant="flat" color="primary" onClick={async () => {
                                    setLoading(true);
                                    await updateDoc(doc(firestore,'mlae',snefMlae),{motsarem : AdconemHadshem})
                                    disable();
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

