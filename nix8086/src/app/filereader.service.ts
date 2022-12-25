import { Injectable } from '@angular/core';
import { emulatorTurnOn, emulatorStatus } from './emulator-screen/emulator-screen.component';

//@ts-ignore: Object is possibly 'null'
async function getValue(myPromise: Promise<any>, Buffer): void 
{
  let value = await myPromise as ArrayBuffer;
  value = new Uint8Array(value);
  Buffer = value;
}

@Injectable({
  providedIn: 'root'
})

export class FilereaderService {
  constructor() { 
    const fileSelector = document.getElementById('file-select');
    fileSelector!.addEventListener('change', (event) => {
        const fileList = (event!.target as HTMLInputElement)!.files;
        let tmp = (fileList as FileList)[0].arrayBuffer();
        let uga;
        getValue(tmp, {uga});
        console.log(emulatorStatus.currentStatus);
        emulatorTurnOn();
        console.log(emulatorStatus.currentStatus);
        const FilePicker = document.getElementById('file-select');
        FilePicker!.style.display = 'none';

    });
  }

}