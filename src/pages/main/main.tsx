import { Box, Typography } from "@mui/material";

import ManualDropdown from "../../manualComponents/ManualDropdown";
import { TabDataT } from "../../manualComponents/ManualDropdown/ManualDropdown";

const tabsData: Array<TabDataT> = [
  {
    value: 0,
    title: 'Version',
    content: '56a8a67cc19fe5cb1d9d2fb76c93503d2f38ead9'
  },
  {
    value: 1,
    title: 'Profile',
    content: (
      <Box>
        <Typography>Name: MockUsername</Typography>
        <Typography>Age: 30</Typography>
      </Box>
    )
  },
]

const Main = function Main() {
  return (
    <Box
      width={500}
      height={300}
    >
      <ManualDropdown
        tabsData={tabsData}
        defaultTabValue={0}
      />
    </Box>
  );
}

export default Main;
