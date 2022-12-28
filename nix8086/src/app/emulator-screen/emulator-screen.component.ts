import { Component, OnInit, SimpleChanges, NgZone} from '@angular/core';
import {FilereaderService} from '../filereader.service'
import { waitUntil, WAIT_FOREVER } from 'async-wait-until';
import { CpuService, setDiskImage, diskImageAcquired} from '../cpu.service';
interface ScreenCellType 
{
  frontColor: number;
  backgroundColor: number;
  character: number;
};
const sleep = (ms:any) => {new Promise(r => setTimeout(r, ms))};

export var emulatorStatus = {currentStatus: false};

export function emulatorTurnOn(): void
{
  // await waitUntil(() => {return diskImageAcquired() == true;}, {timeout: WAIT_FOREVER, intervalBetweenAttempts: 100}); 
  // console.log(diskImageAcquired() == true); 
  emulatorStatus.currentStatus = true;
  // return emulatorStatus.currentStatus;
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

  public ScreenCell: ScreenCellType[] = []
  public ScreenColors: string[] = ["black", "blue", "green", "cyan", "red", "magenta", "brown", "lightgray", "darkgray", "lightblue", "lightgreen", "lightcyan", "lightcoral", "#FF77FF", "yellow", "white"];
  private EmulatorCpu: CpuService;

  public getEmulatorState(): boolean
  {
    return emulatorStatus.currentStatus;
  }

  private getRandomInt(max_value: number): number
  {
    return Math.floor(Math.random() * max_value);
  }

  nixZone: NgZone;

  private async emulatorLoop(EmulatorCpu: CpuService, zone: NgZone)
  {
    
    // for(let i = 0; i < 5; i++)
    while(true)
    {
      zone.runOutsideAngular(()=>{EmulatorCpu.getNextInstruction()});
    }
  }
  

  constructor(EmulatorCpu: CpuService, nixZone: NgZone){
    this.nixZone = nixZone;
    this.EmulatorCpu= EmulatorCpu;
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
    emulatorTurnOn();
  }


  ngOnInit(): void {
    let FileReader = new FilereaderService(this.EmulatorCpu, this.emulatorLoop, this.nixZone);
  }

};
