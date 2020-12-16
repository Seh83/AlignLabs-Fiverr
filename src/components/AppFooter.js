import React from 'react';

function AppFooter() {
    let style = {
        textAlign: "center",
        zindex: 9,
        width: 100,
        height: 200,
    };
    return (
        <footer style={style}>
          Browsers will throw an error if the page is loaded from insecure origin. I.e. Use https. 
          Browsers will throw an error if the page is loaded from insecure origin. I.e. Use https.            
        </footer>
    )
}

export default AppFooter;