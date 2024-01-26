import React from "react";

export const PageThree = React.forwardRef((props,ref) => {
    return(
        <div ref={ref} className="bg-white rotate_page">
            <div className="margning_rotate_page" dir="rtl">
                <table className="fulling_rotate_page">
                    <tbody>
                        <tr>
                            <th colSpan={4} className="border-1 border-[#a1a1aa] p-3">מסכי חובה בתיק גרור חדש</th>
                        </tr>
                        <tr>
                            <th colSpan={3} className="border-1 border-[#a1a1aa] p-3">מספר גרור : {'מספר'}</th>
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
    )
}) 