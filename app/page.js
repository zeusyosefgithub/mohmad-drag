'use client';
import React from "react";
import { Checkbox, CheckboxGroup, Input, Switch } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {

  const [long, setLong] = useState('');

    const [ladder,setLadder] = useState(false);
    const [ramba,setRamba] = useState(false);

  return (
    <div className="w-full flex p-20">
      <div className="w-1/2 bg-slate-300">
        <div className="flex justify-center">
          2
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex justify-center text-2xl font-black">
          מאפיני עגלה
        </div>
        <div dir="rtl" className="mt-10 items-center">
          <Input value={long} size="sm" onValueChange={(value) => { setLong(value) }} className="w-1/3" type="number" label="אורך" />
          <Input value={long} size="sm" onValueChange={(value) => { setLong(value) }} className="w-1/3 mt-5" type="number" label="רוחב" />
          <Input value={long} size="sm" onValueChange={(value) => { setLong(value) }} className="w-1/3 mt-5" type="number" label="צמגים" />


          <CheckboxGroup
            className="mt-5 w-1/3"
            defaultValue={["buenos-aires", "london"]}
          >
            <div className="flex w-full justify-around text-xl">
              <div>רצפה : </div>
              <Checkbox size="lg" value="iron">ברזל</Checkbox>
              <Checkbox size="lg" value="tree">עץ</Checkbox>
            </div>
          </CheckboxGroup>

          <CheckboxGroup
            className="mt-5 w-1/3"
            defaultValue={["buenos-aires", "london"]}
          >
            <div className="flex w-full justify-around text-xl">
              <div>נגרר : </div>
              <Checkbox size="lg" value="closed">סגור</Checkbox>
              <Checkbox size="lg" value="opened">בטוח</Checkbox>
            </div>
          </CheckboxGroup>

          {
            ladder && <Input value={long} size="sm" onValueChange={(value) => { setLong(value) }} className="w-1/2 mt-5" type="number" label="אורך סולם" />
          }


          <table className="mt-5 w-1/3">
            <tbody>
              <tr>
                <th className="text-right">סולם</th>
                <th><Switch value={ladder} onValueChange={(value) => { setLadder(value) }} /></th>
              </tr>
              <tr>
                <th className="text-right">רמבה</th>
                <th><Switch value={ramba} onValueChange={(value) => { setRamba(value) }} /></th>
              </tr>
              <tr>
                <th className="text-right">ארגז כלים</th>
                <th><Switch value={ramba} onValueChange={(value) => { setRamba(value) }} /></th>
              </tr>
              <tr>
                <th className="text-right">מיכל מים</th>
                <th><Switch value={ramba} onValueChange={(value) => { setRamba(value) }} /></th>
              </tr>
              <tr>
                <th className="text-right">רגל חניה אחורית</th>
                <th><Switch value={ramba} onValueChange={(value) => { setRamba(value) }} /></th>
              </tr>
              <tr>
                <th className="text-right">עגלה עם בלם</th>
                <th><Switch value={ramba} onValueChange={(value) => { setRamba(value) }} /></th>
              </tr>
            </tbody>
          </table>


        </div>
      </div>
    </div>
  );
}
