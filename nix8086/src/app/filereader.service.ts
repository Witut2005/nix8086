import { Injectable, NgZone, InjectionToken } from '@angular/core';
import { CpuService, setDiskImage, diskImageAcquired} from './cpu.service';


async function getValue(myPromise: Promise<any>): Promise<any>
{
  let value = await myPromise as ArrayBuffer;
  value = new Uint8Array(value);
  return value;
}

@Injectable({
  providedIn: 'root'
})

export class FilereaderService {


  constructor(givenFunction: Function, param: CpuService, param1: ScreenCellType){
    const fileSelector = document.getElementById('file-select');
    fileSelector!.addEventListener('change', async (event) => {
        const fileList = (event!.target as HTMLInputElement)!.files;
        let tmp = (fileList as FileList)[0].arrayBuffer();
        setDiskImage(await getValue(tmp));
        const FilePicker = document.getElementById('file-select');
        FilePicker!.style.display = 'none';
        setInterval(() => {givenFunction(param, param1);}, 500);
    });
  }
}
export interface ScreenCellType 
{
  frontColor: number;
  backgroundColor: number;
  character: number;
};

