import React, { useState } from "react";
import {
    Container,
    Box,
    Button,
    Card,
    CardHeader,
    CardActions,
    TextField,
    makeStyles,
} from "@material-ui/core";
import ReactDOM from "react-dom";
import axios from "axios";

const api = axios.create({
    baseURL: "https://api.aspenclubsoftware.com/webole.asp",
    responseType: "text",
});

const useStyles = makeStyles({
    root: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        textAlign: "center",
    },
    button: {
        margin: 20,
    },
});

function App() {
    const classes = useStyles();

    const [folioId, setfolioId] = useState("00000001");
    const [Request, setRequest] = useState("x");

    const sendRequest = async () => {
      console.log('folioId ', folioId)
        let xmlBody = `<?xml version="1.0" encoding="UTF-8"?> 
<RequestMessage ElementType="FolioInv"> 
<Folino>${folioId}</Folino> 
</RequestMessage>`;
        let config = {
            headers: { "Content-Type": "text/xml" },
        };
        let res = await api.post(api.baseURL, xmlBody, config);
        setRequest(res.data);
        console.log('Request: ', res.data);
        alert(`xmlRequest for this FolioId: ${folioId}\n${res.data}`)
    };

    const handleKey = (e) => {
        let value = e.target.value.trim();
        let regexp = /^[0-9]*$/g;
        if (regexp.test(value)) {
            if (value.length < 9) {
                value = "00000000" + value;
            }
            if (value.length > 8) {
                value = value.slice(-8);
            }
        } else value = "00000000";
        setfolioId(value);
        console.log(folioId);
    };

    return (
        <Container maxWidth="sm">
            <Box>
                <Card className={classes.root}>
                    <CardHeader
                        className={classes.header}
                        title="You can get Folio PDF here"
                        subheader="Just input 8-digits number"
                    />
                    <CardActions>
                        <TextField
                            id="outlined-number"
                            label="8-digit number (required)"
                            autoFocus={true}
                            required={true}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={folioId}
                            variant="outlined"
                            onChange={(e) => handleKey(e)}
                        />
                    </CardActions>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={sendRequest}
                    >
                        Request PDF
                    </Button>
                </Card>
            </Box>
        </Container>
    );
}

export default App;
