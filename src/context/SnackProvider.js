import React from "react";
import { SnackbarProvider } from "notistack";

const SnackProvider = ({ children }) => {
    const snackbarStyle = {
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "1.5",
    };

    return (
        <SnackbarProvider
            maxSnack={3} // Adjust the maximum number of displayed snackbar messages
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={2000}
            style={snackbarStyle} // Apply the custom style
        >
            {children}
        </SnackbarProvider>
    );
};

export default SnackProvider;
