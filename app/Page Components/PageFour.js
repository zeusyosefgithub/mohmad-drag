import React from "react";
import ImageOne from "./imageOne";
import ImageTwo from "./imageTwo";

export const PageFour = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="bg-white p-10 text-xs">
            <div className="flex justify-center">
                <div className="items-center">
                    <div className="text-center mb-2 font-black hebrow_font">מדינת ישראל</div>
                    <div className="flex justify-center mb-3"><div className="w-20"><ImageTwo /></div></div>
                    <div className="text-center font-black hebrow_font">משרד התחבורה והבטיחות בדרכים</div>
                </div>
            </div>
            <div className="absoulte_date_page_four">
                {'213123'}
            </div>
            <div className="absoulte_date_page_four1">
                {'213123'}
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
                    <div>
                        תוצר : _______________________
                    </div>
                    <div className="mr-2">
                        מספר שילדה : _______________________
                    </div>
                </div>
                <div className="flex mt-1">
                <div>
                        דגם : _______________________
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
                    ________________________________________________________________________________________________________________
                </div>
                <div className="mt-2">
                    ________________________________________________________________________________________________________________
                </div>
                <div className="mt-2">
                    ________________________________________________________________________________________________________________
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
                    {'213123'}
                </div>
                <div className="mt-5">
                    ג. משקל כללי : &nbsp;&nbsp;רצ"ב תעודות שקילה של מכון השקילה ________________________________________
                </div>
                <div className="mt-1">
                    הנני מצהיר כי כל הפרטים המפורטים מעלה הינם מלאים ונכונים.
                </div>
            </div>
            <div dir="rtl" className="mt-32">
                <div className="flex justify-around">
                    <div>
                        <div className="absoulte_date_page_four3">
                            {'213123'}
                        </div>
                        <div>_________________________________</div>
                        <div className="flex justify-center">שם בעל הרכב/מנכ"ל החברה</div>
                    </div>
                    <div>
                        <div className="absoulte_date_page_four4">
                            {props?.data?.cus.cusid}
                        </div>
                        <div>_________________________________</div>
                        <div className="flex justify-center">ת.ז.</div>
                    </div>
                    <div>
                        <div>_________________________________</div>
                        <div className="flex justify-center">חתימה</div>
                    </div>
                </div>
            </div>
        </div>
    )
}) 