import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CpuService {

  public cpuMemory: number[] = new Array(0xFFFFF);

  constructor() {
    this.cpuMemory.fill(0, 0, this.cpuMemory.length);
  }

  public getNextInstruction(): boolean
  {
    return true;
  }

}
