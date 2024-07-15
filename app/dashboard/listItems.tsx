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
import { Add, Book, Print, Scanner, Task } from '@mui/icons-material';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Records" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Book />
      </ListItemIcon>
      <ListItemText primary="Incoming Record" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Book />
      </ListItemIcon>
      <ListItemText primary="Outgoing Record" />
    </ListItemButton>
   
    
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <Print />
      </ListItemIcon>
      <ListItemText primary="Print Document" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Scanner />
      </ListItemIcon>
      <ListItemText primary="Scan Document" />
    </ListItemButton>
    
  </React.Fragment>
);

export const TaskManagerListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Task Manager
    </ListSubheader>
  <ListItemButton>
    <ListItemIcon>
      <DashboardIcon />
    </ListItemIcon>
    <ListItemText primary="Todo Dashboard" />
  </ListItemButton>
  <ListItemButton>
    <ListItemIcon>
      <Add />
    </ListItemIcon>
    <ListItemText primary="Add a Task" />
  </ListItemButton>
  <ListItemButton>
    <ListItemIcon>
      <Task />
    </ListItemIcon>
    <ListItemText primary="Tasks" />
    </ListItemButton>
</React.Fragment>
);