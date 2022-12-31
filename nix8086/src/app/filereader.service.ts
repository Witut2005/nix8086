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


  constructor(eventToDispatch: Event){
    const fileSelector = document.getElementById('file-select');
    fileSelector!.addEventListener('change', async (event) => {
        const fileList = (event!.target as HTMLInputElement)!.files;
        let tmp = (fileList as FileList)[0].arrayBuffer();
        setDiskImage(await getValue(tmp));
        const FilePicker = document.getElementById('file-select');
        FilePicker!.style.display = 'none';
        document.body.dispatchEvent(eventToDispatch);
    });
  }
}
export interface ScreenCellType 
{
  frontColor: number;
  backgroundColor: number;
  character: string;
};

