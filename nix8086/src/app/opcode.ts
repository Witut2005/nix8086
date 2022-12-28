

interface OpcodeStructute  
{
    byte1:
    {
        value: number;
        opcode: number;
        d: number;
        w: number;
        reg: number;
    }

    byte2:
    {
        value: number;
        mod: number;
        reg: number;
        rm: number;
        sreg: number;
        opcode: number;
    }

    byte3:number;
    byte4:number;
    byte5:number;
    byte6:number;

    dest: number;
    src: number;
};

export var Registers = [1,2,3,0,5,6,7,8];
export var SegmentRegisters = [0,0,0,0];

const ax = 0;
const dx = 1;
const cx = 2;
const bx = 3;
const sp = 4;
const bp = 5;
const si = 6;
const di = 7;

export var cpuMemory = new Uint8Array(0xFFFFF);
export var instructionPointer: number = 0x7C00;

export var CurrentOpcode: OpcodeStructute = {
    byte1: {
        value:0,
        opcode:0,
        d:0,
        w:0,
        reg:0
    },
    byte2: {
        value: 0,
        mod:0,
        reg: 0,
        rm: 0,
        sreg: 0,
        opcode:0
    },
    byte3: 0,
    byte4: 0,
    byte5: 0,
    byte6: 0,
    src: 0,
    dest: 0
};

function bx_si()
{
    return Registers[bx] + Registers[si];
}

function bx_di()
{
    return Registers[bx] + Registers[di];
}

function bp_si()
{
    return Registers[bp] + Registers[si];
}

function bp_di()
{
    return Registers[bp] + Registers[di];
}

function si_()
{
    return Registers[si];
}

function di_()
{
    return Registers[di];
}

function directAddr()
{
    return CurrentOpcode.byte3 + (CurrentOpcode.byte4 << 8);
}

function bx_() 
{
    return Registers[bx];
}

export const modMemory1Options = [bx_si, bx_di, bp_si, bp_di, si_, di_, directAddr, bx_];


function add()
{
    switch(CurrentOpcode.byte2.mod)
    {
        
        case 0:
        {
            if(CurrentOpcode.byte1.d)
                Registers[CurrentOpcode.dest] += cpuMemory[CurrentOpcode.src];

            else
                cpuMemory[CurrentOpcode.dest] += Registers[CurrentOpcode.src];

            break;
        }

        case 1:
        {
            break;
        }

        case 2:
        {
            break;
        }

        case 3:
        {
            Registers[CurrentOpcode.dest] += Registers[CurrentOpcode.src];
        }
    }
}

function push_es()
{

}

function pop_es()
{

}

function or()
{

}

function or_ax()
{
    if(CurrentOpcode.byte1.w)
        Registers[ax] |= CurrentOpcode.byte2.value | (CurrentOpcode.byte3 << 8);

    else
        Registers[ax] |= CurrentOpcode.byte2.value;

    instructionPointer = 2 + CurrentOpcode.byte1.w;
}

function push_cs()
{

}

function unused()
{

}

function adc()
{

}

function adc_ax()
{

}

function push_ss()
{

}

function pop_ss()
{

}

export function omg()
{

}

function sbb()
{

}

function sbb_ax()
{

}

function push_ds()
{

}

function pop_ds()
{

}

function and()
{

}

function and_ax()
{

}

function es_override()
{

}

function daa()
{

}

function sub()
{

}

function sub_ax()
{

}

function cs_override()
{

}

function das()
{

}

function xor()
{

}

function xor_ax()
{

}

function ss_override()
{

}

function aaa()
{

}

function cmp()
{

}

function cmp_ax()
{
}

function ds_override()
{

}

function aas()
{

}

function incReg()
{
    Registers[CurrentOpcode.byte1.reg]++;
    instructionPointer++;
}

function decReg()
{
    Registers[CurrentOpcode.byte1.reg]--;
    instructionPointer++;
}

