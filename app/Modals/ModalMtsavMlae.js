'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, AutocompleteItem, Autocomplete, Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GetTmonatHelek } from "../page";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { FaPlus, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { differenceInDays, format } from "date-fns";


export default function ModalMtsavMlae({ disable, show, category, mlae }) {

    const [AdconemHadshem,setAedconemHadshem] = useState(mlae);

    useEffect(() => {
        let newArray = [];
        for (let index = 0; index < mlae.length; index++) {
            newArray.push('');
        }
        setAedconemHadshem(newArray);
    },[mlae])

    const handleChange = (index, value) => {
        const newArray = [...AdconemHadshem];
        newArray[index] = value;
        setAedconemHadshem(newArray);
    };

    const BdekatMlaeHdash = () => {
        for (let index = 0; index < AdconemHadshem.length; index++) {
            if(AdconemHadshem[index] !== ''){
                return true;
            }
        }
        return false;
    }

    function flipDate(dateStr) {
        const [day, month, year] = dateStr.split('-');
        const flippedDateStr = `${year}-${month}-${day}`;
        return flippedDateStr;
      }

    function BdekatTarekhAdcon(val){
        return differenceInDays(format(new Date,'yyyy-MM-dd'),flipDate(val));
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
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">מצב ספירת מלאי</ModalHeader>
                    <ModalBody className="shadow-2xl">
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
                                                            return item.categoryMotsar === motsar.sog && <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">%{(getFirstTwoDigitsAfterDot(item.kmotNefl / item.sakhHkolKneot) || '')}</td>
                                                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.kmotNefl}</td>
                                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">
                                                                    <div className="w-full flex justify-center">
                                                                        <Input type="number" value={AdconemHadshem[index]} onValueChange={(val) => handleChange(index,(parseFloat(val) || 0))} dir="rtl" className="max-w-[150px]"/>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.kmot}</td>
                                                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 text-xs"><div className={`p-1 rounded-xl text-white ${!item.adconAhron ? '' : BdekatTarekhAdcon(item.adconAhron) < 7 ? 'bg-success' : BdekatTarekhAdcon(item.adconAhron) >= 7 && BdekatTarekhAdcon(item.adconAhron) < 30 ? 'bg-warning' : 'bg-danger'}`}>{item.adconAhron}</div></td>
                                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.shem}</td>
                                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.msbar}</td>
                                                                <td>
                                                                    <div className="group relative">
                                                                        <Image src={GetTmonatHelek(item.categoryMotsar)} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg hover:z-50 bg-white group-hover:translate-x-[-220%]" />
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
                        <Button size="lg" color="primary" onClick={() => {
                            disable();
                        }}>
                            סגור
                        </Button>
                        {
                            BdekatMlaeHdash() && <Button size="lg" color="primary" onClick={async() => {
                                for (let index = 0; index < AdconemHadshem.length; index++) {
                                    if(AdconemHadshem[index] !== ''){
                                        await updateDoc(doc(firestore,'mlae',mlae[index].id),{
                                            kmot:AdconemHadshem[index],
                                            adconAhron: format(new Date(),'dd-MM-yyyy'),
                                            kmotNefl: (mlae[index].kmotNefl + (mlae[index].kmot - AdconemHadshem[index])),
                                            alot: AdconemHadshem[index] * mlae[index].alotLeheda,
                                            alotLeheda: truncateToTwoDecimals(parseFloat((AdconemHadshem[index] * mlae[index].alotLeheda) / AdconemHadshem[index]))
                                        })
                                    }
                                }
                                disable();
                            }}>
                                עדכון
                            </Button>
                        }
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}

