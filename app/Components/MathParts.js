import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";

export const MathParts = (val) => {
    if(true){

    }
    return;
} 


export const MathX1 = (aorkh,rohf,remez) => {
    let integerAorkh = parseInt(aorkh);
    let integerRohf = parseInt(rohf);
    if (remez === 'B7') {
        return (integerAorkh * 2) + integerRohf;
    }
    else if(remez === 'B1'){
        return 123;
    }
    else if(remez === 'B2'){
        return integerRohf;
    }
    else if(remez === 'F3'){
        return 8;
    }
    else if(remez === 'F4'){
        return 2;
    }
    else if(remez === 'F5'){
        return 2;
    }
    else if(remez === 'F6'){
        return 2;
    }
    else if(remez === 'F7'){
        return 2;
    }
    else if(remez === 'E1'){
        return 2;
    }
    else if(remez === 'E2'){
        return 1;
    }
    else if(remez === 'E3'){
        return 2;
    }
    else if(remez === 'E4'){
        return 1;
    }
    else if(remez === 'C1'){
        return 1;
    }
    else if(remez === 'C2'){
        return 1;
    }
    else if(remez === 'C3'){
        return 1;
    }
    else if(remez === 'C4'){
        return 1;
    }
    else if(remez === 'C5'){
        return 1;
    }
    else if(remez === 'C6'){
        return 1;
    }
    else if(remez === 'C7'){
        return 1;
    }
    else if(remez === 'C8'){
        return 1;
    }
    else if(remez === 'C10'){
        return 1;
    }
    else if(remez === 'C11'){
        return 1;
    }
    else if(remez === 'G1'){
        return 1;
    }
    else if(remez === 'G2'){
        return 1;
    }
    else if(remez === 'G3'){
        return 1;
    }
    else if(remez === 'G4'){
        return 1;
    }
    else if(remez === 'G5'){
        return 1;
    }
    else if(remez === 'G6'){
        return 1;
    }
}

export const MathX3 = (msbartsrem,remez) => {
    let intMsbarTsrem = parseInt(msbartsrem);
    if(intMsbarTsrem === 1){
        if(remez === 'A1'){
            return 2;
        }
        else if(remez === 'A10'){
            return 21;
        }
        else if(remez === 'A3'){
            return 2;
        }
    }
    else if(intMsbarTsrem === 2){
        if(remez === 'A2'){
            return 2;
        }
        else if(remez === 'A10'){
            return 2;
        }
        else if(remez === 'A3'){
            return 4;
        }
    }
}
