import { useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const BarcodeScanner = () => {
  const [scannedData, setScannedData] = useState('No result');
  const [isScanning, setIsScanning] = useState(false);
  const html5QrCodeRef = useRef(null);

  const startScanning = () => {
    const html5QrCode = new Html5Qrcode('reader');
    html5QrCodeRef.current = html5QrCode;
    const qrCodeSuccessCallback = (decodedText) => {
      setScannedData(decodedText);
      stopScanning(); // 偵測到一次條碼後自動停止掃描
    };
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode
      .start({ facingMode: 'environment' }, config, qrCodeSuccessCallback)
      .then(() => {
        setIsScanning(true);
      })
      .catch((err) => {
        console.error('Failed to start html5QrCode', err);
      });
  };

  const stopScanning = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current
        .stop()
        .then(() => {
          html5QrCodeRef.current.clear();
          setIsScanning(false);
        })
        .catch((err) => {
          console.error('Failed to stop html5QrCode', err);
        });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Barcode Scanner</h1>
      <div id="reader" style={{ width: '500px', height: '500px', display: isScanning ? 'block' : 'none' }}></div>
      <button className='bg-slate-400 p-4 rounded-md hover:text-white' onClick={isScanning ? stopScanning : startScanning} style={{ marginTop: '20px' }}>
        {isScanning ? 'Stop Scanning' : 'Start Scanning'}
      </button>
      <p style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold' }}>{scannedData}</p>
    </div>
  );
};

export default BarcodeScanner;