function pushReg()
{

}

function popReg()
{

}

function jo(){}
function jno(){}
function jb(){}
function jnb(){}
function jz(){}
function jnz(){}
function jbe(){}
function jnbe(){}
function js(){}
function jns(){}
function jp(){}
function jnp(){}
function jl(){}
function jnl(){}
function jle(){}
function jnle(){}
function opx80(){}
function opx81(){}
function opx82(){}
function opx83(){}
function test(){}
function xchg(){}
function mov(){}
function movsreg(){}
function lea(){}
function pop(){}
function xchgReg(){}
function cbw(){}
function cwd(){}
function callFar(){}
function wait(){}
function pushf(){}
function popf(){}
function sahf(){}
function lahf(){}
function movAccumulator(){}
function movs(){}
function cmps(){}
function testAccumluator(){}
function stos(){}
function lods(){}
function scas(){}
function movImmed(){}
function retnIntraSegment(){}
function retIntraSegment(){}
function les(){}
function lds(){}
function movMemoryImmed(){}
function retnInterSegment(){}
function retInterSegment(){}
function int3(){}
function int(){}
function into(){}
function iret(){}
function opxd0(){}
function opxd1(){}
function opxd2(){}
function opxd3(){}
function aam(){}
function aad(){}
function xlat(){}
function esc(){}
function loopne(){}
function loope(){}
function loop(){}
function jcxz(){}
function inImmed(){}
function outImmed(){}
function callNear(){}
function jmpNear(){}
function jmpFar(){}
function jmpShort(){}
function inDx(){}
function outDx(){}
function repne(){}
function rep(){}
function hlt(){}
function cmc(){}
function opxF6(){}
function opxF7(){}
function clc(){}
function stc(){}
function cli(){}
function sti(){}
function cld(){}
function std(){}
function opxFE(){}
function opxFF(){}

export let Opcodes = [
add, add, add, add, add, add, push_es, pop_es, or, or, 
or, or, or_ax, or_ax, push_cs, unused, adc, adc, adc, adc, 
adc_ax, adc_ax, push_ss, pop_ss, sbb, sbb, sbb, sbb, sbb_ax, sbb_ax, 
push_ds, pop_ds, and, and, and, and, and_ax, and_ax, es_override, daa, 
sub, sub, sub, sub, sub_ax, sub_ax, cs_override, das, xor, xor,
xor, xor, xor_ax, xor_ax, ss_override, aaa, cmp, cmp, cmp, cmp, 
cmp_ax, cmp_ax, ds_override, aas, incReg, incReg, incReg, incReg, incReg, incReg, 
incReg, incReg, decReg, decReg, decReg, decReg, decReg, decReg, decReg, decReg, 
pushReg, pushReg, pushReg, pushReg, pushReg, pushReg, pushReg, pushReg, 
popReg, popReg, popReg, popReg, popReg, popReg, popReg, popReg, 
unused, unused, unused, unused, unused, unused, unused, unused,
unused, unused, unused, unused, unused, unused, unused, unused,
jo, jno, jb, jnb, jz, jnz, jbe, jnbe, js, jns, jp, jnp, jl, jnl, jle, jnle,
opx80, 
omg, omg, omg, omg, 
omg, omg, omg, omg, omg, omg, omg, omg, omg, omg, 
omg, omg, omg, omg, omg, omg, omg, omg, omg, omg, 
omg, omg, omg, omg, omg, omg, omg, omg, omg, omg, 
omg, omg, omg, omg, omg, omg, omg, omg, omg, omg, 
omg, omg, omg, omg, omg, omg, omg, omg, omg, omg, 
omg, omg, omg, omg, omg, omg, omg, omg, omg, omg, 
omg, omg, omg, omg, omg, omg, omg, omg, omg, omg, 
omg, omg, omg, omg, omg, omg, omg, omg, omg, omg, 
];