import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette:{
        primary:{
            main:'#262254'
        },
        secondary:{
            main:'#543883'
        },
        error:{
            main: red.A400
        }
    }
})