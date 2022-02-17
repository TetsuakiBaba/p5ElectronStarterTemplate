// Arduino Sample code
// void setup() {
//     // put your setup code here, to run once:
//     Serial.begin(9600);
//   }

//   int count = 0;
//   void loop() {
//     // put your main code here, to run repeatedly:
//     Serial.write(count);
//     delay(1000);
//     count++;
//     if( count > 100 )count=0;
//   }
///////////////////////////

async function beginSerial() {
    // filters to get Arduino devices
    const filters = [
        { usbVendorId: 0x2341, usbProductId: 0x0043 },
        { usbVendorId: 0x2341, usbProductId: 0x0001 }
    ];
    try {
        const port = await navigator.serial.requestPort({ filters });
        const portInfo = port.getInfo();
        await port.open({ baudRate: 9600 });
        console.log(`vendorId: ${portInfo.usbVendorId} | productId: ${portInfo.usbProductId} `);
        while (port.readable) {
            console.log(port.readable);
            const reader = port.readable.getReader();
            try {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) {// |reader| has been canceled.
                        break;
                    }
                    // Here we get serial value(value) from your arduino .
                    gotSerialValue(value);
                }
            } catch (error) {
                // Handle |error|...
            } finally {
                reader.releaseLock();
            }
        }
    } catch (ex) {
        if (ex.name === 'NotFoundError') {
            console.log('Device NOT found');
        } else {
            console.log(ex);

        }
    }

}