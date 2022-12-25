import { Component, OnInit } from '@angular/core';
import {CpuService} from '../cpu.service'
import {FilereaderService} from '../filereader.service'

interface ScreenCellType 
{
  FrontColor: number;
  BackgroundColor: number;
  Character: number;
};

export var emulatorStatus = {currentStatus: false};

export function emulatorTurnOn(): void
{
  emulatorStatus.currentStatus = true;
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
  public getEmulatorState(): boolean
  {
    return emulatorStatus.currentStatus;
  }

  private getRandomInt(max_value: number): number
  {
    return Math.floor(Math.random() * max_value);
  }

  constructor(public FileReader: FilereaderService, public cpu: CpuService) { 

    for(let i = 0; i < 25 * 80; i++)
    {
      let tmp = this.getRandomInt(15);
      let omg: ScreenCellType = {FrontColor: tmp, BackgroundColor: tmp, Character: tmp}
      this.ScreenCell.push(omg);
      this.ScreenCell[i].FrontColor = tmp;
      this.ScreenCell[i].BackgroundColor= tmp;
      this.ScreenCell[i].Character = tmp;
    }
    // let EmulatorScreen = document.getElementsByTagName('emulator-screen')[0];
    // for(let i:number = 0; i < 25; i++)
    // {
    //     for(let j:number = 0; j < 80; j++)
    //     {
    //         const new_div = document.createElement('div');
    //         new_div.setAttribute('class', 'ScreenCell');
    //         document.body.appendChild(new_div);
    //     }
    // }

    // let ScreenCell = document.getElementsByClassName('ScreenCell') as unknown as HTMLCollectionOf<HTMLElement>;

    // for(let i = 0; i < ScreenCell.length; i++)
    // {
    //     ScreenCell[i].style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    // }
    

  }


  ngOnInit(): void {
  }

};
