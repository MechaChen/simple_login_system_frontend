import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


/*
  @ Requirements
    - a button, when clicking it, will show the tabs and corresponding tab panel

  @ Architecture
    - a button
    - the tabs which are toggled by button
    - the tab panels show corresponding panel

  @ Data Model
    - a state to control whether to display the tabs

  @ Interface Definition
    - an object to pass tabs and corresponding value
    - an default value to show corresponding tab
    
  @ Optimization
*/

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  line-height: 1.5;
  padding: 8px 12px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  width: 300px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.4)' : 'rgba(0,0,0, 0.2)'
  };
  `,
);

export type TabDataT = {
  value: number,
  title: string,
  content: React.ReactNode,
}

type ManualDropdownPropsT = {
  defaultTabValue: number,
  tabsData: Array<TabDataT>
}

/**
 * MUI Button with default loading styles setup
 * @param {ButtonProps} props
 * @returns {any}
 */
const ManualDropdown = function ManualDropdown(props: ManualDropdownPropsT) {
  const [isItemsShow, setIsItemsShow] = useState(false);

  const toggleMenuItems = useCallback(() => {
    setIsItemsShow(!isItemsShow);
  }, [isItemsShow]);

  const { defaultTabValue, tabsData } = props;

  return (
    <Box>
      <Button
        variant="contained"
        size="large"
        onClick={toggleMenuItems}
      >
        My data
        {isItemsShow
        ? <KeyboardArrowUpIcon />
        : <KeyboardArrowDownIcon />
        }
      </Button>

      <Box height={10} />

      {isItemsShow && (
        <Tabs defaultValue={defaultTabValue}>
          <TabsList>
            {tabsData.map((tabData) => (
              <Tab value={tabData.value}>{tabData.title}</Tab>
            ))}
          </TabsList>

          <Box height={20} />

          {tabsData.map((tabData) => (
            <TabPanel value={tabData.value}>{tabData.content}</TabPanel>
          ))}
        </Tabs>
      )}
    </Box>
  );
}

export default ManualDropdown;
