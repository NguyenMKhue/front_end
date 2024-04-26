import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from 'react'
import { tokens } from "../../theme.tsx";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import RoomBar from '../../components/Rooms/RoomsBar'
import DevicesBar from '../../components/Devices/DevicesBar'

import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import { MenuOptions, SettingOptions } from '../../components/NavigatorOptions';
import StatBox from "../../components/StatBox";

import {getAllRoomsData,getDevicesOfRoom,toggleDevice} from '../../business/HomePageData'

const Home = () => {
    const [count, setCount] = useState(0)
    const [data, setData] = useState([])
    const [selectedRoom, setSelectedRoom] = useState("0")
    const [toggleData,setToggleData] = useState(null)
    const [devicesData, setDevicesData] = useState({signal:[],devices:[]})
    useEffect(()=>{
      const getData = async () => {
        const res = await getAllRoomsData()
        setData(res)
        setSelectedRoom(res[0].room_id)
      }
      getData()
    }, []
    )
    useEffect(()=> {
      const getData = async () => {
        const res = await getDevicesOfRoom(selectedRoom)
        if (selectedRoom != "0") setDevicesData(res);
      }
      getData()
    },[selectedRoom,count])
  
    useEffect(() => {
      const toggle = async ()=>{
        const res = await toggleDevice(toggleData[0],toggleData[1])
        if (res) {
            setTimeout(()=>{
              setCount((count+1)%2)
            },1000)    
        }
      }
      if (toggleData) {
          toggle()
      }
    },[toggleData])
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    return (
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
  
        </Box>
  
        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Welcome, Home
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  John!
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Recent Transactions
              </Typography>
            </Box>

          </Box>
          <RoomBar data={[data,selectedRoom,setSelectedRoom]}></RoomBar>
          <DevicesBar data={[devicesData.devices,setToggleData]}></DevicesBar>
          
  
          {/* ROW 2 */}

  

        </Box>
      </Box>
    );
  };
  
  export default Home;
  
