'use client';
import { Autocomplete, AutocompleteItem, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Switch } from "@nextui-org/react";
import { useMemo, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { format } from 'date-fns';

export default function Management() {
    const [sbak, setSbak] = useState('');
    const [entries, setEntries] = useState([{ sogTshlom: '', tshlom: '' }]);

    const handleInputChange = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setEntries(newEntries);
    };

    const handleAddFields = () => {
        setEntries([...entries, { sogTshlom: '', tshlom: '' }]);
        setTimeout(() => {
            endOfFormRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEntries([{ sogTshlom: '', tshlom: '' }]);
    };

    const endOfFormRef = useRef(null);
    const topOfFormRef = useRef(null);

    const scrollToRef = () => {
        topOfFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const scrollToBottomRef = () => {
        endOfFormRef.current.scrollIntoView({ behavior: "smooth" });
    };


    function removeItem(index) {
        const newItems = entries.filter((item, idx) => idx !== index);
        setEntries(newItems);
    }

    const animals = [
        {
            value: 'yosef',
            label: 'yosef'
        },
        {
            value: 'yosef 2',
            label: 'yosef 2'
        },
        {
            value: 'yosef 3',
            label: 'yosef 3'
        },
        {
            value: 'yosef 4',
            label: 'yosef 4'
        }
    ]

    const [showModalAddSbak, setShowModalAddSbak] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const [selectedKeys1, setSelectedKeys1] = useState("צד שני");
    const [selectedKeys, setSelectedKeys] = useState("סוג עסקה");
    const [sogTshlomKeys, setSogTshlomKeys] = useState("סוג תשלום");

    const [mezoman, setMezoman] = useState(false);
    const [shekem, setShekem] = useState(false);

    return (
        <div>

            <div className='flex justify-between items-center mt-20 mr-20 ml-20'>

                <div>
                    <div className="flex flex-col w-full max-w-5xl mx-auto">
                        <div className="text-center text-2xl">
                            לקחות
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מיקוד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם משפחה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תז</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מס בית</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">יתרת חישבון</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">נייד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">עיר</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">ישוב</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם לקוח</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר לקוח</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2000</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2000</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2000</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2000</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2000</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">0503209026</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">40</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">1200</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">מחמוד</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">22</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col w-full max-w-5xl mx-auto mt-20">
                        <div className="text-center text-2xl">
                            ספקים
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">יתרת חישבון</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">נייד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">עיר</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">ישוב</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם ספק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר ספק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2020.15.01</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2020.15.01</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">40</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">1200</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">מחמוד</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">22</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col w-full max-w-5xl mx-auto mt-20">
                        <div className="text-center text-2xl">
                            עובדים
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תעריף לשעה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תפקיד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">נייד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">עיר</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">ישוב</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם עובד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר עובד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">30</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">יצור</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2020.15.01</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">40</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">1200</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">מחמוד</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">22</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col w-full max-w-5xl mx-auto mt-20">
                        <div className="text-center text-2xl">
                            שיקים
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">נייד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר פעל שיק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">פעל שיק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">סכום</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תאריך פרעון</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר חשבון בנק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם בנק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר בנק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר שיק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">30</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">30</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">30</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">יצור</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2020.15.01</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">40</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">1200</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">מחמוד</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">22</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col w-full max-w-5xl mx-auto mt-20">
                        <div className="text-center text-2xl">
                            תנועה במזומנים
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">פירוט</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תאריך</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">סכום כולל</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">סוג תנועה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר תנועה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">יצור</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2020.15.01</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">40</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">1200</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">מחמוד</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">22</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div>
                    <div className="p-5 flex justify-center w-[1000px] overflow-auto h-[600px] bg-white rounded-xl shadow-xl">
                        <form onSubmit={handleSubmit} className='w-full'>
                            <div ref={topOfFormRef} />
                            <div dir='rtl' className=''>
                                <div className='flex justify-center items-center'>
                                    <Input defaultValue={format(new Date(), 'dd-MM-yyyy')} className="max-w-xs m-5" label='תאריך' />
                                    <Dropdown dir="rtl">
                                        <DropdownTrigger>
                                            <Button
                                                variant="bordered"
                                                className="capitalize w-full max-w-xs m-5"
                                                size="lg"
                                            >
                                                {selectedKeys1}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="Multiple selection example"
                                            variant="flat"
                                            closeOnSelect={true}
                                            disallowEmptySelection
                                            selectionMode="single"
                                            selectedKeys={selectedKeys1}
                                            onSelectionChange={(val) => setSelectedKeys1(val.currentKey)}
                                        >
                                            <DropdownItem key="עובדים">עובדים</DropdownItem>
                                            <DropdownItem key="ספקים">ספקים</DropdownItem>
                                            <DropdownItem key="לקחות">לקחות</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown dir="rtl">
                                        <DropdownTrigger>
                                            <Button
                                                variant="bordered"
                                                className="capitalize w-full max-w-xs m-5"
                                                isDisabled={(!(selectedKeys1 !== 'צד שני'))}
                                                size="lg"
                                            >
                                                {selectedKeys}
                                            </Button>
                                        </DropdownTrigger>
                                        {
                                            selectedKeys1 == 'עובדים' &&
                                            <DropdownMenu
                                                aria-label="Multiple selection example"
                                                variant="flat"
                                                closeOnSelect={true}
                                                disallowEmptySelection
                                                selectionMode="single"
                                                selectedKeys={selectedKeys}
                                                onSelectionChange={setSelectedKeys}
                                            >
                                                <DropdownItem key="תשלום שכר עבודה">תשלום שכר עבודה</DropdownItem>
                                                <DropdownItem key="תשלום ביטוח לאומי">תשלום ביטוח לאומי</DropdownItem>
                                                <DropdownItem key="תשולום ארנונה">תשולום מס הכנסה</DropdownItem>
                                                <DropdownItem key="הפרשת פנסיה">הפרשת פנסיה</DropdownItem>
                                                <DropdownItem key="הפרשת פיצוים">הפרשת פיצוים</DropdownItem>
                                                <DropdownItem key="הפרשת קרן השתלמות">הפרשת קרן השתלמות</DropdownItem>
                                            </DropdownMenu>
                                        }
                                        {
                                            selectedKeys1 == 'ספקים' &&
                                            <DropdownMenu
                                                aria-label="Multiple selection example"
                                                variant="flat"
                                                closeOnSelect={true}
                                                disallowEmptySelection
                                                selectionMode="single"
                                                selectedKeys={selectedKeys}
                                                onSelectionChange={setSelectedKeys}
                                            >
                                                <DropdownItem key="תשלום הלואה">תשלום הלואה</DropdownItem>
                                                <DropdownItem key="קבלת הלואה">קבלת הלואה</DropdownItem>
                                                <DropdownItem key="תשלום השכרה">תשלום השכרה</DropdownItem>
                                                <DropdownItem key="תשלום תקשורת">תשלום תקשורת</DropdownItem>
                                                <DropdownItem key="תשלום חומרי גלם">תשלום חומרי גלם</DropdownItem>
                                                <DropdownItem key="קבלת כסף מספק">קבלת כסף מספק</DropdownItem>
                                                <DropdownItem key="מס הכנסה">מס הכנסה</DropdownItem>
                                                <DropdownItem key="ביטוח לאומי">ביטוח לאומי</DropdownItem>
                                                <DropdownItem key="תשלום רואי חשבון">תשלום רואי חשבון</DropdownItem>
                                                <DropdownItem key="תשלום לתיקון">תשלום לתיקון</DropdownItem>
                                            </DropdownMenu>
                                        }
                                        {
                                            selectedKeys1 == 'לקחות' &&
                                            <DropdownMenu
                                                aria-label="Multiple selection example"
                                                variant="flat"
                                                closeOnSelect={true}
                                                disallowEmptySelection
                                                selectionMode="single"
                                                selectedKeys={selectedKeys}
                                                onSelectionChange={setSelectedKeys}
                                            >
                                                <DropdownItem key="קבלת כסף מלקוח">קבלת כסף מלקוח</DropdownItem>
                                                <DropdownItem key="החזרת כסף ללקוח">החזרת כסף ללקוח</DropdownItem>
                                            </DropdownMenu>
                                        }
                                    </Dropdown>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <Autocomplete
                                        bordered
                                        fullWidth
                                        label="ספק"
                                        className="max-w-xs m-5"
                                        color="primary"
                                        defaultItems={animals}
                                        allowsCustomValue={true}
                                        onSelectionChange={setSbak}
                                        onInputChange={setSbak}
                                    >
                                        {
                                            animals.map((animal) => (
                                                <AutocompleteItem className='text-right' key={animal.value} value={animal.value}>
                                                    {animal.label}
                                                </AutocompleteItem>
                                            ))
                                        }
                                    </Autocomplete>
                                    <Input className="max-w-xs m-5" label='סכום כולל' />
                                    {
                                        entries?.length > 1 &&
                                        <Button onClick={scrollToBottomRef} auto flat className='ml-5'>
                                            <FaArrowDown />
                                        </Button>
                                    }
                                </div>
                            </div>
                            <Divider />
                            <div dir="rtl" className="flex items-center m-5">
                                <Switch value={mezoman} onValueChange={(e) => setMezoman(e)}>
                                    <div className="mr-5">מזומן</div>
                                </Switch>
                                {
                                    mezoman &&
                                    <Input size="" className="max-w-xs mr-5" label='סכום' />
                                }
                            </div>
                            <Divider />
                            <div dir="rtl" className="flex items-center m-5">
                                <Switch value={shekem} onValueChange={(e) => setShekem(e)}>
                                    <div className="mr-5">שיקים</div>
                                </Switch>

                            </div>
                            <div dir="rtl" className="mb-5">
                                {
                                    shekem &&
                                    <>
                                        {entries?.map((entry, index) => (
                                            <div className="flex items-center mt-2">
                                                <div>{index + 1}</div>
                                                <Input
                                                    bordered
                                                    fullWidth
                                                    type="number"
                                                    color="primary"
                                                    className="max-w-xs m-2"
                                                    size=""
                                                    placeholder="מספר שיק"
                                                    value={entry.tshlom}
                                                    onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                                />
                                                <Input
                                                    bordered
                                                    fullWidth
                                                    type="number"
                                                    color="primary"
                                                    size=""
                                                    className="max-w-xs m-2"
                                                    placeholder="מספר בנק"
                                                    value={entry.tshlom}
                                                    onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                                />
                                                <Input
                                                    bordered
                                                    fullWidth
                                                    type="number"
                                                    color="primary"
                                                    className="max-w-xs m-2"
                                                    size=""
                                                    placeholder="שם בנק"
                                                    value={entry.tshlom}
                                                    onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                                />
                                                <Input
                                                    bordered
                                                    fullWidth
                                                    type="number"
                                                    color="primary"
                                                    className="max-w-xs m-2"
                                                    size=""
                                                    placeholder="מספר חשבון בנק"
                                                    value={entry.tshlom}
                                                    onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                                />
                                                <Input
                                                    bordered
                                                    fullWidth
                                                    type="number"
                                                    color="primary"
                                                    className="max-w-xs m-2"
                                                    size=""
                                                    placeholder="תאריך פרעון"
                                                    value={entry.tshlom}
                                                    onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                                />
                                                <Input
                                                    bordered
                                                    fullWidth
                                                    type="number"
                                                    color="primary"
                                                    size=""
                                                    className="max-w-xs m-2"
                                                    placeholder="סכום"
                                                    value={entry.tshlom}
                                                    onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                                />
                                                {
                                                    (index === entries.length - 1)
                                                        ?
                                                        <Button auto size="sm" color="primary" flat onClick={handleAddFields} className='m-2'>
                                                            <FiPlus className="text-xl" />
                                                        </Button>
                                                        :
                                                        <Button auto size="sm" color="danger" flat onClick={() => removeItem(index)} className='m-2'>
                                                            <FaTrash className="text-lg" />
                                                        </Button>
                                                }

                                            </div>
                                        ))}
                                    </>
                                }
                            </div>
                            <Divider />

                            <div className='flex justify-center'>
                                <Button auto flat color="primary" type="submit" className='m-5'>
                                    אישור
                                </Button>
                                {
                                    entries?.length > 1 &&
                                    <Button onClick={scrollToRef} auto flat className='m-5'>
                                        <FaArrowUp />
                                    </Button>
                                }
                            </div>
                            <div ref={endOfFormRef} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}