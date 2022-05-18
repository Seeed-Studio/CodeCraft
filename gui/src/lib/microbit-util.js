import { getFirmwareFile, getFirmwareInfo } from './firmware-request'
const hexlify = (ar) => {
    var result = '';
    for (var i = 0; i < ar.length; ++i) {
        if (ar[i] < 16) {
            result += '0';
        }
        result += ar[i].toString(16);
    }
    return result;
}

const compileCode = (script) => {
    // add header, pad to multiple of 16 bytes
    var data = new Uint8Array(4 + script.length + (16 - (4 + script.length) % 16));
    data[0] = 77; // 'M'
    data[1] = 80; // 'P'
    data[2] = script.length & 0xff;
    data[3] = (script.length >> 8) & 0xff;
    for (var i = 0; i < script.length; ++i) {
        data[4 + i] = script.charCodeAt(i);
    }
    // TODO check data.length < 0x2000
    // convert to .hex format
    var addr = 0x3e000; // magic start address in flash
    var chunk = new Uint8Array(5 + 16);
    var output = [];
    for (var i = 0; i < data.length; i += 16, addr += 16) {
        chunk[0] = 16; // length of data section
        chunk[1] = (addr >> 8) & 0xff; // high byte of 16-bit addr
        chunk[2] = addr & 0xff; // low byte of 16-bit addr
        chunk[3] = 0; // type (data)
        for (var j = 0; j < 16; ++j) {
            chunk[4 + j] = data[i + j];
        }
        var checksum = 0;
        for (var j = 0; j < 4 + 16; ++j) {
            checksum += chunk[j];
        }
        chunk[4 + 16] = (-checksum) & 0xff;
        output.push(':' + hexlify(chunk).toUpperCase())
    }
    return output.join('\n');
}


let firmwareHex = null;
let importCodes = [];

const fetchFirmware = async () => {
    if (firmwareHex && importCodes.length > 0) {
        return {
            firmwareHex, importCodes
        }
    }
    let firmwareInfo = await getFirmwareInfo({
        type: 'microbit'
    });

    for (let fileName of firmwareInfo.fileNames) {
        let code = await getFirmwareFile({
            type: 'microbit', fileName
        });
        importCodes.push({
            fileName, code
        })
    }

    firmwareHex = await getFirmwareFile({
        type: 'microbit',
        fileName: 'microbit.hex'
    });

    return {
        firmwareHex, importCodes
    }
}

fetchFirmware();

const produceHex = async code => {
    const { firmwareHex, importCodes } = await fetchFirmware();
    for (let item of importCodes) {
        code = code.replace(`#:::${item.fileName}`, item.code);
    }
    console.log(code);
    let hexlified_python = compileCode(code);
    let insertion_point = ":::::::::::::::::::::::::::::::::::::::::::";
    return firmwareHex.replace(insertion_point, hexlified_python);
}

const producePythonCode = async code => {
    const { importCodes } = await fetchFirmware();
    for (let item of importCodes) {
        code = code.replace(`#:::${item.fileName}`, item.code);
    }
    return code;
}

export { 
    produceHex,
    producePythonCode
};