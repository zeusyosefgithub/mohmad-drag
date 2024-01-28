'use client';
import Image from "next/image";
import rep4 from './../../images/rep4.avif';
import rep5 from './../../images/rep5.jpg';

export default function Mony() {
    return (
        <div className="w-full flex p-20">
            <div className="w-1/2">
                <div className="flex justify-center p-10">
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <th colSpan={3} className="border-1 border-[#a1a1aa]">ניתוח נתונים</th>
                            </tr>
                            <tr>
                                <th className="border-1 border-[#a1a1aa] w-1/3">סוג דווח</th>
                                <th className="border-1 border-[#a1a1aa] w-1/3">שם דווח</th>
                                <th className="border-1 border-[#a1a1aa] w-1/3">מספר דווח</th>
                            </tr>
                            <tr>
                                <th className="border-1 border-[#a1a1aa]">125</th>
                                <th className="border-1 border-[#a1a1aa]">דווח הוצאות עובדים</th>
                                <th className="border-1 border-[#a1a1aa]">4</th>
                            </tr>
                            <tr>
                                <th className="border-1 border-[#a1a1aa]">45</th>
                                <th className="border-1 border-[#a1a1aa]">דווח מחירי קניות</th>
                                <th className="border-1 border-[#a1a1aa]">55</th>
                            </tr>
                            <tr>
                                <th className="border-1 border-[#a1a1aa]">30</th>
                                <th className="border-1 border-[#a1a1aa]">חווד רווח הפסד</th>
                                <th className="border-1 border-[#a1a1aa]">25</th>
                            </tr>
                            <tr>
                                <th className="border-1 border-[#a1a1aa]">125</th>
                                <th className="border-1 border-[#a1a1aa]">דווח נכסים</th>
                                <th className="border-1 border-[#a1a1aa]">4</th>
                            </tr>
                            <tr>
                                <th className="border-1 border-[#a1a1aa]">45</th>
                                <th className="border-1 border-[#a1a1aa]">דווח התחייבות</th>
                                <th className="border-1 border-[#a1a1aa]">55</th>
                            </tr>
                            <tr>
                                <th className="border-1 border-[#a1a1aa]">30</th>
                                <th className="border-1 border-[#a1a1aa]">דווח תזירים מזומנים</th>
                                <th className="border-1 border-[#a1a1aa]">25</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex w-1/2">
                    <Image src={rep4} />
                    <Image src={rep5} />
                </div>

            </div>
            <div className="m-20" />
            <div className="w-1/2 flex">
            <div className="w-1/2">
                    <div className="flex p-10">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <th colSpan={3} className="border-1 border-[#a1a1aa]">מוצרים</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">מחיר מוצר (ק"ג)</th>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">שם מוצר</th>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">מספר מוצרי</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">15</th>
                                    <th className="border-1 border-[#a1a1aa]">ברזל</th>
                                    <th className="border-1 border-[#a1a1aa]">24</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">45</th>
                                    <th className="border-1 border-[#a1a1aa]">ארגז כלים</th>
                                    <th className="border-1 border-[#a1a1aa]">13</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">30</th>
                                    <th className="border-1 border-[#a1a1aa]">סולם</th>
                                    <th className="border-1 border-[#a1a1aa]">33</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">15</th>
                                    <th className="border-1 border-[#a1a1aa]">ברזל</th>
                                    <th className="border-1 border-[#a1a1aa]">24</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">45</th>
                                    <th className="border-1 border-[#a1a1aa]">ארגז כלים</th>
                                    <th className="border-1 border-[#a1a1aa]">13</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">30</th>
                                    <th className="border-1 border-[#a1a1aa]">סולם</th>
                                    <th className="border-1 border-[#a1a1aa]">33</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex p-10">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <th colSpan={3} className="border-1 border-[#a1a1aa]">עובדים</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">תעריף לשעה</th>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">שם עובד</th>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">מספר עובד</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">125</th>
                                    <th className="border-1 border-[#a1a1aa]">אווס</th>
                                    <th className="border-1 border-[#a1a1aa]">4</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">45</th>
                                    <th className="border-1 border-[#a1a1aa]">מחמוד</th>
                                    <th className="border-1 border-[#a1a1aa]">55</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">30</th>
                                    <th className="border-1 border-[#a1a1aa]">מחמד</th>
                                    <th className="border-1 border-[#a1a1aa]">25</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">125</th>
                                    <th className="border-1 border-[#a1a1aa]">אווס</th>
                                    <th className="border-1 border-[#a1a1aa]">4</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">45</th>
                                    <th className="border-1 border-[#a1a1aa]">מחמוד</th>
                                    <th className="border-1 border-[#a1a1aa]">55</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">30</th>
                                    <th className="border-1 border-[#a1a1aa]">מחמד</th>
                                    <th className="border-1 border-[#a1a1aa]">25</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex p-10">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <th colSpan={2} className="border-1 border-[#a1a1aa]">עלות חודשית : מרץ 2024</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">סכום עלות</th>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">שם העלות</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">15</th>
                                    <th className="border-1 border-[#a1a1aa]">חומרי גלם</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">45</th>
                                    <th className="border-1 border-[#a1a1aa]">עובדים</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">30</th>
                                    <th className="border-1 border-[#a1a1aa]">חשמל</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">15</th>
                                    <th className="border-1 border-[#a1a1aa]">ארנונה</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">45</th>
                                    <th className="border-1 border-[#a1a1aa]">מים</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">30</th>
                                    <th className="border-1 border-[#a1a1aa]">מס' חברות</th>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="m-10"/>
                <div className="w-1/2">
                    <div className="flex p-10">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <th colSpan={3} className="border-1 border-[#a1a1aa]">מוצרים</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">מחיר מוצר (ק"ג)</th>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">שם מוצר</th>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">מספר מוצרי</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">15</th>
                                    <th className="border-1 border-[#a1a1aa]">ברזל</th>
                                    <th className="border-1 border-[#a1a1aa]">24</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">45</th>
                                    <th className="border-1 border-[#a1a1aa]">ארגז כלים</th>
                                    <th className="border-1 border-[#a1a1aa]">13</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">30</th>
                                    <th className="border-1 border-[#a1a1aa]">סולם</th>
                                    <th className="border-1 border-[#a1a1aa]">33</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">15</th>
                                    <th className="border-1 border-[#a1a1aa]">ברזל</th>
                                    <th className="border-1 border-[#a1a1aa]">24</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">45</th>
                                    <th className="border-1 border-[#a1a1aa]">ארגז כלים</th>
                                    <th className="border-1 border-[#a1a1aa]">13</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">30</th>
                                    <th className="border-1 border-[#a1a1aa]">סולם</th>
                                    <th className="border-1 border-[#a1a1aa]">33</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex p-10">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <th colSpan={3} className="border-1 border-[#a1a1aa]">עובדים</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">תעריף לשעה</th>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">שם עובד</th>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">מספר עובד</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">125</th>
                                    <th className="border-1 border-[#a1a1aa]">אווס</th>
                                    <th className="border-1 border-[#a1a1aa]">4</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">45</th>
                                    <th className="border-1 border-[#a1a1aa]">מחמוד</th>
                                    <th className="border-1 border-[#a1a1aa]">55</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">30</th>
                                    <th className="border-1 border-[#a1a1aa]">מחמד</th>
                                    <th className="border-1 border-[#a1a1aa]">25</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">125</th>
                                    <th className="border-1 border-[#a1a1aa]">אווס</th>
                                    <th className="border-1 border-[#a1a1aa]">4</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">45</th>
                                    <th className="border-1 border-[#a1a1aa]">מחמוד</th>
                                    <th className="border-1 border-[#a1a1aa]">55</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">30</th>
                                    <th className="border-1 border-[#a1a1aa]">מחמד</th>
                                    <th className="border-1 border-[#a1a1aa]">25</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex p-10">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <th colSpan={2} className="border-1 border-[#a1a1aa]">עלות חודשית : מרץ 2024</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">סכום עלות</th>
                                    <th className="border-1 border-[#a1a1aa] w-1/3">שם העלות</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">15</th>
                                    <th className="border-1 border-[#a1a1aa]">חומרי גלם</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">45</th>
                                    <th className="border-1 border-[#a1a1aa]">עובדים</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">30</th>
                                    <th className="border-1 border-[#a1a1aa]">חשמל</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">15</th>
                                    <th className="border-1 border-[#a1a1aa]">ארנונה</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">45</th>
                                    <th className="border-1 border-[#a1a1aa]">מים</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa]">30</th>
                                    <th className="border-1 border-[#a1a1aa]">מס' חברות</th>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}