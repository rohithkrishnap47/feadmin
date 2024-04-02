        const accessToken = localStorage.getItem('admin-token');
        if (!accessToken) {
            window.location.href = 'https://furnitureemporium.shop/adminlogin.html'; 
        } else {
            console.log('Access token:', accessToken);
        }