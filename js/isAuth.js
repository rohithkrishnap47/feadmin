        const accessToken = localStorage.getItem('admin-token');
        if (!accessToken) {
            window.location.href = '/adminlogin.html'; 
        } else {
            console.log('Access token:', accessToken);
        }