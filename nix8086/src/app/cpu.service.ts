import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { instructionPointer, CurrentOpcode, Opcodes, Registers, SegmentRegisters, modMemory1Options, cpuMemory} from './opcode';

const SECTOR_SIZE = 512;
const BOOTSECTOR_MEMORY_SPACE = 0x7c00;
const BOOTSECTOR = 0;
const VGA_HEIGHT = 25;
const VGA_WIDTH = 80;
const VGA_MEMORY_SPACE = 0xb8000;


var diskImage: any = undefined;

export function setDiskImage(givenBuffer: Uint8Array): void
{
  diskImage = givenBuffer;
  cpuMemory.fill(0, 0xFFFFF, 0);
  for(let i = 0; i < SECTOR_SIZE; i++)
    cpuMemory[BOOTSECTOR_MEMORY_SPACE + i] = diskImage[i];
}

export function diskImageAcquired(): boolean
{
  return diskImage != undefined;
}


@Injectable({
  providedIn: 'root'
})
export class CpuService {

  
  constructor(){
  }

  private checkRegistersValues(): void
  {
    for(let i = 0; i < Registers.length; i++)
    {
      while(Registers[i] > 0xFFFFF)
      {
        Registers[i] -= 0xFFFFF;
      } 
    }

    for(let i = 0; i < SegmentRegisters.length; i++)
    {
      while(SegmentRegisters[i] > 0xFFFFF)
      {
        SegmentRegisters[i] -= 0xFFFFF;
      }
    }
  }

  private printRegisters(): void
  {
    console.log('Registers: ' + Registers);
  }

  private printMemory(addr: number): void
  {
    console.log('CpuMemory: ', addr);
    for(let i = 0; i < 16; i++)
      console.log(cpuMemory[addr + i]);
  }

  private setCurrentOpcode(): void
  {
    CurrentOpcode.byte1.opcode = cpuMemory[instructionPointer];
    CurrentOpcode.byte1.d = (cpuMemory[instructionPointer] & 0x2) >> 1;
    CurrentOpcode.byte1.w = cpuMemory[instructionPointer] & 0x1;
    CurrentOpcode.byte1.reg = cpuMemory[instructionPointer] & 0x7;
    CurrentOpcode.byte1.value = (cpuMemory[instructionPointer])

    CurrentOpcode.byte2.value = cpuMemory[instructionPointer+1];
    CurrentOpcode.byte2.mod = (cpuMemory[instructionPointer+1] & 0xC0) >> 6;
    CurrentOpcode.byte2.reg = (cpuMemory[instructionPointer+1] & 0x38) >> 3;
    CurrentOpcode.byte2.rm = cpuMemory[instructionPointer+1] & 0x7;
    CurrentOpcode.byte2.sreg = (cpuMemory[instructionPointer+1] & 0x18) >> 3;
    CurrentOpcode.byte2.opcode = (cpuMemory[instructionPointer+1] & 0x38) >> 3;

    if(!CurrentOpcode.byte1.w)
    {
      if(CurrentOpcode.byte2.reg >= 4)      
        CurrentOpcode.byte2.reg -= 4

      if(CurrentOpcode.byte1.reg >= 4)      
        CurrentOpcode.byte1.reg -= 4

    }


    switch(CurrentOpcode.byte2.mod)
    {
      case 0:
      {
        if(CurrentOpcode.byte1.d)
        {
          CurrentOpcode.dest = CurrentOpcode.byte2.reg;
          CurrentOpcode.src = modMemory1Options[CurrentOpcode.byte2.rm]();
        }

        else
        {
          CurrentOpcode.dest = modMemory1Options[CurrentOpcode.byte2.rm]();
          CurrentOpcode.src = CurrentOpcode.byte2.reg;
        }
        break
      }

      // case 1:
      // {
      //   if(CurrentOpcode.byte1.d)
      //   {
      //     CurrentOpcode.dest = CurrentOpcode.byte2.reg;
      //     CurrentOpcode.src = CurrentOpcode.byte2.rm;
      //   }

      //   else
      //   {
      //     CurrentOpcode.dest = CurrentOpcode.byte2.rm;
      //     CurrentOpcode.src = CurrentOpcode.byte2.reg;
      //   }
      //   break
      // }

      // case 2:
      // {
      //   if(CurrentOpcode.byte1.d)
      //   {
      //     CurrentOpcode.dest = CurrentOpcode.byte2.reg;
      //     CurrentOpcode.src = CurrentOpcode.byte2.rm;
      //   }

      //   else
      //   {
      //     CurrentOpcode.dest = CurrentOpcode.byte2.rm;
      //     CurrentOpcode.src = CurrentOpcode.byte2.reg;
      //   }
      //   break
      // }
      
      case 3:
      {
        if(CurrentOpcode.byte1.d)
        {
          CurrentOpcode.dest = CurrentOpcode.byte2.reg;
          CurrentOpcode.src = CurrentOpcode.byte2.rm;
        }

        else
        {
          CurrentOpcode.dest = CurrentOpcode.byte2.rm;
          CurrentOpcode.src = CurrentOpcode.byte2.reg;
        }
        break;
      }
    }

    CurrentOpcode.byte3 = cpuMemory[instructionPointer+2];
    CurrentOpcode.byte4 = cpuMemory[instructionPointer+3];
    CurrentOpcode.byte5 = cpuMemory[instructionPointer+4];
    CurrentOpcode.byte6 = cpuMemory[instructionPointer+5];

  }

  public getNextInstruction(): void 
  {
    this.setCurrentOpcode();
    Opcodes[cpuMemory[instructionPointer]]();
    this.checkRegistersValues();
    this.printRegisters();
    // this.printMemory(0);
  }

}
