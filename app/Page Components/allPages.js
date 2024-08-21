'use client';
import React from "react";
import ImageThree from "./imageThree";
import ImageFour from "./imageFour";
import ImageFive from "./imageFive";
import ImageOne from "./imageOne";
import ImageTwo from "./imageTwo";
import { format } from "date-fns";
import ImageSix from "./imageSix";

export const AllPages = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="bg-white">
            <div className="mb-48">
                <div className="rotate_page">
                    <div className="margning_rotate_page" dir="rtl">
                        <table className="fulling_rotate_page">
                            <tbody>
                                <tr>
                                    <th colSpan={4} className="border-1 border-[#a1a1aa] p-3">מסכי חובה בתיק גרור חדש</th>
                                </tr>
                                <tr>
                                    <th colSpan={3} className="border-1 border-[#a1a1aa] p-3"><div className="flex justify-around items-center font-extrabold"><div>מספר גרור</div><div>{props?.data?.drag?.dragnum}</div></div></th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">מסמכים לבדיקה</th>
                                    <th className="border-1 border-[#a1a1aa] pr-5 pl-5">נמצא</th>
                                    <th className="border-1 border-[#a1a1aa] pr-5 pl-5">לא נמצא</th>
                                    <th className="border-1 border-[#a1a1aa] pr-10 pl-10">הערות</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">הסכם מכירה / טופס הזמנה</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">צילום חשבונית רכישה של הנגרר</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">הוראת רישום בתוקף</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">תעודות / אישורים נלווים מחוררים בלבד</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">תעודת ביטוח חובה</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">תעדות זהות רוכש / ייפוי כוח</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">טופס טסט ראשוני של הנגר במכון הרישוי (בקשה לרישום רכב)</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">נספח בקשה לרישום רכב כולל תוצאות שקילה</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">העתק מרישיון הרכב הזמני והקבוע כפי שנמסר לבעל הרכב</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">נספח לרישיון הרכב במידה ונדרש</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">אישור וטופס בדיקה פרטני</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">צילום נגרר ומספר שלדה עם מספר רישוי</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">רשומון יבוא במקרה של יבואן</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-[#a1a1aa] text-right pr-2">רישיון ייצור בתוקף</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                    <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="p-10 mb-96">
                <div className="text-3xl mt-24 font-black hebrow_font">
                    <div className="flex justify-center">
                        ח.ח גורטאות הואדי
                    </div>
                    <div className="flex justify-center mt-2">
                        053-7464428
                    </div>
                </div>
                <div className="flex justify-center w-full text-base font-black hebrow_font">
                    <div className="flex justify-around text-lg mt-16 w-1/2">
                        <div>
                            {props?.data?.drag?.idwight}
                        </div>
                        <div>
                            תעודת שקילה מספר
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full text-base font-black hebrow_font">
                    <div className="flex justify-around text-lg mt-16 w-9/12">
                        <div className="flex">
                            <div>
                                {props?.data?.drag?.opentime}
                            </div>
                            <div dir="rtl" className="ml-3">
                                שעה כניסה :
                            </div>
                        </div>
                        <div className="flex">
                            <div>
                                {props?.data?.drag?.opendate}
                            </div>
                            <div dir="rtl" className="ml-3">
                                תאריך כניסה :
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full text-base font-black hebrow_font">
                    <div className="flex justify-around text-lg mt-5 w-9/12">
                        <div className="flex">
                            <div>
                                {props?.data?.drag?.closetime}
                            </div>
                            <div dir="rtl" className="ml-3">
                                שעה יצאה :
                            </div>
                        </div>
                        <div className="flex">
                            <div>
                                {props?.data?.drag?.closedate}
                            </div>
                            <div dir="rtl" className="ml-3">
                                תאריך יציאה :
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-14">
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <th colSpan={2} className="w-1/2 border-1 border-[#a1a1aa]">
                                    <div className="p-1 pt-2">
                                        שם נהג
                                    </div>
                                    <div className="border-1 border-[#e4e4e7] mt-1 mb-1" />
                                    <div className="p-1 pb-2">
                                        {props?.data?.cus?.name}
                                    </div>
                                </th>
                                <th colSpan={2} className="w-1/2 border-1 border-[#a1a1aa]">
                                    <div className="p-1 pt-2">
                                        מספר רכב
                                    </div>
                                    <div className="border-1 border-[#e4e4e7] mt-1 mb-1" />
                                    <div className="p-1 pb-2">
                                        {props?.data?.drag?.licenseid}
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="border-1 border-[#a1a1aa] w-1/4">
                                    <div className="p-1 pt-2">
                                        מס' תעודת משלוח
                                    </div>
                                    <div className="border-1 border-[#e4e4e7] mt-1 mb-1" />
                                    <div className="p-1 pb-2">
                                        2
                                    </div>
                                </th>
                                <th className="border-1 border-[#a1a1aa]">
                                    <div className="p-1 pt-2">
                                        סוג חומר
                                    </div>
                                    <div className="border-1 border-[#e4e4e7] mt-1 mb-1" />
                                    <div className="p-1 pb-2">
                                        כללי
                                    </div>
                                </th>
                                <th className="border-1 border-[#a1a1aa]">
                                    <div className="p-1 pt-2">
                                        שם אתר
                                    </div>
                                    <div className="border-1 border-[#e4e4e7] mt-1 mb-1" />
                                    <div className="p-1 pb-2">
                                        &nbsp;
                                    </div>
                                </th>
                                <th className="border-1 border-[#a1a1aa]">
                                    <div className="p-1 pt-2">
                                        שם לקוח
                                    </div>
                                    <div className="border-1 border-[#e4e4e7] mt-1 mb-1" />
                                    <div className="p-1 pb-2">
                                        {props?.data?.cus?.name}
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="border-1 border-[#a1a1aa] w-1/4">
                                    <div className="p-1 pt-2">
                                        נטו
                                    </div>
                                    <div className="border-1 border-[#e4e4e7] mt-1 mb-1" />
                                    <div className="p-1 pb-2">
                                        {props?.data?.drag?.wight}
                                    </div>
                                </th>
                                <th className="border-1 border-[#a1a1aa]">
                                    <div className="p-1 pt-2">
                                        טרה
                                    </div>
                                    <div className="border-1 border-[#e4e4e7] mt-1 mb-1" />
                                    <div className="p-1 pb-2">
                                        {props?.data?.drag?.wight}
                                    </div>
                                </th>
                                <th className="border-1 border-[#a1a1aa]">
                                    <div className="p-1 pt-2">
                                        ברוטו
                                    </div>
                                    <div className="border-1 border-[#e4e4e7] mt-1 mb-1" />
                                    <div className="p-1 pb-2">
                                        {props?.data?.drag?.wight}
                                    </div>
                                </th>
                                <th className="border-1 border-[#a1a1aa] w-1/4">
                                    <div>
                                        השקילות בק"ג
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-9 flex justify-center">
                    מפעיל : חאלד חטיב
                </div>
                <div className="mt-24">
                    <div className="flex justify-between mr-5 ml-5">
                        <div dir="rtl">
                            חתימת הנהג : _______________________
                        </div>
                        <div className="hatema">
                            <div>
                                ח.ח גרוטאות הואדי
                            </div>
                            <div>
                                ח'טיב חאלד
                            </div>
                            <div>
                                309825941
                            </div>
                        </div>
                        <div dir="rtl">
                            חתימת המפעיל : _______________________
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-xs p-10">
                <div className="flex justify-center">
                    <div className="items-center">
                        <div className="text-center mb-2 font-black hebrow_font">מדינת ישראל</div>
                        <div className="flex justify-center mb-3"><div className="w-20"><ImageTwo /></div></div>
                        <div className="text-center font-black hebrow_font">משרד התחבורה והבטיחות בדרכים</div>
                    </div>
                </div>
                <div className="absoulte_date_page_four">
                    {props?.data?.drag?.daterecord}
                </div>
                <div className="absoulte_date_page_four1">
                    {props?.data?.cus?.name}
                </div>
                <div className="flex justify-start mt-3">
                    ______________________________ : תאריך
                </div>
                <div className="flex justify-start mt-3">
                    ______________________________ : שם בעל הרכב
                </div>
                <div className="flex justify-start mt-3">
                    ______________________________ : מנכ"ל החברה
                </div>
                <div className="flex justify-center mt-12 items-center">
                    <div className="font-black text-sm hebrow_font border-b-1 border-b-black">
                        נספח לבקשה לרישום ראשוני או לשינוי מבנה הרכב - תוצאות שקילה
                    </div>
                    <div>
                        &nbsp; : הנלון
                    </div>
                </div>
                <div dir="rtl" className="mt-7">
                    <div className="mb-3 font-black text-sm hebrow_font">
                        1. פרטי הרכב
                    </div>
                    <div className="flex">
                        <div className="absoulte_date_page_four5">
                            {props?.data?.drag?.prodction}
                        </div>
                        <div>
                            תוצר : _______________________
                        </div>
                        <div className="absoulte_date_page_four7">
                            {props?.data?.drag?.chassisnum}
                        </div>
                        <div className="mr-2">
                            מספר שילדה : _______________________
                        </div>
                    </div>
                    <div className="flex mt-1">
                        <div className="absoulte_date_page_four6">
                            {props?.data?.drag?.model}
                        </div>
                        <div>
                            דגם : _______________________
                        </div>
                        <div className="absoulte_date_page_four7">
                            {props?.data?.drag?.licenseid}
                        </div>
                        <div className="mr-2">
                            מספר רישוי : _______________________
                        </div>
                    </div>
                </div>
                <div dir="rtl" className="mt-7">
                    <div className="mb-3 font-black text-sm hebrow_font">
                        2. פרוט ו/או התוספות ברכב (מעבר למפרט המקורי של יצרן הרכב)
                    </div>
                    <div>
                        _________________________________________________________________________________________
                    </div>
                    <div className="mt-2">
                        _________________________________________________________________________________________
                    </div>
                    <div className="mt-2">
                        _________________________________________________________________________________________
                    </div>
                </div>
                <div className="mt-7" dir="rtl">
                    שם המעבדה המוסמכת בארץ בה בוצעה הבדיקה : ____________________________________________________________
                </div>
                <div className="mt-2" dir="rtl">
                    מספר תעודות הבדיקה : _______________________________________________________________________________________
                </div>
                <div dir="rtl" className="mt-7">
                    <div className="mb-3 font-black text-sm hebrow_font">
                        הערות :
                    </div>
                    <div className="mb-1">
                        - במידה ולא בוצעו שינויים ו/או תוספות יש לכתוב "אין"
                    </div>
                    <div>
                        - במידה ולא בוצעה בדיקה, יש לכתוב "אין"
                    </div>
                </div>
                <div dir="rtl" className="mt-7">
                    <div className="mb-3 font-black text-sm hebrow_font">
                        3. תנאים ותוצאות שקילה
                    </div>
                    <div>
                        השקילה בוצעה במכון המאושר והנמצא בפיקוח של משרד המסחר והתעשייה, כאשר הרכב כולל את כל
                    </div>
                    <div>
                        אביזרי הרכב, מלאים של : דלק, מים ושמן
                    </div>
                    <div className="mt-1" dir="rtl">
                        שם מכון השקילה : ________________________________&nbsp;&nbsp;&nbsp;כתובת : ________________________________
                    </div>
                </div>
                <div dir="rtl" className="mt-7">
                    <div className="mb-3 font-black text-sm hebrow_font">
                        תוצאות השקילה :
                    </div>
                    <div>
                        א. סרן/ים קדמ/ים : _________________________________&nbsp;&nbsp;&nbsp;(ק"מ)&nbsp;&nbsp;&nbsp;ב. סרן/ים אחורי/ים : _________________________________&nbsp;&nbsp;&nbsp;(ק"מ)
                    </div>
                    <div className="absoulte_date_page_four2">
                        {props?.data?.drag?.wight}
                    </div>
                    <div className="mt-5">
                        ג. משקל כללי : &nbsp;&nbsp;רצ"ב תעודות שקילה של מכון השקילה ________________________________________
                    </div>
                    <div className="mt-1">
                        הנני מצהיר כי כל הפרטים המפורטים מעלה הינם מלאים ונכונים.
                    </div>
                </div>
                <div dir="rtl" className="mt-16">
                    <div className="flex justify-around">
                        <div>
                            <div className="absoulte_date_page_four3">
                                {props?.data?.cus?.name}
                            </div>
                            <div>_________________________</div>
                            <div className="flex justify-center">שם בעל הרכב/מנכ"ל החברה</div>
                        </div>
                        <div>
                            <div className="absoulte_date_page_four4">
                                {props?.data?.cus?.cusid}
                            </div>
                            <div>_________________________</div>
                            <div className="flex justify-center">ת.ז.</div>
                        </div>
                        <div>
                            <div>_________________________</div>
                            <div className="flex justify-center">חתימה</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="pr-10 pl-10 pt-10 smalling_font_pages1">
                    <ImageFive />
                    <div className="flex justify-around w-full">
                        <div className="w-1/2 flex justify-center">
                            <div className="w-full">
                                <div className="text-xs font-black hebrow_font">&nbsp;</div>
                                <table className="w-full mb-2">
                                    <tbody>
                                        <tr>
                                            <th className="border-1 border-black w-56">{format(new Date(), 'dd-MM-yyyy')}</th>
                                            <th className="border-1 border-black w-56 text-right pr-2">תאריך יצור</th>
                                            <th className="border-1 border-black w-14">1.9</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.masTaodatABTebos}</th>
                                            <th className="border-1 border-black text-right pr-2">מס' תעודת אב טיפוס</th>
                                            <th className="border-1 border-black w-14">1.10</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.tableokefTaodatABTebos}</th>
                                            <th className="border-1 border-black text-right pr-2">תוקף תעודת אב טיפוס</th>
                                            <th className="border-1 border-black w-14">1.11</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.labid}</th>
                                            <th className="border-1 border-black text-right pr-2">זהות מעבדה</th>
                                            <th className="border-1 border-black w-14">1.12</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.masVTokefResheonYatsran}</th>
                                            <th className="border-1 border-black text-right pr-2">מס' ותוקף רישיון יצרן</th>
                                            <th className="border-1 border-black w-14">1.13</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">6751</th>
                                            <th className="border-1 border-black text-right pr-2">מס' אישור יצרן</th>
                                            <th className="border-1 border-black w-14">1.14</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.masGlglemSrnem}</th>
                                            <th className="border-1 border-black text-right pr-2">מס' גלגלים / סרנים</th>
                                            <th className="border-1 border-black w-14">1.15</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.medatTsmgem}</th>
                                            <th className="border-1 border-black text-right pr-2">מידת צמגים</th>
                                            <th className="border-1 border-black w-14">1.16</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="text-xs font-black hebrow_font">&nbsp;</div>
                                <table className="w-full mb-2">
                                    <tbody>
                                        <tr>
                                            <th className="border-1 border-black w-56">{props?.data?.drag?.bodymodel}</th>
                                            <th className="border-1 border-black w-56 text-right pr-2">דגם מרכב</th>
                                            <th className="border-1 border-black w-14">2.3</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.undercarriage}</th>
                                            <th className="border-1 border-black text-right pr-2">מס"ד מרכב</th>
                                            <th className="border-1 border-black w-14">2.4</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="text-xs font-black hebrow_font">&nbsp;</div>
                                <table className="w-full mb-2">
                                    <tbody>
                                        <tr>
                                            <th className="border-1 border-black w-56">{props?.data?.drag?.selfweightaxles}</th>
                                            <th className="border-1 border-black w-56 text-right pr-2">משקל עצמי על הסרנים</th>
                                            <th className="border-1 border-black w-14">3.6</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.totalselfweight}</th>
                                            <th className="border-1 border-black text-right pr-2">משקל עצמי כולל</th>
                                            <th className="border-1 border-black w-14">3.7</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.authorizedweight}</th>
                                            <th className="border-1 border-black text-right pr-2">משקל מורשה</th>
                                            <th className="border-1 border-black w-14">3.8</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.distributionloads}</th>
                                            <th className="border-1 border-black text-right pr-2">חלוקת העומסים</th>
                                            <th className="border-1 border-black w-14">3.9</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black text-right pr-2">&nbsp;</th>
                                            <th className="border-1 border-black w-14">&nbsp;</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="text-xs font-black hebrow_font">&nbsp;</div>
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th className="border-1 border-black w-56">&nbsp;</th>
                                            <th className="border-1 border-black w-56 text-right pr-2">גובה כף ריתום</th>
                                            <th className="border-1 border-black w-14">4.8</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black text-right pr-2">מרכז כובד מטען</th>
                                            <th className="border-1 border-black w-14">4.9</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black text-right pr-2">רוחק סרנים</th>
                                            <th className="border-1 border-black w-14">4.10</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black text-right pr-2">מרחק בין סרנים</th>
                                            <th className="border-1 border-black w-14">4.11</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black w-14">&nbsp;</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black w-14">&nbsp;</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black w-14">&nbsp;</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="m-5" />
                        <div className="w-1/2 flex justify-center">
                            <div className="w-full">
                                <div dir="rtl" className="text-xs font-black underline hebrow_font">1. פרטי כלי רכב (שלב 1)</div>
                                <table className="w-full mb-2">
                                    <tbody>
                                        <tr>
                                            <th className="border-1 border-black w-56">{props?.data?.drag?.licenseid}</th>
                                            <th className="border-1 border-black w-56 text-right pr-2">מספר רישוי</th>
                                            <th className="border-1 border-black w-14">1.1</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.chassisnum}</th>
                                            <th className="border-1 border-black text-right pr-2">מספר שלדה</th>
                                            <th className="border-1 border-black w-14">1.2</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">נגררי עירון שיווק 2020 בע"מ</th>
                                            <th className="border-1 border-black text-right pr-2">תוצר</th>
                                            <th className="border-1 border-black w-14">1.3</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.model}</th>
                                            <th className="border-1 border-black text-right pr-2">קוד דגם</th>
                                            <th className="border-1 border-black w-14">1.4</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.categore}</th>
                                            <th className="border-1 border-black text-right pr-2">קטגוריה</th>
                                            <th className="border-1 border-black w-14">1.5</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.color}</th>
                                            <th className="border-1 border-black text-right pr-2">צבע</th>
                                            <th className="border-1 border-black w-14">1.6</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.kinddrag}</th>
                                            <th className="border-1 border-black text-right pr-2">סוג הרכב</th>
                                            <th className="border-1 border-black w-14">1.7</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black text-right pr-2">סוג תקינה</th>
                                            <th className="border-1 border-black w-14">1.8</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <div dir="rtl" className="text-xs font-black underline hebrow_font">2. פרטי מרכב</div>
                                <table className="w-full mb-2">
                                    <tbody>
                                        <tr>
                                            <th className="border-1 border-black w-56">נגררי עירון שיווק 2020 בע"מ</th>
                                            <th className="border-1 border-black w-56 text-right pr-2">יצרן</th>
                                            <th className="border-1 border-black w-14">2.1</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.bodytype}</th>
                                            <th className="border-1 border-black text-right pr-2">סוג מרכב</th>
                                            <th className="border-1 border-black w-14">2.2</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <div dir="rtl" className="text-xs font-black underline hebrow_font">3. משקלים (ק"ג)</div>
                                <table className="w-full mb-2">
                                    <tbody>
                                        <tr>
                                            <th className="border-1 border-black w-56">&nbsp;</th>
                                            <th className="border-1 border-black w-56 text-right pr-2">עומס מרבי - כף</th>
                                            <th className="border-1 border-black w-14">3.1</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black text-right pr-2">עומס מרבי - סרן 1</th>
                                            <th className="border-1 border-black w-14">3.2</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black text-right pr-2">עומס מרבי - סרן 2</th>
                                            <th className="border-1 border-black w-14">3.3</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black text-right pr-2">עומס מרבי כולל</th>
                                            <th className="border-1 border-black w-14">3.4</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black text-right pr-2">משקל עצמי כף</th>
                                            <th className="border-1 border-black w-14">3.5</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <div dir="rtl" className="text-xs font-black underline hebrow_font">4. מידות (מ"ם)</div>
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th className="border-1 border-black w-56">{props?.data?.drag?.long}</th>
                                            <th className="border-1 border-black w-56 text-right pr-2">אורך כללי</th>
                                            <th className="border-1 border-black w-14">4.1</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.space}</th>
                                            <th className="border-1 border-black text-right pr-2">רוחב כללי</th>
                                            <th className="border-1 border-black w-14">4.2</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.height}</th>
                                            <th className="border-1 border-black text-right pr-2">גובה כללי</th>
                                            <th className="border-1 border-black w-14">4.3</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.rearextension}</th>
                                            <th className="border-1 border-black text-right pr-2">שלוחה אחורית</th>
                                            <th className="border-1 border-black w-14">4.4</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.lengthhatch}</th>
                                            <th className="border-1 border-black text-right pr-2">אורך יצול</th>
                                            <th className="border-1 border-black w-14">4.5</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.heightloading}</th>
                                            <th className="border-1 border-black text-right pr-2">גובה משטח העמסה</th>
                                            <th className="border-1 border-black w-14">4.6</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.sizeloading}</th>
                                            <th className="border-1 border-black text-right pr-2">גובה משטח העמסה (מ"ר)</th>
                                            <th className="border-1 border-black w-14">4.7</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div dir="rtl" className="text-xs font-black underline hebrow_font">5. התקנים נוספים</div>
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <th className="border-1 border-black w-24">זהות מעבדה</th>
                                    <th className="border-1 border-black w-24">דו"ח מעבדה</th>
                                    <th className="border-1 border-black w-24">זהות סוקר</th>
                                    <th className="border-1 border-black w-24">תסקיר בטיחות</th>
                                    <th className="border-1 border-black w-24">מס"ד</th>
                                    <th className="border-1 border-black w-24">שם היצרן</th>
                                    <th className="border-1 border-black w-24">שם המתקין</th>
                                    <th className="border-1 border-black w-24">התקן</th>
                                    <th className="border-1 border-black w-11">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-black">{props?.data?.drag?.labid}</th>
                                    <th className="border-1 border-black">{props?.data?.drag?.labreport}</th>
                                    <th className="border-1 border-black">{props?.data?.drag?.reviewerid}</th>
                                    <th className="border-1 border-black">{props?.data?.drag?.safetyreview}</th>
                                    <th className="border-1 border-black">{props?.data?.drag?.foundation}</th>
                                    <th className="border-1 border-black text-[6.5px]">נגררי עירון שיווק 2020 בע"מ</th>
                                    <th className="border-1 border-black">{props?.data?.drag?.installer}</th>
                                    <th className="border-1 border-black">{props?.data?.drag?.device}</th>
                                    <th className="border-1 border-black w-11">5.1</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-black">&nbsp;</th>
                                    <th className="border-1 border-black">&nbsp;</th>
                                    <th className="border-1 border-black">&nbsp;</th>
                                    <th className="border-1 border-black">&nbsp;</th>
                                    <th className="border-1 border-black">&nbsp;</th>
                                    <th className="border-1 border-black">&nbsp;</th>
                                    <th className="border-1 border-black">&nbsp;</th>
                                    <th className="border-1 border-black">&nbsp;</th>
                                    <th className="border-1 border-black w-11">5.2</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-2 flex justify-around w-full">
                        <div className="w-1/2 flex justify-center">
                            <div className="w-full">
                                <div dir="rtl" className="text-xs font-black hebrow_font">&nbsp;</div>
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black w-14">6.6</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black w-14">6.7</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">&nbsp;</th>
                                            <th className="border-1 border-black w-14">6.8</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="m-5" />
                        <div className="w-1/2 flex justify-center">
                            <div className="w-full">
                                <div dir="rtl" className="text-xs font-black underline hebrow_font">6. תנאים ומגבלות להוספה</div>
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.sheshAehad}</th>
                                            <th className="border-1 border-black w-14">6.1</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.sheshShtaeem}</th>
                                            <th className="border-1 border-black w-14">6.2</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.sheshShlosh}</th>
                                            <th className="border-1 border-black w-14">6.3</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.sheshArbaa}</th>
                                            <th className="border-1 border-black w-14">6.4</th>
                                        </tr>
                                        <tr>
                                            <th className="border-1 border-black">{props?.data?.drag?.sheshHamesh}</th>
                                            <th className="border-1 border-black w-14">6.5</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-2">
                        <div dir="rtl" className="text-xs font-black underline hebrow_font">7. הערות</div>
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <th className="border-1 border-black">&nbsp;</th>
                                    <th className="border-1 border-black w-14">7.1</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-black">&nbsp;</th>
                                    <th className="border-1 border-black w-14">7.2</th>
                                </tr>
                                <tr>
                                    <th className="border-1 border-black">&nbsp;</th>
                                    <th className="border-1 border-black w-14">7.3</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <ImageFour />
                </div>
                <div className="">
                    <ImageThree />
                </div>
            </div>
            <div className="p-10">
                <div className="Tarekh_Hnfkat_Hreshion">
1
                </div>
                <div className="Tokef_Yfog_Beom">
12
                </div>
                <div className="Shem_Hmnhel_Hmektsoae flex w-[150px]">
                    {props?.data?.cus?.name} {props?.data?.cus?.lastname}
                </div>
                <div className="Taodat_Zhot">
                    {props?.data?.cus?.cusid}
                </div>
                <div className="skhommm">
                    {props?.data?.drag?.skhom}
                </div>
                <ImageSix/>
            </div>
        </div>
    )
})


// 
// 