import { Box , useTheme} from "@mui/material";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox"
function RoomCard(data) {
    const room = data.data[0]
    const selected = (data.data[1] == room.room_id)
    const setSelected = data.data[2]
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // return <></>
    
    return (
        
        <Box
        sx={{ flex: '1 0 auto', margin: '20px 20px 20px 20px' }}
        onClick={(e)=>{
  e.preventDefault()
  setSelected(room.room_id)}}
        gridColumn="span 2"
        backgroundColor={selected? colors.primary[300]:colors.primary[900]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={room.name}
          subtitle={room.devices.length + " devices"}
          status = {selected}
          icon=
            {room.icon}
          
        />
      </Box>
        /*/
         
            /*/
        
        
    )
}
export default RoomCard;