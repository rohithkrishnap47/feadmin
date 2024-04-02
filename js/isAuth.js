        const accessToken = localStorage.getItem('admin-token');
        if (!accessToken) {
            window.location.href = 'http://127.0.0.1:5501/adminlogin.html'; 
        } else {
            console.log('Access token:', accessToken);
        }