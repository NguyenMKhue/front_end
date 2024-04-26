import { useState,useEffect } from "react";
import { Box,useTheme } from "@mui/material";
import { tokens } from "../../theme.tsx";
import StatBox from "../../components/StatBox"

function Device(data){
    const devices = data.data[0]
    const toggleFunction = data.data[1]
    const isOn = (devices.data.length != 0 &&  devices.data[0].value == 1)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <>
        <Box
        sx={{ width:'200px',borderRadius:'15%', margin: '15px 10px 15px 10px' }}
        backgroundColor={isOn? colors.primary[300]:colors.primary[900]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
                        <input className="form-check-input" type="checkbox" role="switch" checked={isOn}
                onChange={(e) => {
                    toggleFunction([devices.device_id,isOn?1:0])
                }}
                />
        <StatBox
          title={devices.name}
          subtitle={isOn? "On":"Off"}
          status = {isOn}
          icon=
            {devices.icon}
          
        />
      </Box>
        </>
    )
}
export default Device;