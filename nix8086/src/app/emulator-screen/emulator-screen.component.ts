import { Component, OnInit, SimpleChanges, NgZone} from '@angular/core';
import {FilereaderService, ScreenCellType} from '../filereader.service'
import { waitUntil, WAIT_FOREVER } from 'async-wait-until';
import { CpuService, setDiskImage, diskImageAcquired} from '../cpu.service';
import {jsPlumb} from 'jsplumb';


const sleep = (ms:any) => {new Promise(r => setTimeout(r, ms))};

export var emulatorStatus = {currentStatus: false};

export async function emulatorTurnOn()
{
  await waitUntil(() => {return diskImageAcquired() == true;}, {timeout: WAIT_FOREVER, intervalBetweenAttempts: 100}); 
  console.log(diskImageAcquired() == true); 
  emulatorStatus.currentStatus = true;
  return emulatorStatus.currentStatus;
}

export function emulatorTurnOff(): void
{
  emulatorStatus.currentStatus = false;
}

@Component({
  selector: 'emulator-screen',
  templateUrl: './emulator-screen.component.html',
  styleUrls: ['./emulator-screen.component.css']
})


export class EmulatorScreenComponent implements OnInit {

  public ScreenCell: ScreenCellType[] = [];
  public ScreenColors: string[] = ["black", "blue", "green", "cyan", "red", "magenta", "brown", "lightgray", "darkgray", "lightblue", "lightgreen", "lightcyan", "lightcoral", "#FF77FF", "yellow", "white"];
  private EmulatorCpu: CpuService;

  public screenCellReturn(aha:EmulatorScreenComponent): ScreenCellType[]
  {
    return aha.ScreenCell;
  }

  public getEmulatorState(): boolean
  {
    return emulatorStatus.currentStatus;
  }

  private getRandomInt(max_value: number): number
  {
    return Math.floor(Math.random() * max_value);
  }

  nixZone: NgZone;

  private async emulatorLoop(EmulatorCpu: CpuService, MemoryObject: ScreenCellType[])
  {
    while(await emulatorTurnOn() != true);
    EmulatorCpu.getNextInstruction();
    MemoryObject[0].backgroundColor = 0;
  }
  

  constructor(EmulatorCpu: CpuService, nixZone: NgZone){
    this.nixZone = nixZone;
    this.EmulatorCpu = EmulatorCpu;
    console.log(this.EmulatorCpu);
    for(let i = 0; i < 25 * 80; i++)
    {
      let tmp = this.getRandomInt(15);
      let omg: ScreenCellType = {frontColor: tmp, backgroundColor: tmp, character: tmp}
      this.ScreenCell.push(omg);
      this.ScreenCell[i].frontColor = tmp;
      this.ScreenCell[i].backgroundColor= tmp;
      this.ScreenCell[i].character = tmp;
    }
  }


  ngOnInit(): void {
    let FileReader = new FilereaderService(this.emulatorLoop, this.EmulatorCpu, );

  }

};
