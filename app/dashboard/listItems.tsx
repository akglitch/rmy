import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Print, Scanner, ScannerSharp } from '@mui/icons-material';


export const MainListItems  = (props: any) => {
   
  const {setCurrView} = props

 return (
   <React.Fragment>
     <ListItemButton onClick={() => setCurrView(0)}>
       <ListItemIcon>
         <DashboardIcon />
       </ListItemIcon>
       <ListItemText primary="Dashboard" />
     </ListItemButton>
     <ListItemButton onClick={() => setCurrView(1)}>
       <ListItemIcon>
         <ShoppingCartIcon />
       </ListItemIcon>
       <ListItemText primary="Incoming" />
     </ListItemButton>
     <ListItemButton onClick={() => setCurrView(2)}>
       <ListItemIcon>
         <PeopleIcon />
       </ListItemIcon>
       <ListItemText primary="Outgoing" />
     </ListItemButton>
     
     <ListSubheader component="div" inset>
      Document Action
    </ListSubheader> 
    
     <ListItemButton onClick={() => setCurrView(3)}>
       <ListItemIcon>
         <Print />
       </ListItemIcon>
       <ListItemText primary="Print" />
     </ListItemButton>
     <ListItemButton onClick={() => setCurrView(4)}>
      <ListItemIcon>
        < Scanner/>
      </ListItemIcon>
      <ListItemText primary="Scan" />
    </ListItemButton>

   </React.Fragment>
 );
}


export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      loading
    </ListSubheader>
   
  
     
  </React.Fragment>
);
